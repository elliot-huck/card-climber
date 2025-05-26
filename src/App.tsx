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
    <div className="game-container min-h-screen bg-background text-text">
      {/* Background decoration */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="text-[20rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {currentZone.emoji}
        </div>
      </div>

      {/* Main Game Layout */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Top Bar */}
        <header className="flex-shrink-0">
          <TopBar />
        </header>

        {/* Main Game Area */}
        <main className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Progress Track */}
          <aside className="w-20 flex-shrink-0 p-2">
            <ProgressTrack />
          </aside>

          {/* Center - Trail Table */}
          <section className="flex-1 p-4 overflow-y-auto">
            <TrailTable />
          </section>

          {/* Right Sidebar - Could be used for additional info */}
          <aside className="w-16 flex-shrink-0 p-2">
            {/* Reserved for future features */}
          </aside>
        </main>

        {/* Bottom - Gear Hand */}
        <footer className="flex-shrink-0 p-4 border-t border-border bg-surface/50 backdrop-blur-sm">
          <GearHand />
        </footer>
      </div>

      {/* Modals and Overlays */}
      {ui.bookMenuOpen && <BookMenu />}
      {ui.notification && <Notification />}
    </div>
  );
}

export default App;
