import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";

export default function SubmitImages({ feature, onClose }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    feature: "",
    address: "",
    description: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (data.image && data.address && data.feature) {
      onClose();
    }
    post(route("project.store"));
  };

  return (
    <div className="max-w-4xl mx-auto sm:px-6 lg:px-4 ">
      <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <div className="p-6 text-gray-300">
          <h1 className="text-center font-medium text-3xl py-2 transform">
            Add New Image.
          </h1>
          <form className="space-y-6" onSubmit={onSubmit}>
            {/*  Create a new project from image */}
            <div>
              <InputLabel
                className="text-white text-lg font-medium"
                htmlFor="project_image_path"
                value="Project Image"
              />

              <TextInput
                id="project_image_path"
                name="image"
                type="file"
                isfocused="true"
                className="mt-1 py-1.5 px-2 block w-full bg-gray-400 border-black"
                onChange={(e) => setData("image", e.target.files[0])}
              />
              <InputError message={errors.image} className="mt-2" />
            </div>{" "}
            {/* Create a new from Address" */}
            <div>
              <InputLabel htmlFor="location" value="location" />

              <TextInput
                id="location"
                name="location"
                type="text"
                placeholder="Location"
                isfocused="true"
                value={data.address}
                className="mt-1 block text-gray-900 w-full "
                onChange={(e) => setData("address", e.target.value)}
              />
              <InputError message={errors.address} className="mt-2" />
            </div>
            {/* Create a new Project from Feature */}
            <div>
              <InputLabel htmlFor="feature" value="Project Feature" />

              <SelectInput
                id="feature"
                name="feature"
                type="text"
                placeholder="Project feature"
                isfocused="true"
                value={data.feature}
                className="mt-1 block w-full py-2"
                onChange={(e) => setData("feature", e.target.value)}
              >
                <option value="">Select Feature</option>
                {feature.map((feature, i) => (
                  <option key={i} value={feature}>
                    {feature}
                  </option>
                ))}
              </SelectInput>
              <InputError message={errors.feature} className="mt-2" />
            </div>
            {/* Create a new Project from Description */}
            <div>
              <InputLabel htmlFor="description" value="Project Description" />

              <TextAreaInput
                id="description"
                name="description"
                type="text"
                rows="06"
                placeholder="Project Description"
                isfocused="true"
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
                className="inline-flex items-center px-8 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
              >
                Cancel
              </Link>
              <SecondaryButton
                type="submit"
                className="bg-emerald-600 border-emerald-600 hover:bg-emerald-500 px-20 py-3"
              >
                Submit
              </SecondaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
