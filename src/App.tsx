import { useEffect } from 'react';
import { BookMenu } from './components/BookMenu/BookMenu';
import { GearHand } from './components/GearHand';
import { Notification } from './components/Notification';
import { ProgressTrack } from './components/ProgressTrack';
import { TopBar } from './components/TopBar';
import { TrailTable } from './components/TrailTable';
import { useGameStore } from './state/gameStore';

function App() {
  const {
    currentZone,
    player,
    loadGame,
    ui
  } = useGameStore();

  // Initialize game on app start
  useEffect(() => {
    loadGame();
  }, [loadGame]);

  // Apply zone theming to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-zone', currentZone.id);
    document.documentElement.setAttribute('data-time', player.timeOfDay);
  }, [currentZone.id, player.timeOfDay]);

  return (
    <div className="game-container min-h-screen text-white">
      {/* Main Game Layout */}
      <div className="flex flex-col h-screen">
        {/* Top Bar */}
        <header className="flex-shrink-0">
          <TopBar />
        </header>

        {/* Main Game Board Area */}
        <main className="flex-1 flex p-6 gap-6 bg-background">
          {/* Left Side - Trail and Bird Decks */}
          <section className="flex flex-col gap-6 w-80">
            {/* Trail Deck Area */}
            <div className="trail-deck-area p-4">
              <div className="text-white text-lg font-bold mb-4">Trail Deck</div>
              <TrailTable />
            </div>

            {/* Bird Deck Area */}
            <div className="bird-deck-area p-4 h-48">
              <div className="text-white text-lg font-bold mb-4">Bird Deck</div>
              <div className="card card-bird w-24 h-32 flex items-center justify-center text-2xl">
                🐦
              </div>
            </div>
          </section>

          {/* Center - Empty space for future expansion */}
          <section className="flex-1">
            {/* This space can be used for additional game elements */}
          </section>

          {/* Right Side - Progress Track */}
          <aside className="w-32 flex flex-col items-center">
            <div className="text-white text-lg font-bold mb-4">Progress {player.progress}/{player.progressGoal}</div>
            <ProgressTrack />
          </aside>
        </main>

        {/* Bottom - Gear Deck and Hand */}
        <footer className="flex-shrink-0 p-6">
          <div className="flex gap-6">
            {/* Gear Deck */}
            <div className="gear-deck-area p-4 w-48">
              <div className="text-white text-lg font-bold mb-4">Gear Deck</div>
              <div className="flex gap-2">
                <div className="card card-gear-item w-16 h-24 flex items-center justify-center">
                  ⚙️
                </div>
              </div>
            </div>

            {/* Gear Hand */}
            <div className="flex-1">
              <GearHand />
            </div>

            {/* Gear Discard */}
            <div className="gear-deck-area p-4 w-32">
              <div className="text-white text-lg font-bold mb-4">Gear discard</div>
              <div className="card card-gear-item w-16 h-24 border-4 border-yellow-600 bg-yellow-800"></div>
            </div>
          </div>
        </footer>
      </div>

      {/* Modals and Overlays */}
      {ui.bookMenuOpen && <BookMenu />}
      {ui.notification && <Notification />}
    </div>
  );
}

export default App;
