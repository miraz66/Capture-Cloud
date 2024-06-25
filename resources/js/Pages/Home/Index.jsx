import { Head } from "@inertiajs/react";
import ImageContent from "./ImageContent";
import Header from "@/Components/Header";
import ImageModal from "./ImageModel";
import { useState } from "react";

export default function Index({
  auth,
  projects,
  queryParams,
  success,
  feature,
}) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <Head title="Home" />

      <Header user={auth.user}>
        <ImageContent
          projects={projects}
          queryParams={queryParams}
          success={success}
          feature={feature}
        />
      </Header>

      <button
        onClick={handleOpenModal}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Open Modal
      </button>

      <ImageModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-xl font-bold">This is a modal</h2>
        <p>Click outside the modal or on the close button to close it.</p>
      </ImageModal>
    </>
  );
}
