"use client";

import { useEffect, useState } from "react";
import Key from "./Key";

interface IProps {
  currentDescription: string;
  name: string;
  next: boolean;
  goNext: () => void;
  previous: boolean;
  goPrevious: () => void;
  handleSubmit: (name: string, description: string) => void;
}

const DescriptionArea = ({
  currentDescription,
  name,
  next,
  goNext,
  previous,
  goPrevious,
  handleSubmit,
}: IProps) => {
  const [description, setDescription] = useState<string>(currentDescription);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        handleSubmit(name, description);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "ArrowLeft" && previous) {
        goPrevious();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "ArrowRight" && next) {
        goNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [description, next, previous, name, handleSubmit, goNext, goPrevious]);

  useEffect(() => {
    setDescription(currentDescription || "");
  }, [name, currentDescription]);

  return (
    <div className="h-full flex justify-center gap-2 w-full flex-col">
      <h1 className={`font-bold text-xl ${name ? "" : "opacity-40"}`}>
        {name || "No title to display"}
      </h1>
      <textarea
        disabled={!name}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="bg-white/5 resize-none w-full min-h-fit h-40 p-4 rounded-xl outline-none border-2 border-transparent focus:border-yellow-500 transition-all text-wrap disabled:opacity-40"
        placeholder="Enter description..."
      />
      <div className="flex gap-2">
        <button
          onClick={goPrevious}
          disabled={!previous}
          className="w-fit border border-yellow-500 text-white rounded-xl p-2 px-5 mt-2 relative flex gap-5 items-center disabled:opacity-40 transition-opacity"
        >
          Previous
          <span className="flex gap-1 items-center">
            <Key name="Ctrl" secondary />
            <Key name="←" secondary />
          </span>
        </button>
        <button
          onClick={() => handleSubmit(name, description)}
          disabled={description === currentDescription || !name}
          className="w-fit bg-yellow-500 text-black rounded-xl p-2 px-5 mt-2 relative flex gap-5 items-center disabled:opacity-40 transition-opacity"
        >
          Submit
          <span className="flex gap-1 items-center">
            <Key name="Ctrl" />
            <Key name="Enter" />
          </span>
        </button>
        <button
          onClick={goNext}
          disabled={!next}
          className="w-fit border border-yellow-500 text-white rounded-xl p-2 px-5 mt-2 relative flex gap-5 items-center disabled:opacity-40 transition-opacity"
        >
          Next
          <span className="flex gap-1 items-center">
            <Key name="Ctrl" secondary />
            <Key name="→" secondary />
          </span>
        </button>
      </div>
    </div>
  );
};
export default DescriptionArea;
