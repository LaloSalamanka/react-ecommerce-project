import "./bootstrap-custom.css";
import "./index.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createRoot } from 'react-dom/client'; // 使用 createRoot 來替代 ReactDOM.render
import React from "react";
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

// 將圖標加入 FontAwesome 庫
library.add(fas, far, fab);

// 使用 createRoot 來取代 ReactDOM.render
const root = createRoot(document.getElementById("root")); // 創建一個 React root
/*
  createRoot 負責將 App 元件掛載到 DOM 中的根元素，這是 React 18 以後的推薦方法
  React.StrictMode 來開啟開發模式中的額外檢查，幫助開發者發現潛在的問題
  BrowserRouter 
    是 React Router 庫中的一個組件，用來在 React 應用中處理路由導航。
    它利用 HTML5 的 History API，讓你在不重新載入整個頁面的情況下進行頁面間的切換。
    通常，它會包裹整個應用，並且允許你使用 Route 或 Link 等組件來定義路徑和導航。它的作用是讓你的 React 應用能夠進行動態的頁面轉換，並管理 URL。
  App 元件是應用的根元件，將它渲染到 DOM 中。
*/
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
