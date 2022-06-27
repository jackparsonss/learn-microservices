import "./App.css";
import PostCreate from "./Components/PostCreate";
import PostList from "./Components/PostList";

function App() {
  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreate />
      <hr />
      <h2>Posts</h2>
      <PostList />
    </div>
  );
}

export default App;
