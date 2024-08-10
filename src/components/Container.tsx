"use client";

import { filterWithDescription, IImages } from "@/lib/images";
import ImageDisplay from "./ImageDisplay";
import DescriptionArea from "./DescriptionArea";
import { useEffect, useState } from "react";

interface IProps {
  images: IImages;
  baseUrl: string;
}

const Container = ({ images: rawImages, baseUrl }: IProps) => {
  const [offset, setOffset] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);
  const [onlyWithoutDescription, setOnlyWithoutDescription] =
    useState<boolean>(true);

  useEffect(() => {
    const images = onlyWithoutDescription
      ? filterWithDescription(rawImages.images, rawImages.imageDescriptions)
      : rawImages.images;

    setImages(images);
  }, [rawImages, onlyWithoutDescription]);

  const next = images[offset + 1];
  const previous = images[offset - 1];

  const handleSubmit = async (name: string, description: string) => {
    const modifiedImageDescriptions = rawImages.imageDescriptions;

    if (!description) delete modifiedImageDescriptions[name];
    else modifiedImageDescriptions[name] = description;

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageDescriptions: modifiedImageDescriptions }),
    });

    if (!response.ok) {
      alert("Failed to save description");
    } else {
      const newImages = onlyWithoutDescription
        ? filterWithDescription(images, modifiedImageDescriptions)
        : images;

      setImages(newImages);

      if (!onlyWithoutDescription) {
        setOffset(offset + 1);
      }

      if (!images[offset]) {
        setOffset(0);
      }
    }
  };

  useEffect(() => {
    setOffset(0);
  }, [onlyWithoutDescription]);

  return (
    <div className="grid grid-cols-[4fr,3fr] h-screen p-6 gap-6">
      {images.slice(offset).map((image, index) => {
        if (index > 9) return null;
        return (
          <img
            className="h-0 w-0 absolute"
            key={image}
            src={baseUrl + image}
            width={1920}
            height={1080}
            alt=""
          />
        );
      })}
      <div className="fixed top-0 w-full py-5 items-center flex gap-2">
        <input
          onChange={() => setOnlyWithoutDescription(!onlyWithoutDescription)}
          checked={onlyWithoutDescription}
          className="me-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-black/25 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-white after:shadow-switch-2 after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ms-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-switch-1 checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-switch-3 focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ms-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-switch-3 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-white/25 dark:after:bg-surface-dark dark:checked:bg-primary dark:checked:after:bg-primary"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
        />
        <label className="hover:cursor-pointer text-sm text-gray-400 font-semibold">
          Only show images without descriptions
        </label>
      </div>
      <ImageDisplay
        imageNumber={offset + 1}
        totalImages={images.length}
        baseUrl={baseUrl}
        current={images[offset]}
      />
      <DescriptionArea
        goNext={() => setOffset(offset + 1)}
        goPrevious={() => setOffset(offset - 1)}
        handleSubmit={handleSubmit}
        next={!!next}
        previous={!!previous}
        currentDescription={rawImages.imageDescriptions[images[offset]] || ""}
        name={images[offset]}
      />
    </div>
  );
};
export default Container;
