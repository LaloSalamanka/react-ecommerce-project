// Content 元件會接收來自父元件（這裡是 Template 元件）傳遞的 props.children，並將它們渲染在 <main> 標籤內。
function Content(props) {
    return (
      <main className="flex-shrink-0 bg-light">
        {props.children}
      </main>
    );
  }
  
  export default Content;