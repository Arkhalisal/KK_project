"use client";

import PostList from "./component/PostList";
import Login from "./component/Login";
import { useState } from "react";

export default function Home() {
  const [auth, setAuth] = useState(false);

  return (
    <div>
      {!auth && <Login setAuth={setAuth} />}
      {auth && <PostList />}
    </div>
  );
}
