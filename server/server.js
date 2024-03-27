const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 25000;

app.use(cors());
app.use(express.json());

// MySQL 연결 설정
console.log(process.env.MYSQL_ROOT_PASSWORD);
const connection = mysql.createConnection({
  host: "proweb_hw_back",
  user: "root", // 데이터베이스 사용자 이름
  password: process.env.MYSQL_ROOT_PASSWORD, // 데이터베이스 암호
  database: "proweb_hw", // 데이터베이스 이름
});
// // MySQL 연결 설정
// const connection = mysql.createPool({
//   host: "proweb_hw_back",
//   user: "root", // 데이터베이스 사용자 이름
//   password: "sdf23@dfd", // 데이터베이스 암호
//   database: "proweb_hw", // 데이터베이스 이름
// });

// 데이터베이스 생성 쿼리
const createDatabaseQuery = "CREATE DATABASE IF NOT EXISTS your_database";

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

function connect() {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error("Error connecting to database:", err);

        reject(err);
        return;
      }
      console.log("Connected to MySQL database");

      // 데이터베이스 생성
      connection.query(createDatabaseQuery, (err) => {
        if (err) {
          console.error("Error creating database:", err);
          return;
        }
        console.log("Database created successfully");

        // 데이터베이스 선택
        connection.query("USE your_database", (err) => {
          if (err) {
            console.error("Error selecting database:", err);
            return;
          }
          console.log("Database selected successfully");

          // 테이블 생성
          connection.query(createTableQuery, (err) => {
            if (err) {
              console.error("Error creating table:", err);
              return;
            }
            console.log("Table created successfully");
          });
        });
      });
    });
  });
}

function establishConnection() {
  var a = connect();
  a.then((a) => console.log("success")).catch((err) => {
    console.error("Retrying");
    // I suggest using some variable to avoid the infinite loop.
    setTimeout(establishConnection, 2000);
  });
}

establishConnection();

// 게시물 목록 조회
app.get("/post/:id", (req, res) => {
  const { id } = req.params;
  connection.query("SELECT * FROM posts where id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error updating post:", err);
      res.status(500).json({ error: "Failed to update post" });
      return;
    }
    res.json(result[0]);
  });
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
app.post("/post", (req, res) => {
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
app.put("/post/:id", (req, res) => {
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
app.delete("/post/:id", (req, res) => {
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
