import { RiDeleteBinLine } from "react-icons/ri";
import { UploadImage } from "../UploadImage";
import { useEffect, useState } from "react";
import {
  deleteImage,
  getCarouselImages,
  uploadImage,
} from "../../api/carousel";

type HomeImage = { _id: string; image: string };

function HomeCarousel() {
  const [images, setImages] = useState<HomeImage[]>([]);
  const [url, setUrl] = useState<string>("");

  async function handleDelete(id: string) {
    const response = await deleteImage(id);

    const fetchImages = images.filter((item) => item._id !== id);
    setImages(fetchImages);
    console.log(response?.data.message);
  }
  useEffect(() => {
    getCarouselImages().then((response) => {
      setImages(
        response?.data.data.map((item: any) => {
          return { _id: item._id, image: item.image };
        })
      );
    });
  }, []);
  useEffect(() => {
    if (url !== "") {
      uploadImage(url).then((response) => {
        setImages([
          ...images,
          { _id: response?.data.data._id, image: response?.data.data.image },
        ]);
      });
    }
  }, [url]);

  return (
    <div className="flex flex-col justify-center my-2">
      <h1 className="text-3xl">Carousel Images</h1>
      <div className="mt-4 flex gap-2 ">
        <UploadImage folder={"home"} id={"content"} setKey={setUrl} />
        <div className="flex flex-row gap-2">
          {images.length > 0 &&
            images.map((item, index) => (
              <div key={index} className="relative border border-white">
                <img
                  key={index}
                  src={item.image}
                  alt="image"
                  className="w-40 h-40 z-0"
                />
                <button
                  className="absolute right-0 top-0 z-10 p-1 rounded-full bg-slate-500"
                  onClick={() => handleDelete(item._id)}
                >
                  <RiDeleteBinLine />
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default HomeCarousel;
