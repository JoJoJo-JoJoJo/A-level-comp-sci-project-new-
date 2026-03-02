function setToSessionStorage<T>(key: string, value: T): void {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(
      `Failed to set value in session storage for key ${key}: ` + err,
    );
  }
}

function getFromSessionStorage<T>(key: string): T | null {
  const item = window.sessionStorage.getItem(key);
  if (item === null) return null;
  try {
    return JSON.parse(item) as T;
  } catch (err) {
    console.error("Error parsing stored value: " + err);
    return null;
  }
}

export { setToSessionStorage, getFromSessionStorage };
