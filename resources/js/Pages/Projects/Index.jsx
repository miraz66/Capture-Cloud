import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import Modal from "@/Components/Modal";
import ShowImages from "@/Components/ShowImages";

export default function index({
  auth,
  projects,
  feature,
  queryParams = null,
  success,
}) {
  queryParams = queryParams || {};
  const [projectData, setProjectData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const searchFieldChange = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("project.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChange(name, e.target.value);
  };

  const sortChange = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("project.index"), queryParams);
  };

  const deleteProject = (id) => {
    if (!window.confirm("Are you sure you want to delete this project")) return;

    router.delete(route("project.destroy", id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            All Images
          </h2>
          <Link
            href={route("project.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add image
          </Link>
        </div>
      }
    >
      <Head title="Projects" />
      {success && (
        <div
          x-data="{ show: true }"
          x-init="setTimeout(() => show = false, 3000)"
          x-show="show"
          className="text-emerald-500 text-center pt-5"
        >
          {success}
        </div>
      )}

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-4">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-600">
              {/* <pre>{JSON.stringify(projects, undefined, 2)}</pre> */}

              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:to-gray-400">
                  <thead className="text-sm text-gray-400 uppercase bg-gray-50 dark:bg-gray-700 dark:to-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      {/* ID */}
                      <TableHeading
                        name={"id"}
                        sortable={true}
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChange}
                      >
                        id
                      </TableHeading>

                      {/* Image */}
                      <TableHeading name={"image"} sortable={false}>
                        image
                      </TableHeading>

                      {/* Address */}
                      <TableHeading name={"address"} sortable={false}>
                        Address
                      </TableHeading>

                      {/* Feature */}
                      <TableHeading
                        name={"feature"}
                        sortable={true}
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChange}
                      >
                        Feature
                      </TableHeading>

                      {/* created Date */}
                      <TableHeading
                        name={"created_at"}
                        sortable={true}
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChange}
                      >
                        created Date
                      </TableHeading>

                      {/* created By */}
                      <TableHeading name={"created_by"} sortable={false}>
                        created By
                      </TableHeading>

                      {/* actions */}
                      <TableHeading name={"actions"} sortable={false}>
                        actions
                      </TableHeading>
                    </tr>
                  </thead>

                  <thead className="text-sm text-white uppercase bg-gray-50 dark:bg-gray-700 dark:to-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-4">
                        <TextInput
                          className="w-full text-black"
                          defaultValue={queryParams.id}
                          placeholder="Project ID"
                          onBlur={(e) => searchFieldChange(e.target.value)}
                          onKeyPress={(e) => onKeyPress("id", e)}
                        />
                      </th>
                      <th className="px-3 py-4"></th>
                      <th className="px-3 py-4"></th>

                      <th>
                        <SelectInput
                          defaultValue={queryParams.feature}
                          className="w-full"
                          onChange={(e) =>
                            searchFieldChange("feature", e.target.value)
                          }
                        >
                          <option value="">Select Status</option>
                          {feature.map((feature, i) => (
                            <option key={i} value={feature} className="">
                              {feature}
                            </option>
                          ))}
                        </SelectInput>
                      </th>
                      <th className="px-3 py-4"></th>
                      <th className="px-3 py-4"></th>
                      <th className="px-3 py-4"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {projects.data.map((project, index) => (
                      <tr
                        key={index}
                        className="bg-white dark:text-gray-400 border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        {/* ID */}
                        <td className="px-3 py-2">{project.id}</td>

                        {/* Image */}
                        <td className="px-3 py-2">
                          <img
                            className="rounded cursor-pointer"
                            src={project.image_path}
                            alt="Project image"
                            onClick={() => {
                              setShowModal(true), setProjectData(project);
                            }}
                            style={{
                              width: 200,
                              height: 150,
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />
                        </td>

                        {/* Address */}
                        <td className="px-3 py-2">{project.address}</td>

                        {/* Feature */}
                        <td className="px-3 py-2 capitalize">
                          {project.feature}
                        </td>

                        {/* created_at */}
                        <td className="px-3 py-2">{project.created_at}</td>

                        {/* created_by */}
                        <td className="px-3 py-2">{project.updated_by.name}</td>

                        {/* Actions */}
                        <td className="px-3 py-2">
                          <div className="flex items-center justify-center gap-1">
                            <Link
                              href={route("project.edit", project.id)}
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => deleteProject(project.id)}
                              className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={projects.meta.links} />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ShowImages projects={projectData} />
      </Modal>
    </AuthenticatedLayout>
  );
}
