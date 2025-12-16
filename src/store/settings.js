import { devtools, persist } from 'zustand/middleware';

import { create } from 'zustand';

export const useUserStore = create(
  devtools(
    persist(
      (set) => ({
        isLoggedIn: false,
        user: null,
        setUser(user) {
          set(() => ({ user }));
        },
        setIsLoggedIn(status) {
          set(() => ({ isLoggedIn: status }));
        },
      }),
      { name: 'settings' },
    ),
  ),
);
