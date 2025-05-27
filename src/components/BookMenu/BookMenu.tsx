import { useGameStore } from '../../state/gameStore';
import { FieldGuideTab } from './FieldGuideTab';
import { JournalTab } from './JournalTab';
import { SettingsTab } from './SettingsTab';

export function BookMenu() {
  const { ui, toggleBookMenu } = useGameStore();

  const tabs = [
    { id: 'journal', label: 'Journal', icon: '📖' },
    { id: 'fieldGuide', label: 'Field Guide', icon: '🦅' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-surface rounded-lg shadow-2xl w-full max-w-4xl h-[80vh] mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-primary/5">
          <h2 className="text-xl font-bold text-primary">Adventure Book</h2>
          <button
            onClick={() => toggleBookMenu()}
            className="p-2 rounded-lg hover:bg-text/10 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => toggleBookMenu(tab.id)}
              className={`
                flex-1 flex items-center justify-center space-x-2 py-3 px-4 transition-colors
                ${ui.bookMenuTab === tab.id 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-text/5'
                }
              `}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden">
          {ui.bookMenuTab === 'journal' && <JournalTab />}
          {ui.bookMenuTab === 'fieldGuide' && <FieldGuideTab />}
          {ui.bookMenuTab === 'settings' && <SettingsTab />}
        </div>
      </div>
    </div>
  );
}