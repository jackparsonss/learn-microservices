import express from "express";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

const app = express();

const commentsByPostId = {};

app.use(express.json());
app.use(cors());

app.get("/posts/:id/comments", (req, res) => {
  res.status(200).send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const postId = req.params.id;

  const comments = commentsByPostId[postId] || [];
  comments.push({ id: commentId, content, status: "Pending" });

  commentsByPostId[postId] = comments;

  await axios.post("http://event-bus-srv:4005/events", {
    type: "CommentCreated",
    data: { id: commentId, content, postId, status: "Pending" },
  });
  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Received Event: ", req.body.type);
  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;
    await axios.post("http://event-bus-srv:4005", {
      type: "CommentUpdated",
      data: {
        id,
        status,
        postId,
        content,
      },
    });
  }
  res.status(200).send({});
});

app.listen(4001, () => {
  console.log("Listening at http://localhost:4001");
});
