import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

function Template(props) {
  return (
    // 這邊的 props 是 App.js 中使用 <Template> 包住的內容，也就是 children 就是 Routes 裡的內容。
    // 這邊將 Routes 傳遞給 Content
    <>
      <Header />
      <Content>{props.children}</Content>
      <Footer />
    </>
  );
}

export default Template;