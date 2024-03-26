import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Board.css"; // CSS 파일을 import

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [newPost, setNewPost] = useState({
    author: "",
    title: "",
    content: "",
  });

  useEffect(() => {
    fetchPosts();
  }, []); // 컴포넌트가 처음 렌더링될 때만 호출

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:25000/posts");
      console.log(response);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSelectPost = async (post) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:25000/posts/${post.id}`
      );
      setSelectedPost(response.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const handleCreatePost = async () => {
    try {
      await axios.post("http://127.0.0.1:25000/posts", newPost);
      setPosts([...posts, newPost]);
      setNewPost({ author: "", title: "", content: "" });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleUpdatePost = async (updatedPost) => {
    try {
      await axios.put(
        `http://127.0.0.1:25000/posts/${selectedPost.id}`,
        updatedPost
      );
      const updatedPosts = posts.map((post) =>
        post.id === selectedPost.id ? { ...post, ...updatedPost } : post
      );
      setPosts(updatedPosts);
      setSelectedPost(null);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`http://127.0.0.1:25000/posts/${selectedPost.id}`);
      const updatedPosts = posts.filter((post) => post.id !== selectedPost.id);
      setPosts(updatedPosts);
      setSelectedPost(null);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // 나머지 코드는 이전과 동일

  return (
    <div className="board-container">
      {" "}
      {/* 추가된 CSS 클래스 */}
      <h1>게시판</h1>
      <div className="posts-section">
        {" "}
        {/* 추가된 CSS 클래스 */}
        <h2>글 목록</h2>
        <select onChange={(e) => setPageSize(parseInt(e.target.value))}>
          <option value={10}>10개씩</option>
          <option value={20}>20개씩</option>
          <option value={30}>30개씩</option>
        </select>
        <ul>
          {posts.slice(0, pageSize).map((post, index) => (
            <li key={index} className="post-item">
              {" "}
              {/* 추가된 CSS 클래스 */}
              <span onClick={() => handleSelectPost(post)}>
                {post.title}
              </span> - {post.author} - {post.timestamp}
              {index === posts.length - 1 && posts.length > pageSize && (
                <button onClick={() => console.log("Go to next page")}>
                  Next Page
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="new-post-section">
        {" "}
        {/* 추가된 CSS 클래스 */}
        <h2>글쓰기</h2>
        <input
          type="text"
          placeholder="글쓴이"
          value={newPost.author}
          onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="제목"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          placeholder="내용"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <button onClick={handleCreatePost}>작성</button>
      </div>
      {selectedPost && (
        <div className="selected-post-section">
          {" "}
          {/* 추가된 CSS 클래스 */}
          <h2>글 상세 내용</h2>
          <p>글쓴이: {selectedPost.author}</p>
          <p>제목: {selectedPost.title}</p>
          <p>내용: {selectedPost.content}</p>
          <button
            onClick={() => handleUpdatePost({ author: "Updated Author" })}
          >
            글 수정
          </button>
          <button onClick={() => handleDeletePost(posts.indexOf(selectedPost))}>
            글 삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default Board;
