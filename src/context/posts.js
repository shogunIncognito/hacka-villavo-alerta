import { create } from 'zustand'

export const usePosts = create((set) => ({
  getPosts: [],
  setPosts: (getPosts) => {
    set({ getPosts })
},
}))