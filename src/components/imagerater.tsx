import { collection, limit, orderBy, query, where } from "firebase/firestore";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/firebase";
import type { Types } from "@/types/types";
import { useState } from "react";
import ImageSelector from "./imageswiper";

const shuffleArray = (array: any[]) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

export default function ImageSelectorBody({ uid }: { uid: string }) {
  const randomOrder = Math.random();
  const imageRef = collection(db, "images");
  const q = query(imageRef, where("owner", "!=", uid), limit(500));
  const [snapshot, loading, error] = useCollectionOnce(q);
  if (snapshot) {
    const images: Types.DocedImageDoc[] = [];
    snapshot.docs.map((doc) => {
      const image = doc.data() as Types.ImageDoc;
      images.push({ id: doc.id, image });
    });
    shuffleArray(images);
    return <ImageSelector uid={uid} images={images} />;
  }
  return <></>;
}
