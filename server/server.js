const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 25000;

app.use(cors());
app.use(express.json());

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: "localhost",
  user: "your_username", // 데이터베이스 사용자 이름
  password: "your_password", // 데이터베이스 암호
  database: "your_database", // 데이터베이스 이름
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// 게시물 목록 조회
app.get("/posts", (req, res) => {
  connection.query("SELECT * FROM posts", (err, results) => {
    if (err) {
      console.error("Error fetching posts:", err);
      res.status(500).json({ error: "Failed to fetch posts" });
      return;
    }
    res.json(results);
  });
});

// 게시물 생성
app.post("/posts", (req, res) => {
  const { author, title, content } = req.body;
  const post = { author, title, content };
  connection.query("INSERT INTO posts SET ?", post, (err, result) => {
    if (err) {
      console.error("Error creating post:", err);
      res.status(500).json({ error: "Failed to create post" });
      return;
    }
    post.id = result.insertId;
    res.json(post);
  });
});

// 게시물 수정
app.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { author, title, content } = req.body;
  connection.query(
    "UPDATE posts SET author = ?, title = ?, content = ? WHERE id = ?",
    [author, title, content, id],
    (err, result) => {
      if (err) {
        console.error("Error updating post:", err);
        res.status(500).json({ error: "Failed to update post" });
        return;
      }
      res.json({ id, author, title, content });
    }
  );
});

// 게시물 삭제
app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  connection.query("DELETE FROM posts WHERE id = ?", id, (err, result) => {
    if (err) {
      console.error("Error deleting post:", err);
      res.status(500).json({ error: "Failed to delete post" });
      return;
    }
    res.json({ id });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
