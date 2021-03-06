import express from "express";
import axios from "axios";

const app = express();

app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios.post("http://event-bus-srv:4005", {
      type: "CommentModerated",
      data: {
        ...data,
        status,
      },
    });
  }
  res.send({ message: "comment moderated" });
});

app.listen(4003, () => {
  console.log("Listening at http://localhost:4003");
});
