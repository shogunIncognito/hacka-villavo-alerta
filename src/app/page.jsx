import Post from "@/components/Post";
import postsJson from '@/app/json/posts.json'

export default function Home() {
  return (
    // Vista inicial posts
    <div className="w-full h-full">
      <main className="">
        <div className="grid grid-cols-2 place-content-center place-items-center">
        {
          postsJson.map(post=>{
            return(
              <>
                <Post key={post._id}/>
              </>
            )
          })
        }
        </div>
      </main>
    </div>
  );
}
