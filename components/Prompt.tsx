type PromptProps = {
  cwd?: string;
};

export function Prompt({ cwd = "~" }: PromptProps) {
  return (
    <span className="text-[#86efac]">
      visitor@jahnvi:{cwd}$
    </span>
  );
}
