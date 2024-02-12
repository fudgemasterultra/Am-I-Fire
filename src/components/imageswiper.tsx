import { Types } from "@/types/types";
import { Card, CardMedia } from "@mui/material";
import { useState, useEffect } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function ImageSelector({
  uid,
  images,
}: {
  uid: string;
  images: Types.DocedImageDoc[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(images[currentIndex]);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getHeight = () => {
    if (windowDimensions.width > 400) {
      return 708;
    }
    return Math.round(windowDimensions.width * 1.777);
  };
  const getWidth = () => {
    if (windowDimensions.width < 400) {
      return windowDimensions.width;
    }
    return 400;
  };
  const [maxed, setMaxed] = useState(false);
  const nextImage = () => {
    if (currentIndex < images.length) {
      setCurrentIndex(currentIndex + 1);
      setCurrentImage(images[currentIndex]);
      return;
    }
    setMaxed(true);
  };
  return (
    <div className="flex justify-center">
      <Card sx={{ width: 400 }}>
        <CardMedia
          component="img"
          alt="User Image"
          image={currentImage.image.url}
          sx={{ height: getHeight(), objectFit: "cover" }}
        />
      </Card>
    </div>
  );
}
