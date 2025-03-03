import { useState, useEffect } from "react";

type Item = {
  name: string;
  file: string;
  path: string;
};

export default function AudioPlayer() {
  const [items, setItems] = useState<Item[]>([]);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [href, setHref] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/files")
      .then((res) => res.json())
      .then((data) => setItems(data.items || []));
  }, []);

  const handleClick = async (item: Item) => {
    const response = await fetch(`/api/download?path=${item.path}`);
    const file = await response.json();
    console.log(file);
    setHref(file.href);
    setCurrentItem(item);
  };

  return (
    <div>
      <h1>Music Streaming</h1>
      {/* Audio Player */}
      {currentItem && href && (
        <div className="audio-player">
          <p>Now Playing: {currentItem.name}</p>
          <audio 
            controls 
            src={href} 
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