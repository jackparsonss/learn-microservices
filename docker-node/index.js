import express from 'express';

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("<h1>WORKING</h1>")
});

app.listen(8080, () => {
    console.log("Listening at http://localhost:8080");
});