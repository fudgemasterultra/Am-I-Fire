import { AccountCircle } from "@mui/icons-material";
import { useRouter } from "next/router";
export default function LoginHeader({
  anomoyus,
  email,
}: {
  anomoyus: boolean;
  email: string | null;
}) {
  const router = useRouter();
  const handleAccountClick = () => {
    if (anomoyus) {
      router.push("/register");
      return;
    }
    router.push("/account");
  };
  return (
    <>
      <button className="w-full border-b-2" onClick={handleAccountClick}>
        <div className="flex justify-center py-1">
          <AccountCircle color="warning" />
          <p className=" text-gray-800">
            {anomoyus ? "Create an account!" : email}
          </p>
        </div>
      </button>
    </>
  );
}
