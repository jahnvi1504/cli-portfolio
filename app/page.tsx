import { TerminalWindow } from "@/components/TerminalWindow";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#030703] px-4 py-10 text-[#d5f9d6] sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl">
        <TerminalWindow />
      </div>
    </main>
  );
}
