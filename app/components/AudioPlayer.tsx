import { useState, useEffect } from "react";
import { Item } from "../api/files/route";

const getDownloadUrl = (path: string) => {
  return `/api/download?path=${path}`;
};

export default function AudioPlayer() {
  const [items, setItems] = useState<Item[]>([]);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  useEffect(() => {
    const getFiles = async () => {
      try {
        const response = await fetch("/api/files");
        if (!response.ok) {
          throw new Error(`Failed to get files: ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    }

    getFiles();
  }, []);

  const handleClick = (item: Item) => {
    setCurrentItem(item);
  };

  return (
    <div>
      <h1>Music Streaming</h1>

      {/* Audio Player */}
      {currentItem && (
        <div className="audio-player">
          <p>Now Playing: {currentItem.name}</p>
          <audio 
            controls 
            src={getDownloadUrl(currentItem.path)} 
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
            onClick={() => handleClick(item)}
            style={{ cursor: 'pointer' }}
          >
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}