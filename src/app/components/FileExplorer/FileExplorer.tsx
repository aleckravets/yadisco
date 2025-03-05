import { addTrack } from '@/lib/features/player/playerSlice';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const FileExplorer = () => {
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('/api/files');
        if (!response.ok) {
          throw new Error('Failed to fetch files');
        }
        const data = await response.json();
        setFiles(data.items.map((item: { name: string, file: string }) => ({
          name: item.name,
          url: item.file
        })));
      } catch (error) {
        console.error('Error fetching files:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="file-explorer">
      <h2>📂 Yandex Disk - Audio Files</h2>
      {loading ? <p>Loading...</p> : files.length === 0 ? <p>No audio files found.</p> : (
        <ul>
          {files.map((file) => (
            <li key={file.url}>
              <span>{file.name}</span>
              <button onClick={() => dispatch(addTrack({ id: file.url, title: file.name, url: file.url }))}>
                ➕ Add to Playlist
              </button>
            </li>
          ))}
        </ul>
      )}

      <style jsx>{`
        .file-explorer {
          border: 1px solid #ddd;
          padding: 16px;
          border-radius: 8px;
          max-width: 400px;
          background: #f9f9f9;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px;
          border-bottom: 1px solid #ddd;
        }
        button {
          background: #0070f3;
          color: white;
          border: none;
          padding: 5px 10px;
          cursor: pointer;
          border-radius: 4px;
        }
        button:hover {
          background: #005bb5;
        }
      `}</style>
    </div>
  );
};