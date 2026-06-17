import { create } from 'zustand';

const useUser = create((set) => ({
  user: null,
  setUsername: (user) => set( {user} ),
}));

export default useUser;
