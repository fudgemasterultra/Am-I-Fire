import { Router, useRouter } from "next/router";
import { auth, signInWithGooglePopup } from "../../firebase/firebase";
import {
  useCreateUserWithEmailAndPassword,
  useAuthState,
} from "react-firebase-hooks/auth";

export default function SignUp() {
  const [user, loading, error] = useAuthState(auth);
  if (user && !user.isAnonymous) {
    const router = useRouter();
    router.push("/");
  }
  return (
    <>
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
      />
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      />
      <section className="bg-blueGray-50 h-screen">
        <div className="w-full lg:w-4/12 px-4 mx-auto pt-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-blueGray-500 text-sm font-bold">
                  Sign up with
                </h6>
              </div>
              <div className="btn-wrapper text-center">
                <button
                  className="bg-white w-full text justify-center active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => signInWithGooglePopup()}
                >
                  <img
                    alt="..."
                    className="w-5 mr-1"
                    src="https://demos.creative-tim.com/notus-js/assets/img/google.svg"
                  />
                  Google{" "}
                </button>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
          </div>
        </div>
        <footer className="relative pt-8 pb-6 mt-2">
          <div className="container mx-auto px-2">
            <div className="flex flex-wrap items-center md:justify-between justify-center"></div>
          </div>
        </footer>
      </section>
    </>
  );
}
