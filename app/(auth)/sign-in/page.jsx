// "use client";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";
// import GlobalApi from "@/app/_utils/GlobalApi";
// import { toast } from "sonner";
// import { Loader } from "lucide-react";
// const SignIn = () => {
//   const [email, setEmail] = useState();
//   const [password, setPassword] = useState();
//   const router = useRouter();
//   const [loader, setLoader] = useState(false);
//   useEffect(() => {
//     const jwt = sessionStorage.getItem("jwt");
//     if (jwt) {
//       router.push("/");
//     }
//   }, []);

//   const onSignIn = () => {
//     setLoader(true);

//     GlobalApi.SignIn(email, password).then(
//       (resp) => {
//         // console.log(resp.data.user);
//         // console.log(resp.data.jwt);
//         sessionStorage.setItem("user", JSON.stringify(resp.data.user));
//         sessionStorage.setItem("jwt", resp.data.jwt);
//         toast("Logged In Successfully.");
//         router.push("/");
//         setLoader(false);
//       },
//       (e) => {
//         console.log(e);
//         toast(e?.response?.data?.error.message);
//         setLoader(false);
//       }
//     );
//   };
//   return (
//     <div className="flex items-baseline justify-center my-20">
//       <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200">
//         <Image src={"/logo.png"} width={200} height={200} alt="logo" />
//         <h2 className="font-bold text-3xl mt-3">Sign in to your account.</h2>
//         <h2 className="text-gray-500">
//           Enter Your Email and Password to Sign In
//         </h2>
//         <div className="w-full flex flex-col gap-5 mt-7">
//           <Input
//             value={email}
//             placeholder="name@example.com"
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <Input
//             type="password"
//             value={password}
//             placeholder="Password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <Button disabled={!(email || password)} onClick={() => onSignIn()}>
//             {loader ? <Loader className="animate-spin" /> : "Sign In"}
//           </Button>
//           <p>
//             Don't have an Account?
//             <Link href={"/create-account"} className="text-blue-500">
//               Click here to Create Account
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;

"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensure sessionStorage is only accessed on the client side
      const jwt = sessionStorage.getItem("jwt");
      if (jwt) {
        router.push("/");
      }
    }
  }, [router]);

  const onSignIn = () => {
    setLoader(true);

    GlobalApi.SignIn(email, password).then(
      (resp) => {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("user", JSON.stringify(resp.data.user));
          sessionStorage.setItem("jwt", resp.data.jwt);
        }
        toast("Logged In Successfully.");
        router.push("/");
        setLoader(false);
      },
      (e) => {
        console.log(e);
        toast(e?.response?.data?.error.message);
        setLoader(false);
      }
    );
  };

  return (
    <div className="flex items-baseline justify-center my-20">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200">
        <Image src={"/logo.png"} width={200} height={200} alt="logo" />
        <h2 className="font-bold text-3xl mt-3">Sign in to your account.</h2>
        <h2 className="text-gray-500">
          Enter Your Email and Password to Sign In
        </h2>
        <div className="w-full flex flex-col gap-5 mt-7">
          <Input
            value={email}
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button disabled={!email || !password} onClick={onSignIn}>
            {loader ? <Loader className="animate-spin" /> : "Sign In"}
          </Button>
          <p>
            Don't have an Account?
            <Link href={"/create-account"} className="text-blue-500">
              Click here to Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
