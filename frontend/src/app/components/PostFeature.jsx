import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";

const PostFeature = () => {
  const { userId, token } = useAuthContext();
  const [image, selectedImage] = useState(null);
  const [description, setDescription] = useState("");
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    selectedImage(file);
  };
  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("userId", userId);
      if (image) {
        formData.append("postPicture", image);
      }

      console.log("userId:", userId);
      console.log("token:", token);
      const response = await fetch("http://localhost:4001/api/posts/", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
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
    <div className="border-3 border-gray2 max-h-4 mt-2 rounded-mdd bg-white mb-1 w-8.5">
      <div className="flex flex-row items-center p-2 border-b-2">
        <img src="/gilfoyl.png" alt="" className=" size-1 rounded-lg" />
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          name=""
          id=""
          className="bg-silver rounded-mdd pr-4 mx-1.25 px-4 h-1"
          placeholder="whats on your mind?"
        />
        <button
          onClick={handlePost}
          className="bg-[#538DD7] text-white font-semibold py-1.15 px-2 h-1 rounded-mdd"
        >
          Share
        </button>
      </div>
      <div className="flex flex-row p-2 pb-1.5 pt-1.5">
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
            <img src="/Image.png" width={20} height={20} className="mr-0.7" />
            <p>Image</p>
          </label>
        </div>
        <div className="flex flex-row mr-1.25">
          <img src="/Video.png" width={20} height={20} className="mr-0.7" />
          <p>video</p>
        </div>
        <div className="flex flex-row">
          <img src="/File.png" width={20} height={20} className="mr-0.7" />
          <p>attachement</p>
        </div>
      </div>
    </div>
  );
};

export default PostFeature;
