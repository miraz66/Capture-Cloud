import { Head } from "@inertiajs/react";
import ImageContent from "./ImageContent";
import Header from "@/Components/Header";
import NotFound from "./NotFound";
import { createGlobalStyle } from "styled-components";
import undraw_landscape_photographer_blv1 from "@/Assets/undraw_landscape_photographer_blv1.svg";

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

      <Header user={auth.user} queryParams={queryParams} feature={feature}>
        <div className="flex">
          {noResults ? (
            <h1 className="pl-40 pt-20 font-medium text-3xl">
              {queryParams.feature}
            </h1>
          ) : (
            <h1 className="pl-10 md:pl-20 lg:pl-40 pt-10 pb-20 font-medium text-xl md:text-3xl lg:text-5xl font-sans">
              {queryParams === null ? (
                <spen className="text-gray-700 font-playwrite playwrite-it-moderna-bold">
                  Capture Cloud
                </spen>
              ) : (
                queryParams.feature
              )}
            </h1>
          )}

          <img
            className="h-80 max-lg:hidden"
            src={undraw_landscape_photographer_blv1}
            alt=""
          />
        </div>

        {success && <p className="pl-40 text-sm text-green-700">{success}</p>}

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
