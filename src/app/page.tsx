"use client";

import Container from "@/components/Container";
import images, { IImages } from "@/lib/images";
import { useEffect, useState } from "react";
import { MagnifyingGlass } from "react-loader-spinner";

const protocol = "http";
const host = "192.168.0.111";
const port = "3000";
const path = "/images";

const baseUrl = `${protocol}://${host}:${port}${path}/`;

export default function Home() {
  const [imageNames, setImageNames] = useState<null | IImages>(null);

  useEffect(() => {
    images.getAll(baseUrl).then((images) => setImageNames(images));
  }, []);

  if (!imageNames)
    return (
      <div className="h-screen w-screen grid place-items-center">
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="magnifying-glass-loading"
          wrapperStyle={{}}
          wrapperClass="magnifying-glass-wrapper"
          glassColor="#c0efff"
          color="#eab308"
        />
        <p className="fixed bottom-5 text-white/30 text-xl font-semibold">
          Loading...
        </p>
      </div>
    );

  return (
    <>
      <Container baseUrl={baseUrl} images={imageNames} />
    </>
  );
}
