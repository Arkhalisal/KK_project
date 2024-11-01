"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function PostList() {
  const [postList, setPostList] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const res = await fetch("http://localhost:3001");
    const posts = await res.json();
    setPostList(posts);
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-center">
        <a className="ml-6" href="/">
          Home
        </a>
        <a className="ml-6" href="/routes/create-post">
          Create Post
        </a>
        <a className="ml-6" href="/routes/about-us">
          About Us
        </a>
      </div>
      {postList &&
        postList.map(({ _id, title, content }) => {
          return (
            <div key={_id} className="flex flex-col items-center m-3">
              <h1 className="m-3 text-3xl">{title}</h1>
              <p className="m-3 text-xl">{content.substring(0, 80)}...</p>
              <Link href={`/routes/post/${_id}`}>read more</Link>
            </div>
          );
        })}
    </div>
  );
}

export default PostList;
