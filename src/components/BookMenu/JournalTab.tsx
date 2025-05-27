import { useGameStore } from '../../state/gameStore';

export function JournalTab() {
  const { journalEntries } = useGameStore();

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getEntryIcon = (type: string) => {
    switch (type) {
      case 'arrival': return '🚪';
      case 'trail': return '🥾';
      case 'bird': return '🦅';
      case 'lodge': return '🏠';
      case 'zone': return '🗺️';
      default: return '📝';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-primary">Journey Journal</h3>
        <p className="text-sm text-text/70">Your adventure log and memories</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {journalEntries.length === 0 ? (
          <div className="flex items-center justify-center h-full text-text/50">
            <div className="text-center">
              <div className="text-4xl mb-2">📖</div>
              <p>Your journal is empty.</p>
              <p className="text-sm">Start your adventure to create memories!</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {journalEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-surface border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{getEntryIcon(entry.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-primary">{entry.title}</h4>
                      <span className="text-xs text-text/50">
                        {formatDate(entry.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-text/80 mb-2">{entry.content}</p>
                    <div className="flex items-center space-x-2 text-xs text-text/50">
                      <span className="capitalize">{entry.type}</span>
                      <span>•</span>
                      <span>{entry.zoneId}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}