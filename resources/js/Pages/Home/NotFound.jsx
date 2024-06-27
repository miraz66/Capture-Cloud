import NotFoundPhotos from "@/Assets/NotFoundPhotos.png";
import logo from "@/Assets/logo.png";

export default function NotFound({ queryParams }) {
  return (
    <div className="h-screen">
      <h1 className="pl-40 pt-20 font-medium text-3xl">
        {queryParams.feature}
      </h1>
      <div className="pt-40 flex flex-col justify-center items-center">
        <img
          className="w-1/6 mx-auto"
          src={NotFoundPhotos}
          alt="Not Found Photos"
        />
        <div className="w-1/5 mx-auto pt-40">
          <img className="mx-auto w-14 pb-2" src={logo} alt="logo" />
          <p className="text-center text-lg font-thin text-gray-500 tracking-tight">
            Make something awesome
          </p>
        </div>
      </div>
    </div>
  );
}
