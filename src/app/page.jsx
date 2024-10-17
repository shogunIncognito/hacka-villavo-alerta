"use client"

import Post from "@/components/Post";
import { useEffect, useState } from "react";
import { axiosGet } from "@/helpers/requests/get";
import { SkeletonPosts } from "@/helpers/helpersAll";
import { SkeletonCard } from "@/components/SkeletonCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState({
    posts: [],
    lastPage: false
  })
  const [loading, setLoading] = useState(true)
  const [pageLoading, setPageLoading] = useState(false)

  useEffect(() => {
    axiosGet({ url: `/api/posts?page=${page}` })
      .then(res => {
        setPosts({
          posts: [...posts.posts, ...res.posts],
          lastPage: res.lastPage
        });
      })
      .catch(error => console.log(error))
      .finally(() => {
        setLoading(false)
        setPageLoading(false)
      })
  }, [page])

  return (
    // Vista inicial posts
    <div className="w-full h-full p-11">
      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {
            loading ?
              SkeletonPosts.map((skeleton, index) => {
                return (
                  <SkeletonCard key={index} />
                )
              })
              :
              posts.posts.map(post => {
                return (
                  <Post post={post} key={post._id} />
                )
              })
          }

        </div>

        {!posts.lastPage && (
          <div className="flex justify-center mt-10">
            <Button
              onClick={() => {
                setPageLoading(true)
                setPage(page + 1)
              }}
              disabled={pageLoading}
              className="md:w-1/6 w-1/3 shadow" variant='ghost'
            >
              {pageLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Cargar más'}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
