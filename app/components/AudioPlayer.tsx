import { useState, useEffect } from "react";

type Item = {
  name: string;
  file: string;
};

export default function AudioPlayer() {
  const [items, setItems] = useState<Item[]>([]);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  useEffect(() => {
    fetch("/api/files")
      .then((res) => res.json())
      .then((data) => setItems(data.items || []));
  }, []);

  return (
    <div>
      <h1>Music Streaming</h1>
      
      {/* Audio Player */}
      {currentItem && (
        <div className="audio-player">
          <p>Now Playing: {currentItem.name}</p>
          <audio 
            controls 
            src={currentItem.file} 
            crossOrigin="anonymous"
            autoPlay
          />
        </div>
      )}

      {/* Playlist */}
      <div className="playlist">
        <h2>Playlist</h2>
        {items.map(item => (
          <div 
            key={item.name} 
            className={`playlist-item ${currentItem?.name === item.name ? 'active' : ''}`}
            onClick={() => setCurrentItem(item)}
            style={{ cursor: 'pointer' }}
          >
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}