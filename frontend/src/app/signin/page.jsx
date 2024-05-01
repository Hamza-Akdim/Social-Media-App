"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../context/authContext";
import Image from "next/image";

const page = () => {
  const { login } = useAuthContext();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:4001/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        login(data.user._id);
        router.push("/accueil");
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred while logging in.");
    }
  };

  return (
    <div className="">
      <div className="flex justify-center items-center h-7 gap-3 bg-white w-xx ml-7 mt-4 rounded-lllg shadow-lg">
        <div>
          <Image
            src="/logo.png"
            alt="Logo"
            className="dark:invert "
            width={200}
            height={10}
            priority
          />
        </div>
        <div className="flex flex-col gap-1 bg-white">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter your mail"
            className=" border-2 border-brd rounded-lg p-1.5"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter your password"
            className="border-2 border-brd rounded-lg p-1.5"
          />
          <button
            onClick={handleLogin}
            className="border-2 rounded-lg py-1.5 hover:border-black"
          >
            SUBMIT
          </button>
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default page;
