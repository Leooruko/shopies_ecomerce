import { BiEdit } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FcEditImage } from "react-icons/fc";
import { ImProfile } from "react-icons/im";

export default function Profile() {
  return (
    <div className="flex flex-col p-10 w-full items-center gap-10 border-2 font-mono ">
      <h1 className="font-bold w-full text-2xl border-2 p-2">Profile</h1>
      <div className="image relative w-fit -z-10">
        <CgProfile size={150} className="rounded-full border-2 p-5 " />
        <FcEditImage
          className="absolute bg-black opacity-80 size-full top-0 rounded-full"
          size={30}
        />
      </div>
      <ul className="self-center bg-white flex flex-col  text-start text-lg border-2 p-5">
        <li>
          <b>Name:</b>Leon Oruko
        </li>
        <li>
          <b>Email:</b>example@gmail.com
        </li>
        <li>
          <b>Username:</b>Leon
        </li>
        <li>
          <b>password:</b>********
        </li>
        <BiEdit className="self-end" size={30} />
      </ul>
    </div>
  );
}
