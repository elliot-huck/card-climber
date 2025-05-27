import { useGameStore } from '../../state/gameStore';

export function FieldGuideTab() {
  const { fieldGuide } = useGameStore();

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-primary">Field Guide</h3>
        <p className="text-sm text-text/70">Birds and wildlife you've encountered</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {fieldGuide.length === 0 ? (
          <div className="flex items-center justify-center h-full text-text/50">
            <div className="text-center">
              <div className="text-4xl mb-2">🦅</div>
              <p>No birds spotted yet.</p>
              <p className="text-sm">Keep exploring to discover wildlife!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fieldGuide.map((bird) => (
              <div
                key={bird.id}
                className="bg-surface border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="text-center mb-3">
                  <div className="text-3xl mb-2">{bird.emoji}</div>
                  <h4 className="font-semibold text-primary">{bird.name}</h4>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-text/70">Habitat:</span>
                    <span className="ml-2">{bird.habitat}</span>
                  </div>
                  
                  <div>
                    <span className="font-medium text-text/70">Size:</span>
                    <span className="ml-2 capitalize">{bird.size}</span>
                  </div>
                  
                  <div>
                    <span className="font-medium text-text/70">Behavior:</span>
                    <span className="ml-2">{bird.behavior}</span>
                  </div>
                  
                  <div>
                    <span className="font-medium text-text/70">Zone:</span>
                    <span className="ml-2 capitalize">{bird.zoneId}</span>
                  </div>
                </div>
                
                <p className="text-xs text-text/80 mt-3 pt-3 border-t border-border">
                  {bird.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border bg-primary/5">
        <div className="text-center text-sm text-text/70">
          Discovered: {fieldGuide.length} species
        </div>
      </div>
    </div>
  );
}