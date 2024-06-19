import { useState } from "react";
import ImagesHover from "./ImagesHover";
import ImageModal from "@/Utils/ImageModel";

const HoverFild = new ImagesHover();

const ImageLi = ({ data }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const projectData = {
    name: data.name,
    id: data.id,
    image_path: data.image_path,
    created_by: data.created_by,
  };

  console.log(projectData);

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
        onClick={() => setShowModal(true)}
        className="relative bg-black hover:opacity-90"
      >
        <img src={data.image_path} alt="Images" />
        {isHovering && (
          <div className="absolute text-white top-4 right-4">
            {HoverFild.FavouritFilfd()}
          </div>
        )}

        {isHovering && (
          <div className="absolute text-white bottom-3 w-full px-2">
            {HoverFild.UserFild(data.created_by)}
          </div>
        )}
      </div>
      <div>
        <ImageModal
          setShowModal={setShowModal}
          showModal={showModal}
          projects={projectData}
        />
      </div>
    </div>
  );
};

export default ImageLi;
