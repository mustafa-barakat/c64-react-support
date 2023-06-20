import { create } from 'zustand'

const useChatStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state: any) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  // fetch: async (pond) => {
  //   const response = await fetch(pond)
  //   set({ fishies: await response.json() })
  // },
}))
export default useChatStore
