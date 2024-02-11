import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/firebase";
import { useRouter } from "next/router";
import UploadButton from "@/components/account/upload";
import AccountImageView from "@/components/account/imageinfo";

export default function Index() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  if (loading) {
    return <></>;
  }
  if (user && user.isAnonymous) {
    router.push("/");
  }
  if (user) {
    return (
      <>
        <AccountImageView uid={user.uid} />
        <UploadButton uid={user.uid} />
      </>
    );
  }

  router.push("/");
  return <></>;
}
