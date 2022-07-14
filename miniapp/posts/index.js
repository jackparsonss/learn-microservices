import express from "express";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

const app = express();

const posts = {};

app.use(express.json());
app.use(cors());

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const title = req.body.title;

  posts[id] = {
    id,
    title,
  };

  await axios.post("http://event-bus-srv:4005/events", {
    type: "PostCreated",
    data: posts[id],
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Received Event: ", req.body.type);
  res.status(200).send({});
});

app.listen(4000, () => {
  console.log("NEW VERSION");
  console.log("Listening at http://localhost:4000");
});
