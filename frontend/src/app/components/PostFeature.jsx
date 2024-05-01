import React, { useEffect, useState } from "react";
import { FaFileVideo } from "react-icons/fa";
import { IoAttach } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";
import { useAuthContext } from "../context/authContext";

const PostFeature = () => {
  const { userId } = useAuthContext();
  const [image, selectedImage] = useState(null);
  const [description, setDescription] = useState("");
  const [token, setToken] = useState(null);
  const loadToken = () => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  };
  useEffect(() => {
    loadToken();
  }, []);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    selectedImage(file);
  };
  const handlePost = async () => {
    try {
      if (!userId || !token) {
        console.error("userId is not defined or invalid or token machi valid");
        return;
      }

      const formData = new FormData();
      formData.append("image", image);
      formData.append("description", description);
      formData.append("userId", userId);

      console.log("userId:", userId);

      const response = await fetch("http://localhost:4001/api/posts/", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          token: token,
        },
      });

      if (response.ok) {
        console.log("Post created successfully");
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  return (
    <div className="border-2 max-h-4 mt-2 rounded-semilg mb-1.5">
      <div className="flex flex-row p-2 border-b-2">
        <img src="/gilfoyl.png" alt="" className="w-1.25 rounded-lg" />
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          name=""
          id=""
          className="bg-silver rounded-md pr-4 mx-1.25 px-4"
          placeholder="whats on your mind?"
        />
        <button
          onClick={handlePost}
          className="bg-[#538DD7] text-white font-semibold py-1.15 px-2 rounded-md"
        >
          Share
        </button>
      </div>
      <div className="flex flex-row pl-2 pt-2">
        <div className="flex flex-row mr-1.25">
          <label
            htmlFor="image-upload"
            className="flex items-center cursor-pointer"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="image-upload"
              className="hidden"
            />
            <CiImageOn size={20} className="mr-1" />
            <p>Image</p>
          </label>
        </div>
        <div className="flex flex-row mr-1.25">
          <FaFileVideo size={20} />
          <p>video</p>
        </div>
        <div className="flex flex-row">
          <IoAttach size={20} />
          <p>attachement</p>
        </div>
      </div>
    </div>
  );
};

export default PostFeature;
