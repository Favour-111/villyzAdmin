import React, { useState } from "react";
import "./ProductAdd.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS for styling
import BreadCrumb from "../../Component/BreadCrumbs/BreadCrumb";

const ProductAdd = () => {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image
  const [formData, setFormData] = useState({
    productName: "",
    oldPrice: "",
    Rating: "",
    newPrice: "",
    availability: false,
    categories: [],
  });

  const handleContentChange = (value) => {
    setContent(value); // Update state when content changes
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleCheckboxChange = (category) => {
    setFormData((prevData) => {
      const categories = [...prevData.categories];
      if (categories.includes(category)) {
        return {
          ...prevData,
          categories: categories.filter((item) => item !== category),
        };
      } else {
        return {
          ...prevData,
          categories: [...categories, category],
        };
      }
    });
  };

  const saveDocument = async () => {
    const productData = {
      productName: formData.productName,
      Rating: formData.Rating,
      oldPrice: formData.oldPrice,
      newPrice: formData.newPrice,
      availability: formData.availability ? "In Stock" : "Out of Stock",
      categories: formData.categories,
      productDescription: content,
    };

    const formDataToSend = new FormData();
    formDataToSend.append("productName", productData.productName);
    formDataToSend.append("oldPrice", productData.oldPrice);
    formDataToSend.append("newPrice", productData.newPrice);
    formDataToSend.append("availability", productData.availability);
    formDataToSend.append("categories", JSON.stringify(productData.categories));
    formDataToSend.append("productDescription", productData.productDescription);
    formDataToSend.append("Rating", productData.Rating);

    if (selectedImage) {
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      formDataToSend.append("productImage", blob, "product-image.jpg");
    }

    try {
      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Product added successfully!");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      alert("Failed to submit product.");
    }
  };

  const categories = [
    "Rice",
    "Beans",
    "Pasta",
    "Meat",
    "Vegetables",
    "Fruits",
    "Snacks",
    "Drinks",
  ];

  return (
    <div className="product">
      <BreadCrumb name="product create" />
      <div className="create-product-container">
        <button className="Add-btn" onClick={saveDocument}>
          Save Product
        </button>
        <div className="container">
          <div className="row mt-5">
            <div className="col-xl-5 col-sm-12">
              <div className="left-side">
                <div className="pricing-container shadow-sm rounded">
                  <div className="pricing-head">Product Pricing</div>
                  <div className="pricing-form-cont">
                    <div className="pricing-form-itm">
                      <label htmlFor="">Old Price</label>
                      <br />
                      <input
                        type="text"
                        className="pricing"
                        placeholder="Old price"
                        value={formData.oldPrice}
                        onChange={(e) =>
                          setFormData({ ...formData, oldPrice: e.target.value })
                        }
                      />
                    </div>
                    <div className="pricing-form-itm">
                      <label htmlFor="">New Price</label>
                      <br />
                      <input
                        type="text"
                        className="pricing"
                        placeholder="New price"
                        value={formData.newPrice}
                        onChange={(e) =>
                          setFormData({ ...formData, newPrice: e.target.value })
                        }
                      />
                    </div>
                    <div className="pricing-form-itm">
                      <label htmlFor="">Rating</label>
                      <br />
                      <input
                        type="text"
                        className="pricing"
                        placeholder="Product Rating"
                        value={formData.Rating}
                        onChange={(e) =>
                          setFormData({ ...formData, Rating: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="availability-container shadow-sm rounded mt-3">
                  <div className="pricing-head">Availability Status</div>
                  <div className="pricing-form-cont">
                    <div className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={formData.availability}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            availability: !formData.availability,
                          })
                        }
                      />
                      <label htmlFor="">In Stock</label>
                    </div>
                  </div>
                </div>
                <div className="availability-container shadow-sm rounded mt-3">
                  <div className="pricing-head">Categories</div>
                  <div className="select-container">
                    {categories.map((category) => (
                      <div className="checkbox-container" key={category}>
                        <input
                          type="checkbox"
                          checked={formData.categories.includes(category)}
                          onChange={() => handleCheckboxChange(category)}
                        />
                        <label>{category}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-md-12">
              <div className="product-info shadow-sm">
                <div className="pricing-head">Product Information</div>
                <div className="input-cont mt-4">
                  <label htmlFor="">Product Name</label>
                  <div>
                    <input
                      type="text"
                      placeholder="Input product name"
                      value={formData.productName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          productName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="input-cont mt-4">
                  <label htmlFor="">Product Description</label>
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={handleContentChange}
                    placeholder="Start typing..."
                    style={{ height: "200px" }}
                  />
                </div>
                <div className="upload-cont">
                  <label htmlFor="">Product Image Upload</label>
                  <div className="label">
                    Only portrait or square images, 2M max and 2000px
                    max-height.
                  </div>
                  <div
                    className="upload"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAdd;
