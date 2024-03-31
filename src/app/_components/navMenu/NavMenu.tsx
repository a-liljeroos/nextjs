import React, { useRef } from "react";
import Image from "next/image";
// auth
import { useSession, signIn, signOut } from "next-auth/react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../_lib/store";
import { toggleMenu } from "../../_lib/menuSlice";
//styles
import "./navMenu.scss";
import Link from "next/link";

const NavMenu = () => {
  // auth
  const { data: session } = useSession();

  // menu reducer
  const isOpen = useSelector((state: RootState) => state.menu.isOpen);
  const dispatch = useDispatch();

  // refs
  const navBoardRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const toggleBoard = (isOpen: boolean): void => {
    let opeKeyFrames = new KeyframeEffect(
      navBoardRef.current,
      [{ right: "-100vw" }, { right: "-30px" }],
      {
        duration: 250,
        easing: "ease-in-out",
        fill: "forwards",
      }
    );
    let openAnimation = new Animation(opeKeyFrames, document.timeline);

    let closeKeyFrames = new KeyframeEffect(
      navBoardRef.current,
      [{ right: "-30px" }, { right: "-100vw" }],
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
        className="menu-btn"
        onClick={() => {
          dispatch(toggleMenu());
          toggleBoard(isOpen);
        }}
      >
        👆
      </button>
      {session ? (
        <div className="nav-session-data">
            {session.user?.image && (
              <Image
              src={session.user?.image as string}
              alt={session.user?.name as string}
              width="60"
              height="60"
              style={{ borderRadius: "50%" }}
              />
            )}
          <button onClick={() => signOut()} className="nav-btn">
            Logout
          </button>
        </div>
      ) : (
          <div className="flex gap-2">
           <button onClick={() => signIn()} className="nav-btn">
              Login
          </button>
          <Link href="/register">
            <button className="nav-btn">
               Register
            </button>
           </Link>
          </div>
      )}

      <div className="relative">
        <div
          ref={navBoardRef}
          style={{ position: "absolute", top: "30", right: "-100vw" }}
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
