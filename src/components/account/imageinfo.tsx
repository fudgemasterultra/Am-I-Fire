import { query, collection, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../../firebase/firebase";
import { Types } from "@/types/types";
import { Card, CardContent, CardMedia } from "@mui/material";
import { ThumbDownSharp, ThumbUpSharp } from "@mui/icons-material";

export default function AccountImageView({ uid }: { uid: string }) {
  const imageRef = collection(db, "images");
  const q = query(imageRef, where("owner", "==", uid));
  const [value, loading, error] = useCollection(q);

  return (
    <>
      <div className="flex flex-wrap gap-3 justify-center">
        {value
          ? value.docs.map((doc) => {
              const imageInfo = doc.data() as Types.ImageDoc;
              const likes = imageInfo.likes.length;
              const dislike = imageInfo.dislikes.length;
              const total = likes + dislike;
              return (
                <div key={doc.id}>
                  <Card sx={{ width: 300 }}>
                    <CardMedia
                      sx={{ height: 533, objectFit: "cover" }}
                      image={imageInfo.url}
                      title="Image"
                    />
                    <CardContent>
                      <div className="flex content-center justify-between">
                        <div className="flex gap-2">
                          <ThumbUpSharp color="success" />
                          <p>{Math.round((likes / total) * 100) || 0}%</p>
                        </div>
                        <div className="flex gap-2">
                          <ThumbDownSharp color="error" />
                          <p>{Math.round(dislike / total) * 100 || 0}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}
