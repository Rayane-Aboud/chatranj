```
frontend/src/
├── assets/             # SVGs, chess piece sets, sounds
├── common/             # Global UI library (Buttons, Modals, Loaders)
├── core/               # PURE LOGIC (Framework agnostic)
│   ├── engine/         # Stockfish/WASM integration
│   ├── rules/          # Chess.js or custom move validation
│   └── types/          # Shared interfaces (Game, Move, Square)
├── features/           # Sliced by business domain
│   ├── play/           # The live board, move handling, clocks
│   │   ├── components/ 
│   │   ├── store.ts    # Domain-specific state (Signals/Stores)
│   │   └── api.ts      # WebSockets / move submission
│   ├── analysis/       # Evaluation bar, move list, engine feedback
│   ├── lobby/          # Matchmaking, seek list
│   └── social/         # Chat, friends list
├── lib/                # Third-party config (Socket.io, Apollo, etc.)
├── services/           # Global singletons (AuthService, SettingsService)
├── App.tsx
└── index.tsx
```