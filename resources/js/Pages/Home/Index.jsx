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
  console.log(feature);
  return (
    <>
      <Head title="Home" />

      <Header user={auth.user} queryParams={queryParams} feature={feature}>
        {noResults ? (
          <h1 className="pl-40 pt-20 font-medium text-3xl">
            {queryParams.feature}
          </h1>
        ) : (
          <h1 className="pl-40 pt-10 pb-20 font-medium text-3xl font-sans">
            {queryParams === null ? (
              <spen className="text-gray-700 font-playwrite playwrite-it-moderna-bold">
                Capture Cloud
              </spen>
            ) : (
              queryParams.feature
            )}
          </h1>
        )}
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
