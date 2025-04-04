import React, { useState } from "react";
import BreadCrumb from "../../Component/BreadCrumbs/BreadCrumb";
import Swal from "sweetalert2";
import axios from "axios";
import "./AddCategory.css";

const AddCategory = () => {
  const [loader, setLoader] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    visibility: "",
    image: null,
  });

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      setForm((prevForm) => ({
        ...prevForm,
        image: imageFile, // Store the image file
      }));

      const imageUrl = URL.createObjectURL(imageFile);
      setSelectedImage(imageUrl); // Store the image preview URL
    }
  };

  const saveDocument = async (e) => {
    e.preventDefault();
    if (!form.name || !form.visibility || !form.image) {
      return Swal.fire({ icon: "error", title: "All fields are required!" });
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("visibility", form.visibility);
    formData.append("image", form.image);

    try {
      setLoader(true);
      const response = await axios.post(
        "https://villyzstore.onrender.com/category",
        formData
      );
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Category added successfully!",
          timer: 3000,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
        });

        // Reset form state
        setForm({ name: "", visibility: "", image: null });
        setSelectedImage(null);
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Network error!" });
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="product">
      <BreadCrumb name="Category Create" />
      <div className="p-4">
        <div className="category-add-container shadow">
          <div className="input-item-container">
            <label>Category Name*</label>
            <input
              type="text"
              placeholder="Category name"
              name="name"
              value={form.name}
              onChange={handleInput}
            />
          </div>

          <div className="input-item-container mt-5">
            <label>Category Image*</label>
            <div className="upload-cont-img">
              <div className="label2">
                Only portrait/square images, 2MB max, 2000px max-height.
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
                    <label className="label">
                      Drop your images here or <span>click to browse</span>
                    </label>
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

          <div className="input-item-container mt-4">
            <label>Category Visibility*</label>
            <select
              name="visibility"
              value={form.visibility}
              onChange={handleInput}
            >
              <option value="">Select visibility</option>
              <option value="hidden">Hidden</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="input-item-container mt-4">
            <button disabled={loader} onClick={saveDocument}>
              {loader ? "Please wait..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
