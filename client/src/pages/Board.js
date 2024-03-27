import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Board.css"; // CSS 파일을 import

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [pageNum, setPageNum] = useState(0);
  const [newPost, setNewPost] = useState({
    author: "",
    title: "",
    content: "",
  });
  const [eidtPost, setEditPost] = useState({
    author: "",
    title: "",
    content: "",
  });

  useEffect(() => {
    fetchPosts();
  }, []); // 컴포넌트가 처음 렌더링될 때만 호출

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACK_URL + "/posts"
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSelectPost = async (post) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACK_URL + `/post/${post.id}`
      );
      await setSelectedPost(response.data);
      setEditPost(response.data);
      console.log("df", selectedPost);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const handleCreatePost = async () => {
    try {
      await axios.post(process.env.REACT_APP_BACK_URL + "/post", newPost);

      fetchPosts();
      setNewPost({ author: "", title: "", content: "", created_at: "" });

      setEditPost({ author: "", title: "", content: "", created_at: "" });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleUpdatePost = async () => {
    try {
      await axios.put(
        process.env.REACT_APP_BACK_URL + `/post/${selectedPost.id}`,
        eidtPost
      );
      fetchPosts();
      setSelectedPost(null);
      setEditPost({ author: "", title: "", content: "", created_at: "" });
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(
        process.env.REACT_APP_BACK_URL + `/post/${selectedPost.id}`
      );
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
      {selectedPost !== null && (
        <div className="selected-post-section">
          {" "}
          {/* 추가된 CSS 클래스 */}
          <h2>글 상세 내용</h2>
          <p>
            글쓴이:{" "}
            <input
              type="text"
              placeholder="글쓴이"
              value={eidtPost.author}
              onChange={(e) =>
                setEditPost({ ...eidtPost, author: e.target.value })
              }
            />
          </p>
          <p>
            제목:{" "}
            <input
              type="text"
              placeholder="제목"
              value={eidtPost.title}
              onChange={(e) =>
                setEditPost({ ...eidtPost, title: e.target.value })
              }
            />
          </p>
          <p>
            내용:{" "}
            <textarea
              placeholder="내용"
              value={eidtPost.content}
              onChange={(e) =>
                setEditPost({ ...eidtPost, content: e.target.value })
              }
            />
          </p>
          <p>작성시간: {eidtPost.created_at}</p>
          <button onClick={() => handleUpdatePost()}>글 수정</button>
          <button onClick={() => handleDeletePost(posts.indexOf(selectedPost))}>
            글 삭제
          </button>
        </div>
      )}
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
          {posts
            .slice(pageNum * pageSize, (pageNum + 1) * pageSize)
            .map((post, index) => (
              <li
                key={index}
                className="post-item"
                onClick={() => handleSelectPost(post)}
              >
                {/* 추가된 CSS 클래스 */}
                <span>{post.title}</span> - {post.author} - {post.created_at}
              </li>
            ))}
        </ul>
        <button
          onClick={() => {
            if (pageNum !== 0) {
              console.log("Go to prev page");
              setPageNum(pageNum - 1);
            }
          }}
        >
          Prev Page
        </button>
        <button
          onClick={() => {
            console.log("Go to next page");
            setPageNum(pageNum + 1);
          }}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Board;
