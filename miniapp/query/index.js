import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.status(200).send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
    return res.status(200).send({ message: "post stored" });
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    posts[postId].comments.push({ id, content, status });
    return res.status(200).send({ message: "comment stored" });
  }

  if (type === "CommentUpdated") {
    const { id, content, status, postId } = data;
    const comments = posts[postId].comments;
    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;
    comment.content = content;
    return res.status(200).send({ message: "comment updated" });
  }
});

app.listen(4002, () => {
  console.log("listening on http://localhost:4002");
});
