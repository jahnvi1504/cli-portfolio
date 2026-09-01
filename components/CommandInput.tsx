import React from "react";

type CommandInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  cwd?: string;
};

export function CommandInput({ value, onChange, onSubmit, onKeyDown, cwd = "~" }: CommandInputProps) {
  return (
    <div className="flex items-center gap-2 font-mono text-sm text-[#d8f9d7]">
      <span className="text-[#86efac]">visitor@jahnvi:{cwd}$</span>
      <input
        aria-label="Terminal command"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onSubmit();
          }
          onKeyDown?.(event);
        }}
        className="w-full border-none bg-transparent text-[#d8f9d7] outline-none placeholder:text-[#5c7c62]"
        autoFocus
      />
    </div>
  );
}
