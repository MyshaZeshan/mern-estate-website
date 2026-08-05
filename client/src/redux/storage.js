// storage.js — plain localStorage adapter (works around Vite 8/Rolldown + redux-persist CJS interop bug)
const storage = {
  getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),
  setItem: (key, value) => Promise.resolve(window.localStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(window.localStorage.removeItem(key)),
};

export default storage;