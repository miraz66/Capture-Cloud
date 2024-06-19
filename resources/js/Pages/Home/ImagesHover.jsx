import {
  HeartIcon,
  PlusIcon,
  ArrowDownIcon,
  UserCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

class ImagesHover {
  FavouritFilfd() {
    return (
      <div>
        <div className="flex justify-center gap-2">
          <HeartIcon className="text-gray-700 w-10 bg-white py-2 px-3 rounded-md cursor-pointer" />
          <PlusIcon className="text-gray-700 w-10 bg-white py-2 px-3 rounded-md cursor-pointer" />
        </div>
      </div>
    );
  }

  UserFild(props) {
    return (
      <div>
        <div className="flex justify-between w-full items-center">
          <div className=" flex justify-center items-center gap-1">
            <div className="">
              <UserCircleIcon className="w-8" />
            </div>
            <div className="">
              <h1 className="text-xs">{props.name}</h1>
              <div className=" flex gap-1 justify-center">
                <p className="text-xs">Available for hire</p>
                <CheckCircleIcon className="w-3 text-gray-300" />
              </div>
            </div>
          </div>
          <div className="">
            <ArrowDownIcon className="w-10 py-2 px-3 rounded bg-gray-200 text-gray-800 cursor-pointer" />
          </div>
        </div>
      </div>
    );
  }
}

export default ImagesHover;
