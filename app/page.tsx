"use client";

import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";

export default function Home() {
  const [length, setLength] = useState(20);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()_+";

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [numberAllowed, characterAllowed, length]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, characterAllowed, generatePassword]);

  const copyPasswordToClipboad = () => {
    window.navigator.clipboard.writeText(password);
  };
  return (
    <div className="">
      <h1>Password Generator</h1>
      <div className="">
        <input
          type="text"
          value={password}
          className="outline-none bg-gray-100 rounded-s-md p-3"
          readOnly
        />
        <button
          onClick={copyPasswordToClipboad}
          className="bg-blue-500 rounded-e-md p-3 text-white"
        >
          Copy
        </button>
      </div>
      <div className="flex gap-3">
        <div>
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="number">Numbers</label>
        </div>
        <div>
          <input
            type="checkbox"
            defaultChecked={characterAllowed}
            onChange={() => {
              setCharacterAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
  );
}
