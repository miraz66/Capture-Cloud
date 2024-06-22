import React, { Component } from "react";
import axios from "axios";
import {
  HeartIcon,
  PlusIcon,
  ArrowDownIcon,
  UserCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import FileDownloader from "@/Utils/Download";

class ImagesHover extends Component {
  handleLike = async (projectId) => {
    try {
      await axios.post(`/projects/${projectId}/like`);
      // Handle success (e.g., update UI or show a notification)
      console.log("Project liked successfully");
    } catch (error) {
      console.error("Failed to like project:", error);
    }
  };

  handleAddToCollection = async (projectId) => {
    try {
      await axios.post(`/projects/${projectId}/add-to-collection`);
      // Handle success (e.g., update UI or show a notification)
      console.log("Project added to collection successfully");
    } catch (error) {
      console.error("Failed to add project to collection:", error);
    }
  };

  FavouritFilfd = (props) => {
    return (
      <div className="flex justify-center gap-2">
        <HeartIcon
          className="text-gray-700 w-10 bg-white py-2 px-3 rounded-md cursor-pointer"
          onClick={() => this.handleLike(props.id)}
        />
        <PlusIcon
          className="text-gray-700 w-10 bg-white py-2 px-3 rounded-md cursor-pointer"
          onClick={() => this.handleAddToCollection(props.id)}
        />
      </div>
    );
  };

  UserFild = (props) => {
    return (
      <div className="flex justify-between w-full items-center">
        <div className="flex justify-center items-center gap-1">
          <div>
            {props.created_by.user_image ? (
              <img
                src={props.created_by.user_image}
                className="w-8 h-8 rounded-full object-cover"
                alt="User Profile Image"
              />
            ) : (
              <UserCircleIcon className="w-8" />
            )}
          </div>
          <div>
            <h1 className="text-xs">{props.created_by.name}</h1>
            <div className="flex gap-1 justify-center">
              <p className="text-xs">Available for hire</p>
              <CheckCircleIcon className="w-3 text-gray-300" />
            </div>
          </div>
        </div>
        <div>
          <FileDownloader
            fileUrl={props.image_path}
            feature={props.feature}
            name={props.created_by.name}
          >
            <ArrowDownIcon className="w-10 py-2 px-3 rounded bg-gray-200 text-gray-800 cursor-pointer" />
          </FileDownloader>
        </div>
      </div>
    );
  };

  render() {
    const { project } = this.props;

    return (
      <div>
        {this.FavouritFilfd()}
        {this.UserFild(project)}
      </div>
    );
  }
}

export default ImagesHover;
