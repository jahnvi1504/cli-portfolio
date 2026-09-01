# CLI Portfolio

A terminal-style portfolio that feels like a real Linux shell, built with Next.js, TypeScript, Tailwind, and a lightweight interactive terminal interface.

## Hero

![CLI Portfolio Preview](https://via.placeholder.com/1280x720?text=CLI+Portfolio+Terminal)

## Overview

This project simulates a personal portfolio environment where visitors can type commands like `help`, `about`, `projects`, `skills`, `experience`, `neofetch`, and `tree` to explore work and experience in a realistic terminal layout.

## Features

- Authentic terminal shell UI
- Boot sequence with reduced-motion fallback
- Virtual filesystem with browsing commands
- Portfolio command outputs for experience, projects, leadership, and contact
- Shell-like history, tab completion, and clear command handling
- Mobile-friendly responsive design
- Vercel-ready Next.js deployment

## Architecture

```text
app/
  page.tsx
  layout.tsx
  globals.css

components/
  TerminalWindow.tsx
  BootSequence.tsx
  CommandInput.tsx
  Prompt.tsx

lib/
  portfolio-data.ts
  filesystem.ts
  github.ts
```

## Commands

| Command | Description |
| --- | --- |
| `help` | Lists available commands |
| `about` | Personal introduction |
| `skills` | Skill groups and categories |
| `experience` | Career and internship history |
| `leadership` | Leadership roles |
| `projects` | Project overview |
| `project <name>` | Deep-dive project page |
| `neofetch` | Developer profile banner |
| `ls`, `cd`, `pwd`, `tree` | Virtual filesystem navigation |
| `cat <file>` | Read file contents |
| `clear` | Clear terminal output |
| `github` | GitHub summary |
| `coffee`, `fortune`, `hack`, `matrix` | Easter eggs |

## Local Setup

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Production Deployment

This project is ready to deploy to Vercel:

1. Push to GitHub.
2. Import the repository into Vercel.
3. Use the default Next.js settings.
4. Deploy.

## Roadmap

- [x] Project setup
- [x] Terminal shell window
- [x] Boot sequence
- [x] Command parser and shell behavior
- [x] Portfolio command content
- [x] Virtual filesystem
- [x] Neofetch output
- [x] GitHub integration layer
- [x] Easter eggs
- [ ] README polishing and screenshots
- [ ] Accessibility refinement
- [ ] Performance tuning

## Contributing

Contributions are welcome. Please open an issue or PR with a clear description and keep changes focused.

## License

MIT
