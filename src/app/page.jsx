"use client"

import Post from "@/components/Post";
import { useEffect, useState } from "react";
import { axiosGet } from "@/helpers/requests/get";
import { usePosts } from "@/store/posts";

export default function Home() {

  const { getPosts, setPosts } = usePosts()

  useEffect(() => {
    axiosGet({ url: '/api/posts' })
      .then(res => {
        const sortedPosts = res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts);
      })
  }, [])

  return (
    // Vista inicial posts
    <div className="w-full h-full p-11">
      <main className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {
            getPosts.map(post => {
              return (
                <Post post={post} key={post._id} />
              )
            })
          }
        </div>
      </main>
    </div>
  );
}
