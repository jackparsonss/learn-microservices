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
  comments.push({ id: commentId, content });

  commentsByPostId[postId] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: { id: commentId, content, postId },
  });
  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("Received Event: ", req.body.type);
  res.status(200).send({});
});

app.listen(4001, () => {
  console.log("Listening at http://localhost:4001");
});
