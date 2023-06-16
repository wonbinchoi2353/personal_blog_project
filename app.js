const express = require("express");
const app = express();
const port = 3000;

const postsRouter = require("./routes/posts");
const connect = require("./schemas");
connect();

// post 사용하기 위한 문법, body parser
app.use(express.json());
app.use("/", [postsRouter]);

app.get("/", (req, res) => {
  res.send("블로그 페이지 입니다.");
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸습니다.");
});
