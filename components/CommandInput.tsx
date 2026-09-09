import React from "react";

type CommandInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export function CommandInput({ value, onChange, onSubmit, onKeyDown }: CommandInputProps) {
  return (
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
  );
}
