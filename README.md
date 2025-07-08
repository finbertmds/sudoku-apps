# 🧩 Sudoku Apps (Monorepo)

A unified monorepo containing two feature-rich Sudoku mobile apps:

- **Sudoku Killer** — Killer Sudoku puzzles with cage logic and advanced gameplay.
- **Sudoku Classic** — Classic Sudoku with clean interface and fast performance.

Built using **React Native CLI** and **Expo**, with shared logic, hooks, components, and services for easy maintenance and consistency.

---

## 📱 Apps Overview

### ✅ Sudoku Killer

A modern, cage-based killer sudoku game with rich visuals and analytics.

- Killer Sudoku puzzle board with cage border rendering
- Mistake & Hint counters
- Game timer, pause/resume support
- Daily quote & stats
- Victory statistics (pie/bar charts)
- Multi-language support (🇬🇧 English, 🇯🇵 Japanese, 🇻🇳 Vietnamese)
- Google AdMob integration
- Player profiles, game history
- iOS and Android native builds

### ✅ Sudoku Classic

A fast and responsive traditional Sudoku game.

- Classic 9x9 Sudoku with number input pad
- Level system: easy → master
- Optimized for web & mobile via **Expo**
- Shared analytics, player tracking
- Dark/light mode support
- Built-in tutorial and about game page
- Modern charts & ranking system

---

## 🛠 Tech Stack

| Layer        | Description                                  |
| ------------ | -------------------------------------------- |
| 📦 Monorepo  | `Yarn Workspaces` with shared packages       |
| 📱 UI        | `React Native`, `Expo`, `Reanimated`, `MMKV` |
| 📈 Charts    | `react-native-svg`, `react-native-chart-kit` |
| 🌐 i18n      | `react-i18next` for translations             |
| 💾 Storage   | `MMKV` (mobile), `localStorage` (web)        |
| 📊 Analytics | custom player stats system                   |
| 📡 Events    | Shared Event Bus pattern                     |
| 🎨 Theming   | Custom `ThemeContext`, supports system mode  |
| 📤 Ads       | Google AdMob (banner + rewarded)             |

---

## 📂 Project Structure

```bash
sudoku-apps/
├── apps/
│   ├── classic/       # Sudoku Classic (Expo)
│   └── killer/        # Sudoku Killer (React Native CLI)
├── packages/
│   ├── shared-components/
│   ├── shared-events/
│   ├── shared-hooks/
│   ├── shared-icons/
│   ├── shared-services/
│   ├── shared-storage/
│   └── shared-themes/
│   └── shared-types/
│   ├── shared-utils/
└── README.md
```

Each app maintains its own `package.json`, assets, `App.tsx`, and native code, but shares reusable logic and UI via packages.

---

## 🧪 Features

- 📱 Unified Sudoku UI for both apps
- 🎭 Dark & Light mode with smooth toggle
- 🎯 Multi-difficulty levels (easy → master)
- 🧠 Mistake + hint tracking
- 🕓 Game timer with pause
- 📊 Stats history per level
- 🏆 Leaderboard per player & time
- 🧩 Reusable Grid & Board UI
- 🌍 Localized content with i18n
- 🧠 Smart event bus for in-app sync
- 📈 Tutorial and onboarding slides
- 💰 Ads reward system

---

## 📌 Planned Features

- 🔄 Cloud sync (Firebase / Supabase)
- 👥 Multiplayer challenge mode
- 🧪 Daily Challenge Board
- 📅 Weekly leaderboard + global stats
- ⏱ Speed mode (time attack)
- 🎨 Customizable themes / backgrounds
- 📤 Social sharing on victory

---

## 🙏 Credits

- Sudoku Killer Generator: [killer-sudoku-generator](https://www.npmjs.com/package/killer-sudoku-generator)
- Classic Sudoku: [sudoku-gen](https://www.npmjs.com/package/sudoku-gen)
- AdMob: [react-native-google-mobile-ads](https://invertase.io/oss/react-native-google-mobile-ads)
- Charts: [react-native-chart-kit](https://www.npmjs.com/package/react-native-chart-kit/)
- i18n: [react-i18next](https://react.i18next.com/)
- MMKV: [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv)

---

## 🚀 Getting Started

```bash
# Clone the monorepo
git clone https://github.com/FinbertMDS/sudoku-apps.git
cd sudoku-apps

# Install all dependencies
yarn install

# Run Sudoku Classic (Expo)
dev:classic

# Run Sudoku Killer (React Native CLI)
dev:killer
```

---

## 🧠 Maintained by

**Finbert Ngo**
Contact: [GitHub](https://github.com/finbertmds) | [Contact](https://finbertngo.wordpress.com/contact/)

---

## 📄 License

MIT © Finbert Ngo
