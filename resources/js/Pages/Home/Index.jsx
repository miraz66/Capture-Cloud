import { Head, router } from "@inertiajs/react";
import ImageContent from "./ImageContent";
import Header from "@/Components/Header";
import NotFound from "./NotFound";
import { createGlobalStyle } from "styled-components";
import undraw_landscape_photographer_blv1 from "@/Assets/undraw_landscape_photographer_blv1.svg";
import clsx from "clsx";
import { ArrowTrendingUpIcon } from "@heroicons/react/16/solid";
import SuccessMessage from "@/Utils/SuccessMessage";

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
  queryParams = queryParams || {};

  console.log(queryParams);

  const searchFieldChange = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("home.index"), queryParams);
  };

  return (
    <>
      <Head title="Home" />

      <Header user={auth.user} queryParams={queryParams} feature={feature}>
        <div className="py-10 flex justify-between max-w-7xl mx-auto">
          <div className="flex">
            {noResults ? (
              <h1 className="pt-20 font-medium text-3xl">
                {queryParams.feature}
              </h1>
            ) : (
              <h1 className="pt-6 font-medium text-xl md:text-3xl lg:text-5xl font-sans">
                {queryParams.feature ? (
                  queryParams.feature
                ) : (
                  <span className="text-gray-700 font-playwrite playwrite-it-moderna-bold">
                    Capture Cloud
                  </span>
                )}
              </h1>
            )}

            <img
              className={clsx(noResults ? "hidden" : "h-80 max-lg:hidden")}
              src={undraw_landscape_photographer_blv1}
              alt=""
            />
          </div>

          <div className={clsx(noResults ? "hidden" : "w-[20rem] p-2")}>
            <div className="flex flex-col justify-between p-4 h-[300px] border rounded-md shadow">
              <div className="flex flex-wrap gap-2">
                {feature.slice(0, 5).map((item, index) => (
                  <button
                    key={index}
                    className="px-4 py-1 rounded-md border hover:border-gray-500 duration-200 ease-in-out"
                    onClick={() => searchFieldChange("feature", item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <ArrowTrendingUpIcon className="w-6 h-6 text-gray-700" />
                <p className="hover:underline cursor-pointer">
                  See trending searches
                </p>
              </div>
            </div>
          </div>
        </div>

        {success && <SuccessMessage message={success} />}

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
