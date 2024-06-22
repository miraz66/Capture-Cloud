import React, { useState, useEffect, useRef, useCallback } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { cn } from "@/Utils/cn"; // Adjust the import path as necessary
import { fetchUnsplashImages } from "@/Utils/fetchUnsplashImages"; // Adjust the import path as necessary
import ImageLi from "./ImageLi";

export const ParallaxScroll = ({ query, className, projects }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const gridRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const fetchImages = useCallback(async () => {
    setIsLoading(true);
    const fetchedImages = await fetchUnsplashImages(query, page);
    setImages((prevImages) => [...prevImages, ...fetchedImages]);
    setIsLoading(false);
  }, [query, page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleScroll = useCallback(() => {
    if (gridRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = gridRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 50 && !isLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    const grid = gridRef.current;
    if (grid) {
      grid.addEventListener("scroll", handleScroll);
      return () => grid.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  const third = Math.ceil(projects.data.length / 3);

  const firstPart = projects.data.slice(0, third);
  const secondPart = projects.data.slice(third, 2 * third);
  const thirdPart = projects.data.slice(2 * third);

  return (
    <div
      className={cn("items-start overflow-y-auto w-full", className)}
      ref={gridRef}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-7xl mx-auto gap-6">
        <div className="w-full bg-white grid grid-cols-1 gap-y-6 ">
          {firstPart.map((status, idx) => (
            <motion.div key={`grid-1-${idx}`} style={{ y: translateFirst }}>
              <ImageLi data={status} />
            </motion.div>
          ))}
        </div>
        <div className="w-full bg-white grid grid-cols-1 gap-y-6 ">
          {secondPart.map((status, idx) => (
            <motion.div key={`grid-2-${idx}`} style={{ y: translateSecond }}>
              <ImageLi data={status} />
            </motion.div>
          ))}
        </div>
        <div className="w-full bg-white grid grid-cols-1 gap-y-6 ">
          {thirdPart.map((status, idx) => (
            <motion.div key={`grid-3-${idx}`} style={{ y: translateThird }}>
              <ImageLi data={status} />
            </motion.div>
          ))}
        </div>
      </div>
      {isLoading && (
        <div className="text-center py-4">Loading more images...</div>
      )}
    </div>
  );
};
