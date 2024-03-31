"use client";
import { signIn } from "next-auth/react";
import React, { useRef, useEffect, useState, FormEvent } from "react";
import Link from "next/link";
// functions
import { delay } from "../_components/utils/functions";
import { isUsernameAvailable } from "./_functions/functions";
// components
import ScreenGlitch from "../_components/screenGlitch/ScreenGlitch";
// styles
import { IoMdCloseCircle } from "react-icons/io";
import "./Register.scss";

type PromptMessage = {
  prompt: string;
  doWrite?: boolean;
};

const Register = () => {
  // 🍋 ---------- REFS ---------- 🍋

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPassRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLInputElement>(null);

  // 🍋 ---------- PROMPTER ---------- 🍋

  const [promptMessages, setPromptMessages] = useState<PromptMessage[]>([
    { prompt: "register_new_user", doWrite: true },
  ]);

  const addPrompt = (message: string, doWrite?: boolean | undefined) => {
    const lastMessage = promptMessages[promptMessages.length - 1].prompt;
    if (lastMessage !== message) {
      const newMessage = {
        prompt: message,
        doWrite: doWrite === undefined ? true : false,
      };

      setPromptMessages([...promptMessages, newMessage]);
    }
  };

  // 🍋 ---------- FORM ---------- 🍋

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    confirm_password: "",
  });

  const [submitDisabled, setSubmitDisabled] = useState(true);

  // 🥦 listen & validate

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (formValues.username.length > 2) {
      removeClassError(usernameRef);
      setClassOk(usernameRef);
    } else {
      removeClassOk(usernameRef);
    }
    if (formValues.password.length > 5) {
      removeClassError(passwordRef);
      setClassOk(passwordRef);
    } else {
      removeClassOk(passwordRef);
    }
    if (
      formValues.confirm_password.length > 5 &&
      formValues.password === formValues.confirm_password
    ) {
      removeClassError(confirmPassRef);
      setClassOk(confirmPassRef);
    } else {
      removeClassOk(confirmPassRef);
    }
    if (
      formValues.username.length > 2 &&
      formValues.password.length > 5 &&
      formValues.confirm_password.length > 5 &&
      formValues.password === formValues.confirm_password
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [formValues]);

  // 🥦 submit

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPass = formData.get("confirm_password") as string;

    if (username && password && confirmPass && password === confirmPass) {
      const data = {
        username,
        email,
        password,
      };

      if (!(await isUsernameAvailable(username))) {
        setClassError(usernameRef);
        addPrompt("try_different_username");
        usernameRef.current?.focus();
        return;
      }
      addPrompt("registering_user", false);
      try {
        const response = await fetch("/api/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const user = await response.json();
        if (response.ok) {
          addPrompt("user_registered", false);
          addPrompt("redirecting_to_login", false);
          await delay(2000);
          // login
          signIn("credentials", {
            username: usernameRef.current?.value,
            password: passwordRef.current?.value,
            callbackUrl: "/",
          });
        } else {
          addPrompt("registration_failed", false);
          addPrompt("try_again", false);
        }
      } catch (error) {
        addPrompt("registration_failed", false);
        addPrompt("try_again", false);
      }
    }
  };

  // 🍋 ---------- ON LOAD ---------- 🍋

  useEffect(() => {
    const waitNfocus = async () => {
      await delay(promptMessages[0].prompt.length * 40 + 300);
      if (usernameRef.current) {
        usernameRef.current.focus();
      }
    };
    waitNfocus();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center p-20 h-screen relative">
      <ScreenGlitch />
      <div className="register-machine w-96 sm:w-screen">
        <Link href={"/"}>
          <IoMdCloseCircle
            className="pb-2 ml-auto"
            size={35}
            color="rgb(240, 240, 240)"
            fill="rgb(240, 240, 240)"
          />
        </Link>
        <div className="register-screen pixelate relative">
          {promptMessages.map((message, index, array) => {
            return (
              <PromptText
                key={index}
                active={index === array.length - 1 ? true : false}
                message={message.prompt}
                doWrite={message.doWrite}
              />
            );
          })}
        </div>
        <form action="POST" onSubmit={onSubmit} className="flex flex-col ">
          <input
            ref={usernameRef}
            required
            name="username"
            type="text"
            placeholder="Username"
            minLength={3}
            maxLength={20}
            onFocus={() => {
              if (usernameRef.current?.value.length! < 3) {
                addPrompt("enter_username");
              }
            }}
            onBlur={() => {
              const value = usernameRef.current?.value;
              if (value && value.length > 2) {
                addPrompt("set name: " + value, false);
              }
            }}
            onChange={handleFormChange}
          />
          <input
            ref={emailRef}
            name="email"
            type="email"
            placeholder="Email (optional)"
            maxLength={40}
            onFocus={() => {
              addPrompt("enter_email");
            }}
            onBlur={() => {
              const value = emailRef.current?.value;
              if (value && value.length > 2) {
                addPrompt("set email: " + value, false);
              }
            }}
          />
          <input
            ref={passwordRef}
            required
            name="password"
            type="password"
            placeholder="Password"
            minLength={6}
            maxLength={20}
            onFocus={async () => {
              addPrompt("enter_password");
            }}
            onChange={handleFormChange}
          />
          <input
            ref={confirmPassRef}
            required
            name="confirm_password"
            type="password"
            placeholder="Confirm Password"
            minLength={6}
            maxLength={20}
            onFocus={() => {
              addPrompt("confirm_password");
            }}
            onChange={handleFormChange}
          />
          <input
            disabled={submitDisabled}
            ref={submitRef}
            type="submit"
            value="Register"
            className="mt-4"
          />
        </form>
      </div>
    </div>
  );
};

export default Register;

const PromptText = ({
  message,
  active,
  doWrite,
}: {
  message: string;
  doWrite?: boolean;
  active?: boolean;
}) => {
  const [promptText, setPromptText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const writeLetters = async (message: string) => {
    let msg = "";
    const write = async function () {
      for (let i = 0; i < message.length; i++) {
        msg += message[i];
        await delay(40);
        setPromptText(msg);
      }
    };
    await write();
    await delay(250);
  };
  useEffect(() => {
    if (doWrite === true) {
      writeLetters(message);
    } else {
      setPromptText(message);
    }
    setShowCursor(!showCursor);
  }, []);

  return (
    <p className={active ? "active-msg" : "old-msg"}>
      {active ? <span className="active-symbol">↪</span> : "~/"}
      {promptText}
      {showCursor && <span className="cursor">|</span>}
    </p>
  );
};

function setClassOk(ref: React.RefObject<HTMLInputElement>) {
  ref.current?.classList.add("field-ok");
}

function removeClassOk(ref: React.RefObject<HTMLInputElement>) {
  ref.current?.classList.remove("field-ok");
}

function setClassError(ref: React.RefObject<HTMLInputElement>) {
  ref.current?.classList.add("field-error");
}

function removeClassError(ref: React.RefObject<HTMLInputElement>) {
  ref.current?.classList.remove("field-error");
}
