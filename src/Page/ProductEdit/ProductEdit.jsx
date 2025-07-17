import React, { useState, useEffect } from "react";
import "./ProductEdit.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS for styling
import BreadCrumb from "../../Component/BreadCrumbs/BreadCrumb";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
const ProductEdit = () => {
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // State to store the selected imag
  const [form, setForm] = useState({
    productName: "",
    newPrice: "",
    Rating: "",
    oldPrice: "",
    productDescription: "",
    categories: "",
    availability: "",
    image: null,
    deals: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleQuillChange = (content) => {
    setForm((prevForm) => ({
      ...prevForm,
      productDescription: content,
    }));
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
    const formData = new FormData();
    formData.append("productName", form.productName);
    formData.append("newPrice", form.newPrice);
    formData.append("Rating", form.Rating);
    formData.append("oldPrice", form.oldPrice);
    formData.append("availability", form.availability);
    formData.append("productDescription", form.productDescription);
    formData.append("categories", form.categories);
    formData.append("image", form.image);
    formData.append("deals", form.deals);
    e.preventDefault();

    if (
      form.productName === "" ||
      form.newPrice === "" ||
      form.Rating === "" ||
      form.productDescription === "" ||
      form.categories === "" ||
      form.availability === "" ||
      form.image === null
    ) {
      Swal.fire({
        icon: "error",
        title: "Please fill out the field before submitting",
      });
    } else {
      try {
        setLoader(true);
        const response = await axios.put(
          `https://villyzstore.onrender.com/products/${id}`,
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

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `https://villyzstore.onrender.com/products/${id}`
      );
      const res = response.data.response;

      setForm({
        productName: res.productName,
        Rating: res.Rating,
        availability: res.availability,
        newPrice: res.newPrice,
        oldPrice: res.oldPrice,
        categories: res.categories,
        productDescription: res.productDescription,
        image: res.image,
        deals: res.deals,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to load product",
      });
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);
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
      <div className="product-add-headercontainer">
        <div className="header-content">
          <div>
            <div className="add-text">Edit a product</div>
            <div className="product-order-text">
              Orders placed across your store
            </div>
          </div>
          <div className="buttons-group">
            <button className="discard-btn disabled">Discard</button>
            <button className="draft-btn">Save Draft</button>
            <button
              className="Publish-btn"
              disabled={loader}
              onClick={saveDocument}
            >
              {" "}
              {loader ? "Please wait..." : "Edit Product"}
            </button>
          </div>
        </div>
      </div>
      <div className="create-product-container mt-4">
        <div className="row mt-5">
          <div className="col-xl-4 col-sm-12">
            <div className="left-side">
              <div className="pricing-container shadow-sm">
                <div className="pricing-head">Pricing</div>
                <div className="pricing-form-cont">
                  <div className="pricing-form-itm">
                    <label htmlFor="">Old Price</label>
                    <br />
                    <input
                      type="text"
                      className="pricing"
                      placeholder="$3000"
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
                      placeholder="$1700"
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
                      placeholder="4"
                      onChange={handleInput}
                      value={form.Rating}
                      name="Rating"
                    />
                    <div className="tax-cont">
                      <div className="product-check">
                        <input type="checkbox" name="" id="" />
                      </div>
                      <div className="mb-1">Charge Tax on this product</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="availability-container shadow-sm  mt-3">
                <div className="pricing-head">Organize</div>
                <div className="pricing-form-cont">
                  <label htmlFor="">Availability</label>
                  <select
                    className="form-select pricing"
                    name="availability"
                    value={form.availability}
                    onChange={handleInput}
                    id=""
                  >
                    <option className="select-name" value="none">
                      Availability
                    </option>
                    <option value="in Stock">in Stock</option>
                    <option value="out Of Stock">out Of Stock</option>
                  </select>
                </div>
                <div className="pricing-form-cont">
                  <label htmlFor="">type</label>
                  <select
                    className="form-select pricing"
                    name="deals"
                    value={form.deals}
                    onChange={handleInput}
                    id=""
                  >
                    <option className="select-name">Deals type</option>
                    <option value="none">None</option>
                    <option value="Deal">Deal</option>
                    <option value="bestSellers">Best Sellers</option>
                  </select>
                  <div className="row">
                    <div className="col-10">
                      <div className="pricing-form-cont">
                        <label htmlFor="">Categories</label>
                        <select
                          className="form-select pricing"
                          name="categories"
                          value={form.categories}
                          onChange={handleInput}
                          id=""
                        >
                          <option className="select-name" value="none">
                            Categories
                          </option>
                          {category
                            .filter((item) => item.visibility === "published")
                            .map((item) => {
                              return (
                                <option value={item.name}>{item.name}</option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="add-category">
                        <IoIosAdd />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-md-12">
            <div className="product-info shadow-sm">
              <div className="pricing-head">Product Information</div>
              <div className="input-cont mt-4">
                <label htmlFor=""> Name</label>
                <div>
                  <input
                    type="text"
                    placeholder="Iphone 16 Pro max"
                    onChange={handleInput}
                    value={form.productName}
                    name="productName"
                  />
                </div>
              </div>
              <label className="mt-4">Description (optional)</label>
              <div className="styled-quill-wrapper">
                <ReactQuill
                  theme="snow"
                  value={form.productDescription}
                  onChange={(value) =>
                    setForm({ ...form, productDescription: value })
                  }
                  className="custom-quill"
                  placeholder="Keep your account secure with authentication step."
                />
              </div>

              {/* image */}
            </div>
            <div className="upload-cont shadow-sm">
              <label htmlFor="file-input">Product Image Upload</label>
              <input
                type="file"
                id="file-input"
                name="image"
                onChange={handleImageChange}
                hidden
              />

              <div className="label">
                Only portrait or square images, 2M max and 2000px max-height.
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
                      style={{
                        width: "160px",
                        height: "160px",
                        objectFit: "cover",
                      }}
                      src={form.image}
                      alt="upload"
                    />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
