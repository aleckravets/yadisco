"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Что-то пошло не так</h2>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  );
}
