# Card Climber 🏔️

A cozy, single-player, roguelike deck management browser game where you hike up a mountain. Build your gear deck, overcome trail challenges, and discover wildlife as you ascend through four distinct zones.

![Game Preview](https://img.shields.io/badge/Status-Playable-brightgreen) ![Version](https://img.shields.io/badge/Version-1.0.0-blue) ![License](https://img.shields.io/badge/License-MIT-yellow)

## 🎮 Game Features

### Core Gameplay
- **Deck Management**: Build and manage a deck of gear cards to overcome trail obstacles
- **Trail Challenges**: Face increasingly difficult trails that require specific combinations of gear
- **Progressive Zones**: Climb through 4 unique zones (Valley, Forest, Highlands, Peak)
- **Time Progression**: Day/night cycle affects gameplay and strategy
- **Birdwatching**: Discover and collect birds in your field guide

### Game Systems
- **Save/Load**: Automatic save system with manual save/export options
- **Journal**: Track your adventure with automatic journal entries
- **Field Guide**: Collect and catalog birds you encounter
- **Dynamic Theming**: Each zone has unique visual themes and time-of-day effects

## 🛠️ Technology Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: TailwindCSS 4 with CSS custom properties
- **State Management**: Zustand
- **Animations**: Framer Motion (ready for implementation)
- **Deployment**: GitHub Pages

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (recommended: 18.18.0 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/card-climber.git
   cd card-climber
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173/card-climber/`

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

## 🎯 How to Play

### Getting Started
1. **Begin Your Journey**: Start at the trailhead in the Valley zone
2. **Draw Gear**: You begin with 5 gear cards in your hand
3. **Scout Trails**: Click "Scout Ahead" to reveal trail challenges
4. **Use Gear**: Drag gear cards onto trail cards to meet their requirements
5. **Complete Trails**: When all requirements are met, complete the trail for progress
6. **Reach Lodges**: Accumulate progress to reach lodges and advance zones

### Game Mechanics

#### Gear Cards
- **Equipment**: Boots, backpacks, tools that provide various stat bonuses
- **Clothing**: Weather protection and comfort items
- **Food**: Energy and morale boosters
- **Tools**: Navigation aids and specialized equipment

#### Trail Requirements
Each trail requires specific combinations of:
- **Strength**: Physical power for climbing and scrambling
- **Endurance**: Stamina for long hikes
- **Warmth**: Protection from cold weather
- **Navigation**: Route-finding and orientation skills
- **Comfort**: Morale and general well-being

#### Zone Progression
1. **Valley Meadows** 🌾 - Gentle grasslands (5 progress to complete)
2. **Ancient Forest** 🌲 - Dense woodlands (8 progress to complete)
3. **Highland Cliffs** ⛰️ - Rocky terrain (12 progress to complete)
4. **Summit Peak** 🏔️ - Final ascent (15 progress to complete)

#### Time System
- **Day Cycle**: Dawn → Morning → Noon → Afternoon → Evening → Dusk → Night
- **Night Effects**: Returns you to the last lodge, resets progress
- **Strategic Timing**: Plan your climbs within daylight hours

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── BookMenu/        # Journal, Field Guide, Settings
│   ├── GearCard.tsx     # Individual gear card component
│   ├── GearHand.tsx     # Player's gear hand
│   ├── Notification.tsx # Toast notifications
│   ├── ProgressTrack.tsx# Progress and energy display
│   ├── TopBar.tsx       # Game header with zone info
│   ├── TrailCard.tsx    # Individual trail challenge
│   └── TrailTable.tsx   # Main trail display area
├── data/                # Game content
│   ├── birdCards.ts     # Wildlife to discover
│   ├── gearCards.ts     # Equipment and items
│   ├── trailCards.ts    # Trail challenges
│   └── zones.ts         # Zone definitions and themes
├── state/               # State management
│   └── gameStore.ts     # Zustand store with all game logic
├── types/               # TypeScript definitions
│   └── index.ts         # All game type definitions
├── utils/               # Utility functions
│   ├── deckUtils.ts     # Card deck operations
│   └── saveLoad.ts      # Save/load system
└── styles/
    └── index.css        # Global styles and theme variables
```

## 🎨 Customization

### Adding New Content

#### New Gear Cards
Add cards to `src/data/gearCards.ts`:
```typescript
{
  id: 'new-item',
  name: 'New Item',
  description: 'Description of the item',
  emoji: '🎯',
  type: 'gear',
  gearType: 'equipment',
  rarity: 'common',
  durability: 3,
  maxDurability: 3,
  effects: [
    { type: 'strength', value: 2 }
  ]
}
```

#### New Trail Challenges
Add trails to `src/data/trailCards.ts`:
```typescript
{
  id: 'new-trail',
  name: 'New Trail',
  description: 'Challenge description',
  emoji: '🌄',
  type: 'trail',
  rarity: 'common',
  difficulty: 3,
  requirements: [
    { type: 'endurance', value: 2 }
  ],
  rewards: [
    { type: 'progress', value: 1 }
  ],
  zoneId: 'valley'
}
```

### Theme Customization
Modify zone themes in `src/styles/index.css` and `src/data/zones.ts` to change colors and visual styling.

## 🚀 Deployment

The game is configured for easy deployment to GitHub Pages:

1. **Update base path** in `vite.config.ts` with your repository name
2. **Enable GitHub Pages** in your repository settings
3. **Deploy**: `npm run deploy`

The game will be available at: `https://yourusername.github.io/card-climber/`

## 🔮 Future Enhancements

- **Audio System**: Background music and sound effects
- **Animations**: Framer Motion card animations and transitions
- **More Zones**: Additional climbing areas with unique challenges
- **Multiplayer**: Shared leaderboards or cooperative play
- **Mobile Optimization**: Touch-friendly interface improvements
- **Accessibility**: Enhanced screen reader support and keyboard navigation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies for optimal performance
- Inspired by classic deck-building and roguelike games
- Designed for cozy, contemplative gameplay experiences

---

**Start your mountain adventure today!** 🏔️✨
