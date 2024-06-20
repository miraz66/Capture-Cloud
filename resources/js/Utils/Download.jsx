import React from "react";
import axios from "axios";

const FileDownloader = ({ fileUrl, children }) => {
  const downloadFile = async () => {
    try {
      const response = await axios.get(fileUrl, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.jpg"); // Replace with your file name
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url); // Clean up the URL object
    } catch (error) {
      console.error("Failed to download file:", error);
    }
  };

  return (
    <div>
      <button onClick={downloadFile}>{children}</button>
    </div>
  );
};

export default FileDownloader;
