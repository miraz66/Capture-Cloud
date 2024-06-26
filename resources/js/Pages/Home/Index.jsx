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
    </>
  );
}
