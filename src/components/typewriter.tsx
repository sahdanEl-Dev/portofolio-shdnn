"use client";

import { useEffect, useState } from "react";

type TypewriterProps = {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
};

export default function Typewriter({
  words,
  typingSpeed = 90,
  deletingSpeed = 50,
  pause = 1400,
}: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];
    let delay = deleting ? deletingSpeed : typingSpeed;

    if (!deleting && text === current) delay = pause;
    else if (deleting && text === "") delay = 300;

    const timeout = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
        return;
      }
      if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
        return;
      }
      setText(
        deleting
          ? current.slice(0, text.length - 1)
          : current.slice(0, text.length + 1)
      );
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typingSpeed, deletingSpeed, pause]);

  return (
    <>
      <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
        {text}
      </span>
      <span className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.1em] animate-pulse bg-emerald-400" />
    </>
  );
}