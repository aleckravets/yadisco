"use client";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setPath } from "@/lib/features/explorerSlice";
import { useEffect } from "react";

interface ExplorerProps {
  path: string;
}

export function Explorer({ path: queryPath }: ExplorerProps) {
  const { path, files, loading, error, errorStatus } = useAppSelector(
    (state) => state.explorer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPath(queryPath));
  }, [queryPath, dispatch]);

  const handleNavigate = (newPath: string) => {
    dispatch(setPath(newPath));
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    if (errorStatus === 401) {
      return <div>Ошибка авторизации, перенаправляем на страницу авторизации...</div>
    }
    return <div>Что-то пошло не так</div>;
  }

  return (
    <div>
      <h2>Current Path: {path}</h2>
      <div>
        {files && files.length > 0 ? (
          <ul>
            {files.map((file) => (
              <li key={file.name}>
                {file.type === "dir" ? (
                  <button
                    onClick={() => handleNavigate(`${path}/${file.name}`)}
                  >
                    📁 {file.name}
                  </button>
                ) : (
                  <span>📄 {file.name}</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div>No files found in this directory.</div>
        )}
      </div>
    </div>
  );
}
