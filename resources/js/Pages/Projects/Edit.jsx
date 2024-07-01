import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Create({ auth, project, feature }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    image_path: project.data.image_path || "",
    address: project.data.address || "",
    status: project.data.feature || "",
    description: project.data.description || "",
    _method: "PUT",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("projects.update", project.id));
  };

  if (data.image_path === "http//capturecloud.test/") {
    console.log(data.image_path);
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Edit Your {project.name} Images.
          </h2>
        </div>
      }
    >
      <Head title="Add New Project" />
      <div className="py-12 dark:bg-gray-800 min-h-screen">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-4 ">
          <div className="bg-white overflow-hidden dark:bg-gray-700 shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-300">
              <h1 className="text-center font-medium text-3xl py-2 transform">
                Edit Your Details.
              </h1>

              <form className="space-y-6" onSubmit={onSubmit}>
                {/*  Create a new project from image */}
                <div>
                  <img
                    className="rounded-lg"
                    src={"http://capturecloud.test/" + data.image_path}
                    alt="Project Image"
                  />
                  {/*
                  <TextInput
                    id="project_image_path"
                    name="image"
                    type="file"
                    isFocused="true"
                    className="mt-8 py-1.5 px-2 block w-full bg-gray-400 border-black"
                    onChange={(e) => setData("image", e.target.files[0])}
                  />
                  <InputError message={errors.image} className="mt-2" /> */}
                </div>

                {/* Create a new Project from Location */}
                <div>
                  <InputLabel
                    className="text-white text-lg font-medium"
                    htmlFor="address"
                    value="Addrass"
                  />

                  <TextInput
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Project address"
                    value={data.address}
                    isFocused="true"
                    className="mt-1 block w-full text-gray-900"
                    autoComplete="name"
                    onChange={(e) => setData("address", e.target.value)}
                  />
                  <InputError message={errors.address} className="mt-2" />
                </div>

                {/* Create a new Project from Feature */}
                <div>
                  <InputLabel
                    className="text-white text-lg font-medium"
                    htmlFor="status"
                    value="Project Status"
                  />

                  <SelectInput
                    id="status"
                    name="status"
                    type="text"
                    placeholder="Project Status"
                    isFocused="true"
                    value={data.status}
                    className="mt-1 block w-full py-2"
                    onChange={(e) => setData("status", e.target.value)}
                  >
                    <option value="">Select Feature</option>
                    {feature.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </SelectInput>
                  <InputError message={errors.status} className="mt-2" />
                </div>

                {/* Create a new Project from Description */}
                <div>
                  <InputLabel
                    className="text-white text-lg font-medium"
                    htmlFor="description"
                    value="Project Description"
                  />

                  <TextAreaInput
                    id="description"
                    name="description"
                    type="text"
                    rows="06"
                    placeholder="Project Description"
                    isFocused="true"
                    value={data.description}
                    className="mt-1 block w-full text-gray-900"
                    onChange={(e) => setData("description", e.target.value)}
                  />
                  <InputError message={errors.description} className="mt-2" />
                </div>

                {/* Submit or Cancel Button */}
                <div className="flex justify-end gap-5">
                  <Link
                    // href={route("project.index")}
                    className="inline-flex items-center px-6 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                  >
                    Cancel
                  </Link>
                  <SecondaryButton
                    type="submit"
                    className="bg-emerald-600 border-emerald-600 hover:bg-emerald-500 px-16 py-3"
                  >
                    Submit
                  </SecondaryButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
