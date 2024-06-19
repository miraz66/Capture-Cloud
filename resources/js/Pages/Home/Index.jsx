import { Link, Head } from "@inertiajs/react";
import Nav from "./Nav";
import SearchContent from "./SearchContent";
import ImageContent from "./ImageContent";

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
      <div>
        <Nav auth={auth} />
        <SearchContent />
        <ImageContent
          auth={auth}
          projects={projects}
          queryParams={queryParams}
          success={success}
          feature={feature}
        />
      </div>
    </>
  );
}
