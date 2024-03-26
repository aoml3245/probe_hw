/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";

import Header from "./pages/Header";

function KimchiNicknamePage() {
  const [nickname, setNickname] = useState("");
  const [nickname2, setNickname2] = useState("");

  // 애칭을 입력하는 input 요소의 값이 변경될 때마다 호출되는 함수
  const handleNicknameChange = (event) => {
    setNickname(event.target.value); // 입력된 애칭을 상태에 업데이트
  };

  // 애칭을 제출하는 함수
  const submitNickname = () => {
    setNickname2(nickname);
  };
  return (
    <div>
      <h1>김치에 대한 애칭을 지어주세요</h1>
      <img
        src="kimchi.png"
        alt="김치 이미지"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <p>김치에 대한 애칭:{nickname2}</p>
      <input type="text" value={nickname} onChange={handleNicknameChange} />
      <button onClick={submitNickname}>애칭 제출</button>
    </div>
  );
}

function Clock() {
  const time = new Date();

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        color: "#fff",
        fontSize: "16px",
      }}
    >
      {time.toLocaleTimeString()}
    </div>
  );
}

function From() {
  return (
    <iframe
      title="기원"
      src="/from.html" // public 폴더에 있는 HTML 파일 경로
      width="100%"
      height="100%"
      frameBorder="0"
    />
  );
}

function Recipe() {
  return (
    <iframe
      title="레시피"
      src="/recipe.html" // public 폴더에 있는 HTML 파일 경로
      width="100%"
      height="100%"
      frameBorder="0"
    />
  );
}

function Home() {
  const currentTime = new Date();

  return (
    <>
      {" "}
      <Clock />
      <h1>김치</h1>
      <p>
        김치는 한국의 대표적인 발효식품으로, 배추를 발효시켜 만든 음식입니다. 주
        원료인 배추에 고춧가루, 마늘, 생강, 멸치 등을 넣어 만들며 매콤한 맛과
        풍부한 영양으로 유명합니다.
      </p>
    </>
  );
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/from" element={<From />}></Route>
          <Route path="/recipe" element={<Recipe />}></Route>
          <Route
            path="/KimchiNicknamePage"
            element={<KimchiNicknamePage />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
