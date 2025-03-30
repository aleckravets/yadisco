export function getSearchParams(
  params: object
): URLSearchParams {
  const searchParams = new URLSearchParams();

  const appendParam = (key: string, value: unknown) => {
    if (value === null || value === undefined) return;

    if (Array.isArray(value)) {
      searchParams.append(key, value.map((v) => String(v)).join(","));
    } else if (typeof value === "object" && !(value instanceof Date)) {
      // Stringify objects (Axios-style) or use dot notation?
      searchParams.append(key, JSON.stringify(value));
    } else if (value instanceof Date) {
      searchParams.append(key, value.toISOString());
    } else {
      searchParams.append(key, String(value));
    }
  };

  for (const [key, value] of Object.entries(params)) {
    appendParam(key, value);
  }

  return searchParams;
}
