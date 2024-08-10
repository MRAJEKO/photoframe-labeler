import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IProps {
  current: string | undefined;
  baseUrl: string;
  imageNumber: number;
  totalImages: number;
}

const ImageDisplay = ({
  current,
  baseUrl,
  imageNumber,
  totalImages,
}: IProps) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(current ? true : false);
  }, [current]);

  return (
    <>
      <div className="flex flex-col gap-2 items-center justify-center h-full overflow-hidden relative">
        {current ? (
          <Link href={baseUrl + current} target="_blank">
            <Image
              onLoad={() => setLoading(false)}
              className="rounded-xl"
              src={baseUrl + current}
              width={1920}
              height={1080}
              alt=""
            />
          </Link>
        ) : (
          <div className="w-full bg-yellow-500/5 aspect-video rounded-xl grid place-items-center">
            <p className="font-bold text-xl text-yellow-500/40">
              No more images to label
            </p>
          </div>
        )}
        <p className="text-sm font-semibold text-gray-300">
          {totalImages ? imageNumber : "0"} / {totalImages}
        </p>
        {loading && (
          <div className="font-semibold text-xl absolute h-[full] w-full backdrop-blur-xl bg-black/40 text-white grid place-items-center">
            Loading next image...
          </div>
        )}
      </div>
    </>
  );
};
export default ImageDisplay;
