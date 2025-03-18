import React, { useState } from "react";
import SideBar from "../../Component/SideBar/SideBar";
import BreadCrumb from "../../Component/BreadCrumbs/BreadCrumb";
import ReactQuill from "react-quill";
import axios from "axios";
import Swal from "sweetalert2";
const Blog = () => {
  const [BlogTitle, setBlogTitle] = useState("");
  const [BlogDate, setBlogDate] = useState("");
  const [BlogDescription, setBlogDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [BlogVisibility, setBlogVisibility] = useState("hidden");
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      setImage(imageFile); // Store the image file directly
      setSelectedImage(URL.createObjectURL(imageFile)); // Store preview URL
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("BlogTitle", BlogTitle);
    formData.append("BlogDate", BlogDate);
    formData.append("BlogDescription", BlogDescription);
    formData.append("BlogVisibility", BlogVisibility);
    formData.append("image", image);
    if (
      BlogTitle === "" ||
      BlogDate === "" ||
      BlogDescription === "" ||
      BlogVisibility === "" ||
      image === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "input field is required",
        timer: 3000,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
      });
    } else {
      try {
        setLoader(true);
        await axios.post("https://villyzstore.onrender.com/blog", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        Swal.fire({
          icon: "success",
          title: "Blog created successfully!",
          timer: 3000,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
        });

        // Reset form fields
        setBlogTitle("");
        setBlogDate("");
        setBlogDescription("");
        setBlogVisibility("hidden");
        setImage(null);
        setSelectedImage(null);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title:
            error.response?.data?.message ||
            error.message ||
            "Error creating blog!",
          timer: 3000,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
        });
      } finally {
        setLoader(false);
      }
    }
  };

  return (
    <div className="product">
      <BreadCrumb name="Blog create" />
      <div className="p-4">
        <div className="category-add-container shadow">
          <div className="input-item-container">
            <label htmlFor="">Blog Title*</label>
            <div>
              <input
                type="text"
                placeholder="Blog name"
                value={BlogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="input-item-container mt-5">
            <label htmlFor="">Blog Date*</label>
            <div>
              <input
                type="date"
                value={BlogDate}
                onChange={(e) => setBlogDate(e.target.value)}
              />
            </div>
          </div>

          <div className="input-cont my-5">
            <label htmlFor="" className="mb-3">
              Blog Description
            </label>
            <ReactQuill
              theme="snow"
              placeholder="Start typing..."
              style={{ height: "200px" }}
              value={BlogDescription}
              onChange={setBlogDescription}
            />
          </div>

          <div className="input-item-container mt-5">
            <label htmlFor="">Blog image*</label>
            <div className="upload-cont-img">
              <div className="label2 mt-5">
                Only portrait or square images, 2M max and 2000px max-height.
              </div>
              <div
                className="upload-img"
                onClick={() => document.getElementById("fileInput").click()}
              >
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    style={{
                      width: "160px",
                      height: "160px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <>
                    <img
                      width="64"
                      height="64"
                      src="https://img.icons8.com/wired/64/upload.png"
                      alt="upload"
                    />
                    <div className="label">
                      Drop your images here or select{" "}
                      <span>click to browse</span>
                    </div>
                  </>
                )}
              </div>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div>
            <div className="input-item-container mt-4">
              <label htmlFor="">Blog Visibility*</label>
              <div>
                <select
                  value={BlogVisibility}
                  onChange={(e) => setBlogVisibility(e.target.value)}
                >
                  <option value="">Visibility</option>
                  <option value="hidden">Hidden</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div className="input-item-container mt-4">
              <label htmlFor=""></label>
              <div>
                <button onClick={handleSubmit} disabled={loader}>
                  {loader ? "please wait..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
