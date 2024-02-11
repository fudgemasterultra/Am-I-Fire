import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { signInAnonymously } from "firebase/auth";

export default function Index() {
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <></>;
  }
  if (!user) {
    signInAnonymously(auth);
  }
  if (user) {
    user.isAnonymous;
  }
  return <></>;
}
