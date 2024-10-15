"use client"

import Post from "@/components/Post";
import { useEffect, useState } from "react";
import { axiosGet } from "@/helpers/requests/get";

export default function Home() {

  const [getPosts, setgetPosts] = useState([])

  useEffect(() => {
    axiosGet({url:'/api/posts'})
      .then(res=> setgetPosts(res))
  }, [getPosts])
  

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
