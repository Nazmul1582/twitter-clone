import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import Post from "./Post";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "next/router";
import Comment from "./Comment";

const SinglePost = () => {
  const [post, setPost] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const [comments, setComments] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(doc(db, "posts", id), (snapshot) => {
        setPost(snapshot.data());
      }),
    [db]
  );

  return (
    <div className="min-h-screen border-r border-slate-100 py-2 flex-1">
      <div className="flex items-center gap-4 font-medium bg-[#ffffffd1] sticky top-0 px-4 py-2">
        <BsArrowLeft
          className="cursor-pointer"
          onClick={() => router.push(`/`)}
        />
        Twitter
      </div>

      <Post id={id} post={post} />

      <div className="border-t border-slate-100">
        {comments.length > 0 && (
          <div className="pb-72">
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                id={comment.id}
                comment={comment.data()}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
