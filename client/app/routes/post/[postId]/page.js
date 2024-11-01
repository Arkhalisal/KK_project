"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PostPage = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState("");

  useEffect(() => {
    post(postId);
  }, [postId]);

  async function post(postId) {
    const res = await fetch(`http://localhost:3001/post/${postId}`);
    const data = await res.json();
    setPostData(data[0]);
  }

  return (
    <div>
      postid: {postId}
      <div>{postData.title}</div>
      <div>{postData.content}</div>
    </div>
  );
};

export default PostPage;
