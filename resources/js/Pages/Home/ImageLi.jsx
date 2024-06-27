import { useState } from "react";
import ImagesHover from "./ImagesHover";
import ImageModal from "./ImageModal";
import ShowImages from "@/Components/ShowImages";

const HoverFild = new ImagesHover();

const ImageLi = ({ data }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => setModalOpen(false);

  const projectData = {
    name: data.name,
    id: data.id,
    feature: data.feature,
    address: data.address,
    image_path: data.image_path,
    created_by: data.created_by,
  };

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <>
      <div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className="relative bg-black hover:opacity-90"
      >
        <img
          className="cursor-zoom-in"
          onClick={() => setModalOpen(true)}
          src={data.image_path}
          alt="Images"
        />
        {isHovering && (
          <div className="absolute text-white top-4 right-4">
            {HoverFild.FavouritFilfd(data)}
          </div>
        )}

        {isHovering && (
          <div className="absolute text-white bottom-3 w-full px-2">
            {HoverFild.UserFild(data)}
          </div>
        )}
      </div>

      {/* Modal */}
      <ImageModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ShowImages projects={projectData} />
      </ImageModal>
    </>
  );
};

export default ImageLi;
