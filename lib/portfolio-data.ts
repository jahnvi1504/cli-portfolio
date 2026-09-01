export type SkillGroup = {
  title: string;
  items: string[];
};

export const profile = {
  name: "Jahnvi R",
  role: "Incoming Software Engineer",
  education: "PES University (2023–2027)",
  location: "Bengaluru, India",
  interests: [
    "Distributed Systems",
    "Backend Engineering",
    "Developer Experience",
    "AI Agents",
    "Linux",
  ],
};

export const skillGroups: SkillGroup[] = [
  { title: "Languages", items: ["Java", "C++", "Python", "C", "SQL", "JavaScript", "Bash"] },
  { title: "Backend", items: ["Spring Boot", "FastAPI", "REST APIs", "Spring Security", "JWT", "JPA/Hibernate"] },
  { title: "Databases", items: ["PostgreSQL", "MySQL", "H2", "Qdrant"] },
  { title: "Distributed Systems", items: ["Raft Consensus", "Replication", "Leader Election", "Write-Ahead Logging"] },
  { title: "DevOps", items: ["Docker", "Git", "Linux", "GCP"] },
  { title: "AI", items: ["PyTorch", "Hugging Face", "LangGraph", "LLMs", "RAG"] },
];

export const experienceItems = [
  {
    title: "Incoming Software Engineer",
    organization: "Couchbase",
    type: "incoming-role",
    details: [],
  },
  {
    title: "DRDO — MTRDC Internship",
    organization: "DRDO",
    type: "internship",
    details: [
      "Built centralized logging infrastructure using rsyslog",
      "Connected 4 clients to 1 server",
      "Configured UDP/TCP log forwarding",
      "Built a Bash-based system and network information gathering tool",
      "Implemented CIDR-based IP scanning without external utilities",
    ],
  },
  {
    title: "Machine Learning Teaching Assistant",
    organization: "PES University",
    type: "teaching-assistant",
    details: [],
  },
];

export const leadershipItems = [
  "Entrepreneurship Cell — Board of Directors",
  "Nexus Tech Club — Design Head",
];

export type ProjectDetail = {
  title: string;
  summary: string;
  stack: string[];
  bullets: string[];
  metrics?: string[];
};

export const projectCatalog: Record<string, ProjectDetail> = {
  AtlasKV: {
    title: "AtlasKV",
    summary:
      "Distributed Key-Value Store with RAFT consensus, leader election, log replication, WAL persistence, and multi-node Docker deployments.",
    stack: ["Java", "Distributed Systems", "Raft", "Docker", "WAL", "Replication"],
    bullets: [
      "Distributed Key-Value Store",
      "Raft Consensus",
      "Leader Election",
      "Log Replication",
      "WAL Persistence",
      "Docker Multi-node Deployment",
    ],
  },
  BuildingDNA: {
    title: "BuildingDNA",
    summary:
      "Energy optimization platform that couples EnergyPlus simulations with local LLM reasoning and MCP integration for closed-loop building optimization.",
    stack: ["Python", "EnergyPlus", "LLMs", "MCP", "Streamlit", "Optimization"],
    bullets: [
      "EnergyPlus simulations",
      "Local LLM reasoning",
      "MCP integration",
      "Streamlit dashboard",
      "Closed-loop building optimization",
    ],
    metrics: [
      "8.73% electricity reduction",
      "61.47% estimated comfort violation reduction",
    ],
  },
  SkillSwap: {
    title: "SkillSwap",
    summary:
      "Skill-sharing platform with Spring Boot backend, JavaFX client, JWT auth, and PostgreSQL persistence.",
    stack: ["Spring Boot", "JavaFX", "JWT", "PostgreSQL", "Controller-Service-Repository"],
    bullets: [
      "Spring Boot backend",
      "JavaFX client",
      "JWT Authentication",
      "PostgreSQL",
      "Controller-Service-Repository architecture",
    ],
  },
  intelligence: {
    title: "Competitive Intelligence Agents",
    summary:
      "Multi-agent retrieval and ranking system built with FastAPI and Qdrant for vector search and confidence scoring.",
    stack: ["FastAPI", "Qdrant", "Multi-agent retrieval", "Vector Search", "Confidence scoring"],
    bullets: [
      "FastAPI",
      "Qdrant",
      "Multi-agent retrieval",
      "Vector Search",
      "Confidence scoring",
    ],
  },
};

export const commandSuggestions = [
  "about",
  "projects",
  "skills",
  "experience",
  "leadership",
  "resume",
  "github",
  "linkedin",
  "contact",
  "neofetch",
  "ls",
  "cd",
  "cat",
  "tree",
  "clear",
];

export const aboutText = [
  "Jahnvi R",
  "Computer Science Engineering Student @ PES University",
  "",
  "Incoming Software Engineer at Couchbase.",
  "",
  "I enjoy building distributed systems, backend infrastructure,",
  "developer tools, and AI-powered applications.",
  "",
  "Current interests:",
  "- Distributed Systems",
  "- Backend Engineering",
  "- Developer Experience",
  "- AI Agents",
  "- Linux",
];

export const projectList = ["BuildingDNA", "AtlasKV", "SkillSwap", "Competitive Intelligence Agents"];

export const helpText = [
  "Available commands:",
  ...commandSuggestions,
  "",
  "Hidden commands:",
  "sudo hire jahnvi",
  "coffee",
  "fortune",
  "matrix",
  "hack",
];

export const neofetchText = [
  "          /\\_/\\",
  "         ( o.o )",
  "          > ^ <",
  "",
  "Jahnvi R",
  "----------------------------",
  "Role: Incoming Software Engineer",
  "Education: PES University (2023–2027)",
  "Location: Bengaluru, India",
  "",
  "Languages:",
  "Java",
  "Python",
  "C++",
  "JavaScript",
  "Bash",
  "",
  "Focus:",
  "Distributed Systems",
  "Developer Tools",
  "AI Agents",
];
