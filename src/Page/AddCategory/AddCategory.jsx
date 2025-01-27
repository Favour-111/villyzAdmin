import React, { useState } from "react";
import SideBar from "../../Component/SideBar/SideBar";
import "./AddCategory.css";
import BreadCrumb from "../../Component/BreadCrumbs/BreadCrumb";
const AddCategory = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  return (
    <div className="product">
      <BreadCrumb name="category create" />
      <div className="p-4">
        <div className="category-add-container shadow">
          <div className="input-item-container">
            <label htmlFor="">Category name*</label>
            <div>
              <input type="text" placeholder="category name" />
            </div>
          </div>
          <div className="input-item-container mt-5">
            <label htmlFor="">Category image*</label>
            <div className="upload-cont-img">
              <div className="label2">
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
              <label htmlFor="">Category Visibility*</label>
              <div>
                <select name="" id="">
                  <option value="hidden">hidden</option>
                  <option value="published">published</option>
                </select>
              </div>
            </div>
            <div className="input-item-container mt-4">
              <label htmlFor=""></label>
              <div>
                <button>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
