import React, { useEffect, useState } from "react";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { CiEdit, CiSearch } from "react-icons/ci";
import "./Category.css";
import { IoMdAdd } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../Component/BreadCrumbs/BreadCrumb";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { TbEdit } from "react-icons/tb";
import { GoTrash } from "react-icons/go";
const Category = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [Deleteloader, setDeleteLoader] = useState(false);
  const getallCategory = async () => {
    try {
      setLoader(false);
      const response = await axios.get(
        "https://villyzstore.onrender.com/getallCategory"
      );
      if (response) {
        setProductData(response.data.response);
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
  // State management
  const [searchTerm, setSearchTerm] = useState(""); // For search bar
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [selectedOption, setSelectedOption] = useState("");

  let value;
  const handleChange = (event) => {
    value = event.target.value;
    setSelectedOption(value);
  };
  const itemsPerPage = Number(selectedOption) || 10; // Default to 10 if not selected

  // Filter products based on search term
  const filteredProducts = productData.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginationButtons = Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      onClick={() => paginate(index + 1)}
      className={`btn ${
        currentPage === index + 1 ? "padination-active" : "padination-inactive"
      }`}
      style={{ margin: "5px" }}
    >
      {index + 1}
    </button>
  ));
  const handleDelete = async (id) => {
    try {
      setDeleteLoader(true);
      const response = await axios.delete(
        `https://villyzstore.onrender.com/category/delete/${id}`
      );

      if (response.data.success) {
        setProductData((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );

        Swal.fire({
          icon: "success",
          title: "Product deleted successfully",
          timer: 3000,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: response.data.message || "Error deleting product",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.message || "Something went wrong",
      });
    } finally {
      setDeleteLoader(false);
    }
  };
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
    <div className="w-100">
      <div className="product">
        <div className="mt-3">
          <div className="product-body shadow">
            <div className="top-body">
              <div>
                <input
                  type="text"
                  className="form-control w-100"
                  placeholder="Search category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="d-flex align-items-center gap-2">
                <div>
                  <select
                    className="form-select"
                    name=""
                    id=""
                    value={selectedOption}
                    onChange={handleChange}
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                  </select>
                </div>
                <div>
                  <div
                    class="offcanvas offcanvas-end"
                    tabindex="-1"
                    id="offcanvasRight"
                    aria-labelledby="offcanvasRightLabel"
                  >
                    <div class="offcanvas-header">
                      <h5 class="offcanvas-title" id="offcanvasRightLabel">
                        Add Category
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="offcanvas-body">
                      <div>
                        <label htmlFor="">Title</label>
                        <input
                          type="text"
                          className="form-control w-100"
                          placeholder="Category Name"
                          name="name"
                          value={form.name}
                          onChange={handleInput}
                        />
                      </div>
                      <div className="mt-3">
                        <label htmlFor="">Category Status</label>
                        <select
                          name="visibility"
                          className="form-select p-2 mt-1"
                          value={form.visibility}
                          onChange={handleInput}
                          // value={form.visibility}
                          // onChange={handleInput}
                        >
                          <option value="">Select visibility</option>
                          <option value="hidden">Hidden</option>
                          <option value="published">Published</option>
                        </select>
                      </div>
                      <div className=" mt-4">
                        <label>Category Image*</label>
                        <div className="upload-cont-img">
                          <div className="label2">
                            Only portrait/square images, 2MB max, 2000px
                            max-height.
                          </div>
                          <div
                            className="upload-img"
                            onClick={() =>
                              document.getElementById("fileInput").click()
                            }
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
                                  Drop your images here or{" "}
                                  <span>click to browse</span>
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
                        <div className="button-group">
                          <button
                            className="add-button"
                            disabled={loader}
                            onClick={saveDocument}
                          >
                            {loader ? "Please wait..." : "Add"}
                          </button>
                          <button
                            className="discard-button"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                          >
                            Discard
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="addCategory"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                  >
                    <div>
                      <IoMdAdd />
                    </div>
                    add category
                  </button>
                </div>
              </div>
            </div>
            <div
              style={{
                maxWidth: "100%",
                height: "auto",
                overflow: "scroll",
                scrollbarWidth: "none",
              }}
            >
              {/* Search Bar */}

              {/* Product Table */}
              <table className="table3">
                <thead>
                  <tr className="tableHead">
                    <th className="product-check">
                      <input type="checkbox" />
                    </th>
                    <th>CATEGORIES</th>
                    <th>CATEGORY ID</th>
                    <th>TOTAL PRODUCTS</th>
                    <th>STATUS</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loader ? (
                    <div className="text-center">Loading....</div>
                  ) : currentProducts.length > 0 ? (
                    currentProducts.map((product, index) => (
                      <tr key={product.id}>
                        <td className="product-check">
                          <input type="checkbox" />
                        </td>
                        <td className="d-flex align-items-center gap-2">
                          <img
                            className="category-img"
                            width={40}
                            height={40}
                            src="https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-1/assets/product-1-CnD-btSp.png"
                            alt={product.name}
                          />
                          <div>
                            <div>{product.name}</div>
                            <div className="category-under">
                              Villyz Category
                            </div>
                          </div>
                        </td>
                        <td>#{product._id.slice(0, 5)}</td>
                        <td>1,200</td>
                        <td>
                          <div
                            className={
                              product.visibility === "published"
                                ? "in-visible"
                                : "out"
                            }
                          >
                            {product.visibility}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2 actionIcons">
                            <div
                              className="EditIcn"
                              onClick={() =>
                                navigate(`/editCategory/${product._id}`)
                              }
                            >
                              <TbEdit size={20} color="#787878" />
                            </div>
                            <div
                              className="DeleteIcn"
                              onClick={() => handleDelete(product._id)}
                            >
                              {Deleteloader ? (
                                "wait.."
                              ) : (
                                <GoTrash size={20} color="#787878" />
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        style={{ textAlign: "center", padding: "10px" }}
                      >
                        No category of "{searchTerm}" found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
            </div>
            <div style={{ textAlign: "end" }}>{paginationButtons}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
