function parseCommand(input) {
  const trimmed = String(input ?? "").trim();

  if (!trimmed) {
    return { command: "", args: [] };
  }

  const [command, ...args] = trimmed.split(/\s+/);
  return {
    command: command.toLowerCase(),
    args,
  };
}

module.exports = {
  parseCommand,
};
