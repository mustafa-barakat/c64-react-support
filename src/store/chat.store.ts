import { create } from 'zustand'

const useChatStore = create((set) => ({
  chats: [
    {
      message: 'Hello',
      dir: 'incoming',
    },
  ],
  lastUpdate: new Date('1970-01-01'),
  // increasePopulation: () => set((state: any) => ({ chats: state.bears + 1 })),
  clearChat: () => set({ chats: [] }),
  // sendMessage: (message: string) =>
  //   set((state: { chats: any }) => ({
  //     chats: [...state.chats, message],
  //     lastUpdate: new Date(),
  //   })),

  getChatHistory: async () => {
    const session = localStorage.getItem('session') || null
    const key = localStorage.getItem('sessionKey') || null
    if (!session || !key) {
      const response = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey: '92522612-81484-49112-1112510-2142100502107710' }),
      })
      const data = await response.json()
      localStorage.setItem('session', data.session)
      localStorage.setItem('sessionKey', data.sessionKey)
      set({ chats: data.chats })
    } else {
      const response = await fetch(
        `http://localhost:3001/message?sessionId=${session || ''}&sessionKey=${
          key || ''
        }&apiKey=92522612-81484-49112-1112510-2142100502107710
      `,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      const data = await response.json()
      set({ chats: data })
    }
  },
  sendMessage: async (message: string) => {
    const sessionId = localStorage.getItem('session') || null
    const sessionKey = localStorage.getItem('sessionKey') || null
    await fetch('http://localhost:3001/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId, sessionKey, message, apiKey: '92522612-81484-49112-1112510-2142100502107710' }),
    })
    // const data = await response.json()
    set((state: { chats: any }) => ({
      chats: [...state.chats, { message, dir: 'outgoing' }],
      lastUpdate: new Date(),
    }))
  },
}))
export default useChatStore
