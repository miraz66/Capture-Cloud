import React from "react";
import { ParallaxScroll } from "./ParallaxScroll";

const ImageContent = ({ projects, queryParams, success, feature }) => {
  return (
    <div>
      <div className="w-8/12 m-auto pt-10">
        <div className="flex gap-4 overflow-hidden">
          <ParallaxScroll
            query="nature"
            projects={projects}
            feature={feature}
            success={success}
            queryParams={queryParams}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageContent;
