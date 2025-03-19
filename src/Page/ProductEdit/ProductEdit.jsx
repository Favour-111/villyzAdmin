import React, { useState, useEffect } from "react";
import "./ProductEdit.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS for styling
import BreadCrumb from "../../Component/BreadCrumbs/BreadCrumb";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
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
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
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
      form.oldPrice === "" ||
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
      <BreadCrumb name="product edit" />
      <div className="create-product-container">
        <button className="Add-btn" disabled={loader} onClick={saveDocument}>
          {loader ? "Please wait..." : "Update Product"}
        </button>

        <div className="container">
          <div className="row mt-5">
            <div className="col-xl-5 col-sm-12">
              <div className="left-side">
                <div className="pricing-container shadow-sm rounded">
                  <div className="pricing-head">Product Edit</div>
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
                      onChange={handleInput}
                      id=""
                      value={form.availability}
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
                      value={form.deals}
                      name="deals"
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
                      name="productName"
                      value={form.productName}
                    />
                  </div>
                </div>
                <div className="input-cont mt-4">
                  <label htmlFor="">Product Description</label>
                  <br />
                  <textarea
                    type="text"
                    placeholder="Input product description"
                    onChange={handleInput}
                    name="productDescription"
                    value={form.productDescription}
                  ></textarea>
                </div>
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
      </div>
    </div>
  );
};

export default ProductEdit;
