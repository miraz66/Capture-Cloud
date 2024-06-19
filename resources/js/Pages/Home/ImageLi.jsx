import { useState } from "react";
import ImagesHover from "./ImagesHover";

const HoverFild = new ImagesHover();

const ImageLi = (props) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div>
      <div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className="relative bg-black hover:opacity-90"
      >
        <img src={props.images} alt="Images" />
        {isHovering && (
          <div className="absolute text-white top-4 right-4">
            {HoverFild.FavouritFilfd()}
          </div>
        )}

        {isHovering && (
          <div className="absolute text-white bottom-3 w-full px-2">
            {HoverFild.UserFild(props)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageLi;
