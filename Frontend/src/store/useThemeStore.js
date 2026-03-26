import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("synq-theme") || "forest",
  setTheme: (theme) => {
    localStorage.setItem("synq-theme", theme);
    set({ theme });
  },
}));
