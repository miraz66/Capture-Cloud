import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchContent = () => {
  return (
    <div className="">
      <div
        className="w-full h-3/5 pt-60 pb-80 bg-center bg-repeat bg-cover bg-orange-500  relative 
    bg-[url(https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)]"
      >
        <p className="absolute text-white bottom-5">
          Photo by:{" "}
          <a className="hover:border-b" href="">
            MD.MIRAJUL ISLAM
          </a>
        </p>
      </div>

      <div className="absolute top-64 left-1/4 text-white w-1/2 ">
        <h1 className="font-bold text-4xl">Photo</h1>
        <p className="py-4">
          The internet’s source for visuals. <br />
          Powered by creators everywhere.
        </p>
        <div className="flex bg-white rounded-sm">
          <MagnifyingGlassIcon className="w-8 text-gray-600 pl-3 font-bold cursor-pointer" />
          <input
            type="text"
            className="w-full p-3 px-4 font-mono text-black outline-none rounded-r-sm "
          />
        </div>
      </div>
    </div>
  );
};

export default SearchContent;
