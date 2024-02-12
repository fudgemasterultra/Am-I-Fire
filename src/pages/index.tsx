import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { signInAnonymously } from "firebase/auth";
import LoginHeader from "@/components/loginheader";
import ImageSelectorBody from "@/components/imagerater";

export default function Index() {
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <></>;
  }
  if (!user) {
    signInAnonymously(auth);
  }
  if (user) {
    return (
      <>
        <LoginHeader anomoyus={user.isAnonymous} email={user.email} />
        <ImageSelectorBody uid={user.uid} />
      </>
    );
  }
  return <></>;
}
