"use client"

import Post from "@/components/Post";
import { useEffect, useState } from "react";
import { axiosGet } from "@/helpers/requests/get";
import { usePosts } from "@/store/posts";
import { SkeletonPosts } from "@/helpers/helpersAll";
import { SkeletonCard } from "@/components/SkeletonCard";

export default function Home() {

  const { getPosts, setPosts } = usePosts()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axiosGet({ url: '/api/posts' })
      .then(res => {
        setPosts(res.posts);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }, [])

  return (
    // Vista inicial posts
    <div className="w-full h-full p-11">
      <main className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {
            loading ?
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
