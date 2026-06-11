import { create } from 'zustand';

const useUser = create((set) => ({
  username: '',
  setUsername: (username) => set({ username }),
}));

export default useUser;
