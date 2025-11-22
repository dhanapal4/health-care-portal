import { create } from 'zustand';

// Define the store
const useGoalsStore = create((set) => ({
  goals: [], // initial state
  addGoals: (newGoals) => set((state) => ({ goals: [...state.goals, newGoals] })),
  reset: () => set({ goals: [] }),
}));

export default useGoalsStore;
