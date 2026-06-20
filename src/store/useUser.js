import { create } from 'zustand';

const useUser = create((set) => ({
  user: null,
  setProperty: (property, value) => set(state => ({ user: { ...state.user, [property]: value } })),
  setUser: (newUser) => set({user: newUser}),
}));

export default useUser;
