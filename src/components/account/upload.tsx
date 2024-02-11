import { PhotoCamera } from "@mui/icons-material";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { storeage } from "../../../firebase/firebase";

export default function UploadButton({ uid }: { uid: string }) {
  const [file, setFile] = useState<undefined | File>(undefined);
  const [uploading, setUploading] = useState<boolean>(false);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (imageFile) {
      setFile(imageFile);
    }
  };

  if (file) {
    const storeageRef = ref(storeage, `users/${uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(storeageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          console.log(downloadURL)
        );
      }
    );
  }

  return (
    <>
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
    </>
  );
}
