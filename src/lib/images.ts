import axios from "axios";

export interface IImageDescriptions {
  [key: string]: string;
}

export interface IImages {
  imageDescriptions: IImageDescriptions;
  images: string[];
}

export const getAll = async (url: string) => {
  try {
    const response = await axios.get(url);

    return (await response.data) as IImages;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const filterWithDescription = (
  imageNames: string[],
  imageDescriptions: IImageDescriptions
) => {
  return imageNames.filter(
    (imageName) => imageDescriptions[imageName] === undefined
  );
};

export default {
  getAll,
  filterWithDescription,
};
