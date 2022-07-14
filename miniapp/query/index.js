import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.status(200).send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data, res);
});

app.listen(4002, async () => {
  console.log("listening on http://localhost:4002");
  const res = await axios
    .get("http://event-bus-srv:4005/events")
    .catch(() => console.log("could not get events"));
  for (let event of res.data) {
    console.log("Processing event: ", event.type);
    handleEvent(event.type, event.data);
  }
});

const handleEvent = (type, data, res) => {
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
};
