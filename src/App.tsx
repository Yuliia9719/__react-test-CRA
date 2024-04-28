import { useEffect, useState } from "react";
import { PostInterface } from "./types/PostInterface";
import { fetchData } from "./utils/api";

function App() {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchDataAndHandleErrors = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchData();
        setPosts(data);
        setIsLoading(false);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataAndHandleErrors();
  }, []);
  return (
    <div className="App">
      <h1>Post title</h1>
      {isLoading && <h4>Loading....</h4>}
      {error &&
        <h5>
          {error}
        </h5>}

      {!isLoading &&
        !error &&
        posts.length &&
        <ol>
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
        </ol>}
    </div>
  );
}

export default App;
