import { useState, useEffect } from "react";

type Item = {
  name: string;
  file: string;
};

export default function AudioPlayer() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetch("/api/files")
      .then((res) => res.json())
      .then((data) => setItems(data.items || []));
  }, []);

  return (
    <div>
      <h1>Music Streaming</h1>
      {items.map(item => (
        <div key={item.name}>
          <p>{item.name}</p>
          <audio controls src={item.file} crossOrigin="anonymous"/>
        </div>
      ))}
    </div>
  );
}