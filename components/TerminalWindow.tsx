"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BootSequence } from "@/components/BootSequence";
import { CommandInput } from "@/components/CommandInput";
import { aboutText, commandSuggestions, helpText, neofetchText, projectCatalog, skillGroups, experienceItems, leadershipItems } from "@/lib/portfolio-data";
import { getCurrentTree, listDirectory, normalizePath, readFileContent, resolvePath } from "@/lib/filesystem";

const historyLimit = 50;

function escapeForDisplay(value: string) {
  return value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function TerminalWindow() {
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState<string[]>([
    "Booting PortfolioOS...",
    "Loading shell...",
    "Initializing profile...",
    "Connecting GitHub...",
    "System Ready.",
    "",
    "Type 'help' to see available commands.",
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cwd, setCwd] = useState("/");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  }, [entries]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        event.preventDefault();
        const suggestions = commandSuggestions.filter((item) => item.startsWith(input.toLowerCase()));
        if (suggestions.length) {
          setInput(suggestions[0]);
        }
      }

      if (event.ctrlKey && event.key.toLowerCase() === "l") {
        event.preventDefault();
        setEntries([]);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [input]);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      setEntries((current) => [...current, `visitor@jahnvi:${cwd}$`]);
      setInput("");
      return;
    }

    const nextHistory = [...history, trimmed];
    setHistory(nextHistory.slice(-historyLimit));
    setHistoryIndex(nextHistory.length);
    setEntries((current) => [...current, `visitor@jahnvi:${cwd}$ ${trimmed}`]);

    const [cmd, ...args] = trimmed.split(/\s+/);
    const normalized = cmd.toLowerCase();

    if (normalized === "clear") {
      setEntries([]);
      setInput("");
      return;
    }

    let result: string[] = [];

    if (normalized === "help") {
      result = helpText;
    } else if (normalized === "about") {
      result = aboutText;
    } else if (normalized === "skills") {
      result = skillGroups.flatMap((group) => [`${group.title}:`, ...group.items, ""]);
    } else if (normalized === "experience") {
      result = experienceItems.flatMap((item) => {
        if (item.details.length === 0) return [`${item.title} — ${item.organization}`];
        return [`${item.title} — ${item.organization}`, ...item.details.map((detail) => `- ${detail}`), ""];
      });
    } else if (normalized === "leadership") {
      result = leadershipItems;
    } else if (normalized === "github") {
      result = [
        "GitHub: github.com/jahnvi1504",
        "Recent repositories:",
        "- cli-portfolio",
        "- BuildingDNA",
        "- AtlasKV",
        "- SkillSwap",
        "- Competitive-Intelligence-Agents",
        "",
        "Stars: 12",
      ];
    } else if (normalized === "linkedin") {
      result = ["LinkedIn: linkedin.com/in/jahnvi-r"];
    } else if (normalized === "contact") {
      result = ["Email: hello@jahnvi.dev", "GitHub: github.com/jahnvi1504", "LinkedIn: linkedin.com/in/jahnvi-r"];
    } else if (normalized === "resume") {
      result = ["resume.pdf", "Available on request."];
    } else if (normalized === "neofetch") {
      result = neofetchText;
    } else if (normalized === "pwd") {
      result = [cwd];
    } else if (normalized === "ls") {
      result = listDirectory(cwd);
    } else if (normalized === "tree") {
      result = getCurrentTree(cwd);
    } else if (normalized === "cd") {
      if (!args[0]) {
        setCwd("/");
      } else {
        const next = resolvePath(cwd, args[0]);
        const allowed = listDirectory(cwd).some((item) => item === `${args[0]}/` || item === args[0]);
        if (allowed || args[0] === "/" || args[0] === "..") {
          setCwd(next);
        } else {
          result = [`cd: ${args[0]}: No such file or directory`];
        }
      }
    } else if (normalized === "cat") {
      const target = args[0];
      if (!target) {
        result = ["usage: cat <file>"];
      } else {
        const filePath = normalizePath(`${cwd === "/" ? "" : cwd}/${target}`);
        const content = readFileContent(filePath);
        if (content) {
          result = content.split(/\r?\n/);
        } else {
          result = [`cat: ${target}: No such file or directory`];
        }
      }
    } else if (normalized === "project") {
      const lookup = args.join(" ");
      const match = Object.values(projectCatalog).find((project) => project.title.toLowerCase() === lookup.toLowerCase());
      if (!match) {
        result = [
          `Unknown project: ${lookup || ""}`.trim(),
          "Available projects: BuildingDNA, AtlasKV, SkillSwap, Competitive Intelligence Agents",
        ];
      } else {
        result = [
          `${match.title}`,
          `Summary: ${match.summary}`,
          "",
          "Key highlights:",
          ...match.bullets.map((item) => `- ${item}`),
          "",
          "Stack:",
          ...match.stack.map((item) => `- ${item}`),
          ...(match.metrics ? ["", "Benchmark output:", ...match.metrics.map((item) => `- ${item}`)] : []),
        ];
      }
    } else if (normalized === "sudo" && args[0] === "hire" && args[1] === "jahnvi") {
      result = ["Permission granted.", "Offer letter generated."];
    } else if (normalized === "coffee") {
      result = ["Brewing coffee...", "☕ Freshly brewed. Enjoy your focus session."];
    } else if (normalized === "fortune") {
      result = ["Stay curious. Build systems that make people faster."];
    } else if (normalized === "matrix") {
      result = ["The matrix is not real, but your curiosity is.", "┼ ┼ ┼"];
    } else if (normalized === "hack") {
      result = ["This is a portfolio, not a system intrusion.", "Try 'help' or 'projects' instead."];
    } else {
      result = [`${cmd}: command not found`];
    }

    setEntries((current) => [...current, ...result]);
    setInput("");
  };

  const prompt = `visitor@jahnvi:${cwd}$`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative h-[76vh] min-h-[560px] w-full max-w-6xl overflow-hidden rounded-xl border border-[#2f3d2f] bg-[#050505] shadow-[0_0_30px_rgba(34,197,94,0.12)]"
    >
      <div className="flex items-center gap-2 border-b border-[#1d2f1f] bg-[#0c100d] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="ml-4 flex-1 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[#8ebd92]">
          portfolio-shell
        </div>
      </div>

      <BootSequence />

      <div className="h-[calc(100%-48px)] overflow-y-auto px-4 pb-4 pt-3 font-mono text-sm text-[#d6f6d8]" ref={scrollRef}>
        <div className="space-y-1 whitespace-pre-wrap break-words">
          {entries.map((line, index) => (
            <div key={`${line}-${index}`} dangerouslySetInnerHTML={{ __html: escapeForDisplay(line) }} />
          ))}
        </div>

        <div className="mt-2 flex items-start gap-2">
          <span className="whitespace-nowrap text-[#86efac]">{prompt}</span>
          <CommandInput
            value={input}
            onChange={setInput}
            onSubmit={handleSubmit}
            onKeyDown={(event) => {
              if (event.key === "ArrowUp") {
                event.preventDefault();
                const nextIndex = historyIndex <= 0 ? 0 : historyIndex - 1;
                const prev = history[nextIndex] ?? "";
                setHistoryIndex(nextIndex);
                setInput(prev);
              }
              if (event.key === "ArrowDown") {
                event.preventDefault();
                const nextIndex = historyIndex >= history.length ? history.length : historyIndex + 1;
                const next = nextIndex >= history.length ? "" : history[nextIndex];
                setHistoryIndex(nextIndex);
                setInput(next);
              }
            }}
            cwd={cwd}
          />
        </div>
      </div>
    </motion.div>
  );
}
