import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  name: string;
  email: string;
  profileURL: string;
  isLogged: boolean;
  uid: string;
  role: "admin" | "user";
  favourites: string[];
  updateFavourites: (favourites: string[]) => void;
  setUser: (user: {
    name: string;
    email: string;
    profileURL: string;
    uid: string;
    role: "admin" | "user";
    isLogged: boolean;
  }) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      name: "",
      email: "",
      profileURL: "",
      isLogged: false,
      uid: "",
      role: "user",
      favourites: [],
      setUser: (user) =>
        set({
          name: user.name,
          email: user.email,
          profileURL: user.profileURL || "",
          uid: user.uid,
          role: user.role || "user",
          isLogged: true,
        }),
      updateFavourites: (favourites: string[]) => set({ favourites }),
      clearUser: () =>
        set({
          name: "",
          email: "",
          profileURL: "",
          uid: "",
          role: "user",
          isLogged: false,
        }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
