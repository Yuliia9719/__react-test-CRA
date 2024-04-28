import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

export interface PostInterface {
  id: number;
  title: string;
  body: string;
  userId: number;
}
function App() {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data: PostInterface[] = await response.json();
      setPosts(data);
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      <ul>
        {posts.map((post: PostInterface) =>
          <li key={post.id}>
            <h3>
              {post.title}
            </h3>
            <p>
              {post.body}
            </p>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
