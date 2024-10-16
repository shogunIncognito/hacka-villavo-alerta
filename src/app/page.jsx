"use client"

import Post from "@/components/Post";
import { useEffect, useState } from "react";
import { axiosGet } from "@/helpers/requests/get";
import { usePosts } from "@/store/posts";
import { SkeletonPosts } from "@/helpers/helpersAll";
import { SkeletonCard } from "@/components/SkeletonCard";

export default function Home() {

  const { getPosts, setPosts } = usePosts()
  const [loanding, setLoanding] = useState(false)

  useEffect(() => {
    setLoanding(true)
    axiosGet({ url: '/api/posts' })
      .then(res => {
        const sortedPosts = res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts);
      })
      .catch(error => console.log(error))
      .finally(() => setLoanding(false))
  }, [])

  return (
    // Vista inicial posts
    <div className="w-full h-full p-11">
      <main className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {
            loanding ?
              SkeletonPosts.map((skeleton, index) => {
                return (
                  <SkeletonCard key={index} />
                )
              })
              :
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
