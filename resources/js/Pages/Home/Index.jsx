import { Head } from "@inertiajs/react";
import ImageContent from "./ImageContent";
import Header from "@/Components/Header";
import NotFound from "./NotFound";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

export default function Index({
  auth,
  projects,
  queryParams,
  success,
  feature,
  noResults,
}) {
  return (
    <>
      <Head title="Home" />

      <Header user={auth.user} queryParams={queryParams}>
        {!noResults ? (
          <ImageContent
            projects={projects}
            queryParams={queryParams}
            success={success}
            feature={feature}
          />
        ) : (
          <NotFound queryParams={queryParams} />
        )}
      </Header>

      {noResults && <GlobalStyle />}
    </>
  );
}
