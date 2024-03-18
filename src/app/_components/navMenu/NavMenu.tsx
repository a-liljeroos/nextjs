import React, { useRef } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../_lib/store";
import { toggleMenu } from "../../_lib/menuSlice";
//styles
import "./navMenu.scss";

const NavMenu = () => {
  // menu reducer
  const isOpen = useSelector((state: RootState) => state.menu.isOpen);
  const dispatch = useDispatch();

  // refs
  const navBoardRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const toggleBoard = (isOpen: boolean): void => {
    let opeKeyFrames = new KeyframeEffect(
      navBoardRef.current,
      [{ right: "-115%" }, { right: "-30px" }],
      {
        duration: 250,
        easing: "ease-in-out",
        fill: "forwards",
      }
    );
    let openAnimation = new Animation(opeKeyFrames, document.timeline);

    let closeKeyFrames = new KeyframeEffect(
      navBoardRef.current,
      [{ right: "-30px" }, { right: "-115%" }],
      {
        duration: 250,
        easing: "ease-in-out",
        fill: "forwards",
      }
    );
    let closeAnimation = new Animation(closeKeyFrames, document.timeline);

    if (!isOpen) {
      toggleButtonRef.current?.animate(
        [{ transform: "rotate(0deg)" }, { transform: "rotate(90deg)" }],
        {
          duration: 250,
          easing: "ease-in-out",
          fill: "forwards",
        }
      );

      openAnimation.play();
      return;
    }

    if (isOpen) {
      toggleButtonRef.current?.animate(
        [{ transform: "rotate(90deg)" }, { transform: "rotate(0deg)" }],
        {
          duration: 250,
          easing: "ease-in-out",
          fill: "forwards",
        }
      );
      closeAnimation.play();
      return;
    }
  };

  return (
    <nav>
      <button
        ref={toggleButtonRef}
        className=" bg-purple-300 h-9 w-9 nav-btn"
        style={{
          clipPath: "polygon(0% 0%, 70% 0, 100% 30%, 100% 100%, 0% 100%)",
        }}
        onClick={() => {
          dispatch(toggleMenu());
          toggleBoard(isOpen);
        }}
      ></button>
      <div className="relative">
        <div
          ref={navBoardRef}
          style={{ position: "absolute", top: "30", right: "-115%" }}
          className="nav-board"
        >
          <div className="nav-board-content">
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Projects</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
