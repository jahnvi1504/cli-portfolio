export type FileEntry = {
  type: "file" | "directory";
  content?: string;
  children?: string[];
};

export const filesystem: Record<string, FileEntry> = {
  "/": {
    type: "directory",
    children: ["about.txt", "skills.txt", "experience/", "projects/", "leadership.txt", "resume.pdf", "contact.txt"],
  },
  "/experience": {
    type: "directory",
    children: ["drdo.log", "mlta.log"],
  },
  "/projects": {
    type: "directory",
    children: ["AtlasKV.md", "BuildingDNA.md", "SkillSwap.md", "intelligence.md"],
  },
};

export const fileContents: Record<string, string> = {
  "/about.txt": `Jahnvi R\nComputer Science Engineering Student @ PES University\n\nIncoming Software Engineer at Couchbase.\n\nI enjoy building distributed systems, backend infrastructure, developer tools, and AI-powered applications.`,
  "/skills.txt": `Languages:\nJava\nC++\nPython\nC\nSQL\nJavaScript\nBash\n\nBackend:\nSpring Boot\nFastAPI\nREST APIs\nSpring Security\nJWT\nJPA/Hibernate`,
  "/leadership.txt": `Entrepreneurship Cell — Board of Directors\nNexus Tech Club — Design Head`,
  "/contact.txt": `GitHub: github.com/jahnvi1504\nLinkedIn: linkedin.com/in/jahnvi-r`,
  "/resume.pdf": `resume.pdf\nAvailable on request`,
  "/experience/drdo.log": `DRDO — MTRDC Internship\n- Built centralized logging infrastructure using rsyslog\n- Connected 4 clients to 1 server\n- Configured UDP/TCP log forwarding\n- Built a Bash-based system and network information gathering tool\n- Implemented CIDR-based IP scanning without external utilities`,
  "/experience/mlta.log": `Machine Learning Teaching Assistant\nCurrent teaching assistant role in applied ML and systems thinking.`,
  "/projects/AtlasKV.md": `# AtlasKV\n\nDistributed Key-Value Store\n- Raft Consensus\n- Leader Election\n- Log Replication\n- WAL Persistence\n- Docker multi-node deployment`,
  "/projects/BuildingDNA.md": `# BuildingDNA\n\nEnergyPlus simulations\n- Local LLM reasoning\n- MCP integration\n- Streamlit dashboard\n- Closed-loop building optimization\n\nMeasured improvements:\n- 8.73% electricity reduction\n- 61.47% estimated comfort violation reduction`,
  "/projects/SkillSwap.md": `# SkillSwap\n\nSpring Boot backend\nJavaFX client\nJWT Authentication\nPostgreSQL\nController-Service-Repository architecture`,
  "/projects/intelligence.md": `# Competitive Intelligence Agents\n\nFastAPI\nQdrant\nMulti-agent retrieval\nVector Search\nConfidence scoring`,
};

export function normalizePath(path: string) {
  const normalized = path.replace(/\\/g, "/").replace(/\/+/g, "/");
  if (!normalized || normalized === ".") {
    return "/";
  }

  if (!normalized.startsWith("/")) {
    return `/${normalized}`;
  }

  return normalized;
}

export function resolvePath(cwd: string, target: string) {
  const base = cwd === "/" ? "/" : cwd.replace(/\/$/, "");

  if (!target || target === ".") {
    return base;
  }

  if (target === "..") {
    const parent = base.split("/").filter(Boolean);
    parent.pop();
    return parent.length ? `/${parent.join("/")}` : "/";
  }

  if (target.startsWith("/")) {
    return normalizePath(target);
  }

  const next = `${base === "/" ? "" : base}/${target}`;
  return normalizePath(next);
}

export function listDirectory(dirPath: string) {
  const normalized = normalizePath(dirPath);
  const entry = filesystem[normalized] ?? { type: "directory", children: [] };
  return entry.children ?? [];
}

export function readFileContent(filePath: string) {
  return fileContents[filePath] ?? null;
}

export function getCurrentTree(dirPath: string) {
  const normalized = normalizePath(dirPath);
  const output = [normalized === "/" ? "/" : normalized];
  const walk = (path: string, indent = "") => {
    const items = listDirectory(path);
    items.forEach((item, index) => {
      const isLast = index === items.length - 1;
      const prefix = isLast ? "└── " : "├── ";
      const nextPath = normalizePath(`${path === "/" ? "" : path}/${item}`);
      const label = item.replace(/\/$/, "");
      output.push(`${indent}${prefix}${label}`);

      if (filesystem[nextPath]?.type === "directory") {
        walk(nextPath, `${indent}${isLast ? "    " : "│   "}`);
      }
    });
  };

  walk(normalized);
  return output;
}
