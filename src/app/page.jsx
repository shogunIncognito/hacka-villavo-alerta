import Post from "@/components/Post";
import postsJson from '@/app/json/posts.json'

export default function Home() {
  return (
    // Vista inicial posts
    <div className="w-full h-full py-11">
      <main className="">
        <div className="gridResponsive">
        {
          postsJson.map(post=>{
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
