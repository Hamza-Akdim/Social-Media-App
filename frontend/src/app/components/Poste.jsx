import React, { useState, useRef, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { useAuthContext } from "../context/authContext";

const Poste = ({ postId, name, caption, profilePic, src, likes, comment }) => {
  const { token, userId } = useAuthContext();

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(caption);
  const [comments, setComments] = useState(comment || []);
  const [newComment, setNewComment] = useState("");

  const menuRef = useRef(null);

  const bufferToBase64 = (buffer) => {
    const base64String = Buffer.from(buffer).toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  };

  const imageSrc = src.data ? bufferToBase64(src.data) : "";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleModify = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:4001/api/posts/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ description }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the post");
      }

      const data = await response.json();
      setDescription(data.description);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating the post:", error);
    }
  };
  const commentss = ["pop"];
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:4001/api/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the post");
      }

      if (onDelete) {
        onDelete(postId);
      }
    } catch (error) {
      console.error("Error deleting the post:", error);
    }
  };
  const handleAddComment = async () => {
    try {
      const response = await fetch(
        `http://localhost:4001/api/posts/${postId}/${userId}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ comment: newComment }), 
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      const data = await response.json();
      setComments([...comments, { user: "You", text: newComment }]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="flex flex-col border-3 border-gray2 rounded-mdd bg-white mb-1.5 w-8.5">
      <div className="flex flex-row pt-2 pl-2">
        <img src={profilePic} alt="" className="w-1.25 rounded-lg mr-1.25" />
        <h6 className="text-base font-semibold">{name}</h6>
        <div className="menu-container relative inline-block" ref={menuRef}>
          <button
            className="ml-8 text-2xl focus:outline-none"
            onClick={toggleMenu}
          >
            <CiMenuKebab size={25} />
          </button>
          {isOpen && (
            <ul className="menu absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <li
                className="menu-item px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleModify}
              >
                Modify
              </li>
              <li
                className="menu-item px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleDelete}
              >
                Delete
              </li>
            </ul>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="flex flex-col p-2">
          <textarea
            className="border p-2 w-full rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="mt-2 bg-blue-500 py-1 px-4  text-black rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      ) : (
        <p className="pl-2 pt-1 pb-2">{description}</p>
      )}

      <img
        src={imageSrc}
        alt=""
        className="w-8 h-5 m-auto rounded-mdd border-b-2 mb-1.25"
      />
      <div className="flex flex-row items-center justify-between m-auto mb-1 w-8">
        <div className="flex items-center">
          <button>
            <img src="/Add.png" width={20} height={20} className="mr-1" />
          </button>
          <div>
            <p className="">{likes} found this interesting</p>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <img src="/Comment.png" width={20} height={20} className="mr-1" />
          <div>
            <p>0 commentss</p>
          </div>
        </div>
        <div className="flex items-center">
          <img src="/Share.png" width={20} height={20} className="mr-1" />
          <div>
            <p>0 share</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row pl-2 mb-1.5">
          <img src={profilePic} alt="" className="w-1 rounded-lg mr-1.25" />
          <input
            type="text"
            className="bg-silver rounded-md pr-4 mx-1.25 px-5"
            placeholder="What's on your mind?"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Post</button>
        </div>
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default Poste;
