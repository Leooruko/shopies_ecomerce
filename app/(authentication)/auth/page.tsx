import AuthForm from "@/components/authForm";
import Image from "next/image";
import logo from "../../icon.webp";
import { verifyAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
export default async function AuthPage({ searchParams }) {
  const result = await verifyAuthSession();
  if (result) {
    redirect("/");
  }
  const mode = searchParams.mode || "login";
  return (
    <div className="py-2 px-3 w-full md:w-1/3 border-2 h-fit flex flex-col gap-3 font-mono">
      <div className="self-start place-self-start w-full ">
        <div className="flex justify-center w-full ">
          <Image
            src={logo}
            width={130}
            height={130}
            alt="logo"
            priority
            className="rounded-full"
          />
        </div>
        <h1 className="w-full flex justify-center text-lg font-bold p-5">
          Authentication Form
        </h1>
      </div>
      <AuthForm mode={mode} />
    </div>
  );
}
