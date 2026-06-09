import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type Theme = "light" | "dark" | "system";
export type Gender = "MALE" | "FEMALE";

interface PreferenceState {
  theme: Theme;
  gender: Gender | null;
  setTheme: (theme: Theme) => void;
  setGender: (gender: Gender | null) => void;
}

export const usePreferenceStore = create<PreferenceState>()(
  persist(
    immer((set) => ({
      theme: "system",
      gender: null,
      setTheme: (theme) =>
        set((state) => {
          if (theme === "dark" || theme === "light" || theme === "system") {
            state.theme = theme;
          } else {
            state.theme = "system";
          }
        }),
      setGender: (gender) =>
        set((state) => {
          if (gender === "MALE" || gender === "FEMALE") {
            state.gender = gender;
          } else {
            state.gender = null;
          }
        }),
    })),
    {
      name: "preference-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
