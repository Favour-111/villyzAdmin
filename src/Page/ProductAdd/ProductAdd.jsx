import React, { useEffect, useState } from "react";
import "./ProductAdd.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS for styling
import BreadCrumb from "../../Component/BreadCrumbs/BreadCrumb";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import axios from "axios";

const ProductAdd = () => {
  const [loader, setLoader] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // State to store the selected imag
  const [category, setCategory] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [form, setForm] = useState({
    productName: "",
    newPrice: "",
    Rating: "",
    oldPrice: "",
    productDescription: "",
    categories: "",
    availability: "",
    image: null,
    deals: false,
  });
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  // const handleContentChange = (value) => {
  //   setContent(value); // Update state when content changes
  // };
  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      setForm({ ...form, image: imageFile });
      setSelectedImage(URL.createObjectURL(imageFile));
      setImageUrl(""); // Clear the image URL field
    }
  };

  // Handle image URL input
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setForm({ ...form, image: url });
    setSelectedImage(url); // Display the image preview
  };

  const saveDocument = async (e) => {
    const formData = new FormData();
    formData.append("productName", form.productName);
    formData.append("newPrice", form.newPrice);
    formData.append("Rating", form.Rating);
    formData.append("oldPrice", form.oldPrice);
    formData.append("availability", form.availability);
    formData.append("productDescription", form.productDescription);
    formData.append("categories", form.categories);
    if (imageUrl) {
      formData.append("image", imageUrl);
    } else if (form.image) {
      formData.append("image", form.image);
    }
    formData.append("deals", form.deals);
    e.preventDefault();

    if (
      form.productName === "" ||
      form.newPrice === "" ||
      form.Rating === "" ||
      form.productDescription === "" ||
      form.categories === "" ||
      form.availability === "" ||
      (!form.image && !imageUrl)
    ) {
      Swal.fire({
        icon: "error",
        title: "Please fill out the field before submitting",
      });
    } else {
      try {
        setLoader(true);
        const response = await axios.post(
          "https://villyzstore.onrender.com/products",
          formData
        );
        if (response) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "Added successfully",
          });
          setForm({
            productName: "",
            newPrice: "",
            Rating: "",
            oldPrice: "",
            categories: "",
            availability: "",
            productDescription: "",
            image: null,
            deals: "",
          });
          setSelectedImage(null);
          setImageUrl("");
        } else {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "error",
            title: "network error",
          });
        }
        console.log(response);
      } catch (error) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      } finally {
        setLoader(false);
      }
    }
  };

  const getallCategory = async () => {
    try {
      setLoader(false);
      const response = await axios.get(
        "https://villyzstore.onrender.com/getallCategory"
      );
      if (response) {
        setCategory(response.data.response);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "fetched successfully",
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "error",
          title: "error fetching category",
        });
      }
    } catch (error) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: error.message,
      });
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getallCategory();
  }, []);

  return (
    <div className="product">
      <BreadCrumb name="product create" />
      <div className="create-product-container">
        <button className="Add-btn" disabled={loader} onClick={saveDocument}>
          {loader ? "Please wait..." : "Save Product"}
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
                        name="oldPrice"
                        value={form.oldPrice}
                        onChange={handleInput}
                      />
                    </div>
                    <div className="pricing-form-itm">
                      <label htmlFor="">New Price</label>
                      <br />
                      <input
                        type="text"
                        className="pricing"
                        placeholder="New price"
                        name="newPrice"
                        value={form.newPrice}
                        onChange={handleInput}
                      />
                    </div>
                    <div className="pricing-form-itm">
                      <label htmlFor="">Rating</label>
                      <br />
                      <input
                        type="text"
                        className="pricing"
                        placeholder="Product Rating"
                        onChange={handleInput}
                        value={form.Rating}
                        name="Rating"
                      />
                    </div>
                  </div>
                </div>
                <div className="availability-container shadow-sm rounded mt-3">
                  <div className="pricing-head">Availability Status</div>
                  <div className="pricing-form-cont">
                    <label htmlFor="">Availability</label>
                    <select
                      className="pricing"
                      name="availability"
                      value={form.availability}
                      onChange={handleInput}
                      id=""
                    >
                      <option value="none">Availability</option>
                      <option value="in Stock">in Stock</option>
                      <option value="out Of Stock">out Of Stock</option>
                    </select>
                  </div>
                  <div className="pricing-form-cont">
                    <label htmlFor="">type</label>
                    <select
                      className="pricing"
                      name="deals"
                      value={form.deals}
                      onChange={handleInput}
                      id=""
                    >
                      <option value="none">none</option>
                      <option value="Deal">Deal</option>
                      <option value="bestSellers">Best Sellers</option>
                    </select>
                  </div>
                </div>
                <div className="availability-container shadow-sm rounded mt-3">
                  <div className="pricing-head">Categories</div>
                  <div className="pricing-form-cont">
                    <label htmlFor="">Categories</label>
                    <select
                      className="pricing"
                      name="categories"
                      value={form.categories}
                      onChange={handleInput}
                      id=""
                    >
                      <option value="none">Categories</option>
                      {category
                        .filter((item) => item.visibility === "published")
                        .map((item) => {
                          return <option value={item.name}>{item.name}</option>;
                        })}
                    </select>
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
                      onChange={handleInput}
                      value={form.productName}
                      name="productName"
                    />
                  </div>
                </div>
                <div className="input-cont mt-4">
                  <label htmlFor="">Product Description</label>
                  <br />
                  <ReactQuill
                    theme="snow"
                    style={{ height: "200px" }}
                    value={form.productDescription} // Ensure ReactQuill has the correct value
                    onChange={(value) =>
                      setForm({ ...form, productDescription: value })
                    } // Update state on change
                    placeholder="Enter product description..."
                  />
                </div>
                {/* image */}
                <div className="upload-cont">
                  <label htmlFor="file-input">Product Image Upload</label>
                  <input
                    type="file"
                    id="file-input"
                    name="image"
                    onChange={handleImageChange}
                    hidden
                  />

                  <div className="label">
                    Only portrait or square images, 2M max and 2000px
                    max-height.
                  </div>
                  <label className="upload" htmlFor="file-input">
                    {selectedImage ? (
                      <img
                        src={selectedImage} // Use selectedImage directly
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
                        <label htmlFor="file-input" className="label">
                          Drop your images here or select{" "}
                          <span>click to browse</span>
                        </label>
                      </>
                    )}
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </div>
                <p>or</p>
                <input
                  type="text"
                  placeholder="Enter image URL"
                  value={imageUrl}
                  onChange={handleImageUrlChange}
                  disabled={form.image !== null} // Disable if file is selected
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAdd;
