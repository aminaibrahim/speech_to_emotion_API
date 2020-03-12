const express = require("express");
const path = require("path");
const Sentiment = require("sentiment");
const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
  console.log("lll");
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/emotion", function(req, res) {
  const sentiment = new Sentiment();
  const text = req.query.text; // this returns our request query "text"
  // const text = "I hope this is not horrendous";
  const score = sentiment.analyze(text);
  console.log(sentiment, "......", text, ".......", score);
  res.send(score);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}!`);
});
