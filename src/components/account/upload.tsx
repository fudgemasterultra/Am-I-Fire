import { PhotoCamera } from "@mui/icons-material";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { db, storeage } from "../../../firebase/firebase";
import type { Types } from "@/types/types";
import { addDoc, collection } from "firebase/firestore";
const imageMimeTypeRegex = /^image\/(jpeg|png|gif|bmp|webp|svg\+xml|tiff)$/;

//This can be found in the firebase rules
const uploadLimit = 10 * 1024 * 1024;

export default function UploadButton({ uid }: { uid: string }) {
  const [file, setFile] = useState<undefined | File>(undefined);
  const [uploading, setUploading] = useState<boolean>(false);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (imageFile) {
      setFile(imageFile);
    }
  };
  const createImageDoc = async (imageUrl: string) => {
    const imageDocument: Types.ImageDoc = {
      url: imageUrl,
      owner: uid,
      likes: [],
      dislikes: [],
    };
    try {
      await addDoc(collection(db, "images"), imageDocument);
    } catch (e) {
      alert(e);
    }
  };

  if (file) {
    if (!uploading) {
      setUploading(true);
      const storeageRef = ref(storeage, `users/${uid}/${file.name}`);
      const uploadTask = uploadBytesResumable(storeageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (error) => {
          setFile(undefined);
          setUploading(false);
          if (!imageMimeTypeRegex.test(file.type)) {
            alert("Must upload an image file");
            return;
          }
          if (uploadLimit < file.size) {
            alert("Image must be under 10mb");
            return;
          }
          alert(error.message);
        },
        async () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await createImageDoc(downloadURL);
            setFile(undefined);
            setUploading(false);
          });
        }
      );
    }
  }

  return (
    <>
      <div className="flex justify-center py-3">
        <Button
          startIcon={<PhotoCamera />}
          variant="contained"
          color="primary"
          component="label"
          disabled={uploading}
        >
          Upload Image
          <input type="file" hidden={true} onChange={handleFileChange} />
        </Button>
      </div>
    </>
  );
}
