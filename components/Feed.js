import { db } from "../firebase";
import React, { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import Input from "../components/Input";
import Post from "../components/Post";
import { BsTwitter } from "react-icons/bs";
import { useSession } from "next-auth/react";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  }, [db]);

  console.log(posts);

  return (
    <div className="border-r border-slate-200 py-2 mt-[50px] flex-1">
      <div className="flex sm:hidden bg-[#ffffffd1] fixed top-0 left-0 w-full items-center gap-[50%] px-4">
        <img
          src={session?.user?.image}
          alt=""
          className="h-10 w-10 rounded-full "
        />
        <div className="flex items-center justify-center w-14 h-14 hoverEffect p-0">
          <BsTwitter className="text-4xl text-deepBlue" />
        </div>
      </div>
      <div className="hidden fixed top-0 w-full bg-[#ffffffd1] backdrop-blur-md sm:block font-bold text-xl p-4">
        Home
      </div>
      <Input />
      {posts.map((post) => (
        <Post key={post.id} id={post.id} post={post.data()} />
      ))}
    </div>
  );
}
