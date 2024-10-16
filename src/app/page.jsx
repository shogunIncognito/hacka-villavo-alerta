"use client"

import Post from "@/components/Post";
import { useEffect, useState } from "react";
import { axiosGet } from "@/helpers/requests/get";
import { usePosts } from "@/context/posts";

export default function Home() {

  const {getPosts, setPosts} = usePosts()

  useEffect(() => {
    axiosGet({url:'/api/posts'})
      .then(res=> setPosts(res))
  }, [])
  

  return (
    // Vista inicial posts
    <div className="w-full h-full py-11">
      <main className="">
        <div className="gridResponsive">
        {
          getPosts.map(post=>{
            return(
              <>
                <Post post={post} key={post._id}/>
              </>
            )
          })
        }
        </div>
      </main>
    </div>
  );
}
