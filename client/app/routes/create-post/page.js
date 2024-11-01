"use client";

import { useState } from "react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [comment, setComment] = useState("");

  async function handleSubmit() {
    const db = await fetch(`http://localhost:3001/create-post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
    const data = await db.json();
    setTitle("");
    setContent("");
    if (data.comment) setComment(data.comment);
  }

  return (
    <div className="flex flex-col items-center m-8 text-center">
      Create Post
      <div className="flex flex-col m-2">
        <div>
          <input
            className="border-2 w-96"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
        </div>
        <div>
          <textarea
            className="border-2 w-96"
            value={content}
            onChange={(ev) => setContent(ev.target.value)}
          />
        </div>
        <button onClick={() => handleSubmit()} className="m-4">
          Create
        </button>
        {comment}
      </div>
    </div>
  );
}
