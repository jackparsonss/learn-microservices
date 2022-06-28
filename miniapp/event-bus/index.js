import express from "express";
import axios from "axios";

const app = express();

app.use(express.json());

app.post("/events", (req, res) => {
  const event = req.body;

  axios
    .post("http://localhost:4000/events", event)
    .catch(() => console.log("Posts service is down..."));
  axios
    .post("http://localhost:4001/events", event)
    .catch(() => console.log("Comments service is down..."));
  axios
    .post("http://localhost:4002/events", event)
    .catch(() => console.log("Query service is down..."));
  axios
    .post("http://localhost:4003/events", event)
    .catch(() => console.log("Moderation service is down..."));

  res.status(200).send({ message: "event sent" });
});

app.listen(4005, () => {
  console.log("Listening on http://localhost:4005");
});
