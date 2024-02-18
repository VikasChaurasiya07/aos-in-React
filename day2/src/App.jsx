import { useState, useRef } from "react";
import cookie from "./assets/cookie.png";

function App() {
  const parent = useRef(null);
  const [count, setCount] = useState(1);

  function randomCookie() {
    setCount(count + 1);
    const randomLeft = Math.random() * window.innerWidth;
    const randomTop = Math.random() * window.innerHeight;

    const fragment = document.createDocumentFragment();

    fragment
      .appendChild(document.createElement("img"))
      .setAttribute("src", cookie);

    parent.current.appendChild(fragment);

    const img = document.querySelectorAll("img");
    img[img.length - 1].style.left = randomLeft + "px";
    img[img.length - 1].style.top = randomTop + "px";
  }

  function removeCookie() {
    if (count != 0) {
      setCount(count - 1);
    } else {
      setCount(0);
    }

    const img = document.querySelectorAll("img");
    if (img.length != 0) {
      img[img.length - 1].remove();
    }
  }

  function reset() {
    setCount(0);
    const img = document.querySelectorAll("img");
    for (const item of img) {
      item.remove();
    }
  }

  return (
    <>
      <div className="counter">
        <h1>Cookie Count: {count}</h1>
        <div>
          <button onClick={randomCookie}>+</button>
          <button onClick={removeCookie}>-</button>
        </div>
        <button
          onClick={() => {
            reset();
          }}
        >
          Reset
        </button>
      </div>
      <div className="container-full" ref={parent}>
        <div className="cookie-div">
          <img src={cookie} alt="" width="200px" />
        </div>
      </div>
    </>
  );
}

export default App;
