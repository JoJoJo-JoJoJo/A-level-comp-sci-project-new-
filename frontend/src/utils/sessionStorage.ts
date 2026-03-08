//? Set a new key-value pair to session storage
function setToSessionStorage<T>(key: string, value: T): void {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(
      `Failed to set value in session storage for key ${key}: ` + err,
    );
  }
}

//? Get an item from session storage (if exists) + coerce it to given type
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
