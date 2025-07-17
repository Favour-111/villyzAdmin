import React, { useEffect, useState } from "react";
import SideBar from "../../Component/SideBar/SideBar";
import "./Product.css";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { CiEdit, CiSearch } from "react-icons/ci";
import { IoIosAdd, IoIosLaptop, IoMdAdd } from "react-icons/io";
import { IoEyeOutline, IoGiftOutline } from "react-icons/io5";
import { RiDeleteBin6Line, RiHomeSmile2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../Component/BreadCrumbs/BreadCrumb";
import axios from "axios";
import { TbEdit } from "react-icons/tb";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { TfiWallet } from "react-icons/tfi";
import { GoTrash, GoUpload } from "react-icons/go";
const ProductList = ({ name }) => {
  const [productData, setProduct] = useState([]);
  const [loader, setLoader] = useState(false);
  const [Deleteloader, setDeleteLoader] = useState(false);
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      setLoader(true);
      const fetchedProduct = await axios.get(
        "https://villyzstore.onrender.com/getallProducts"
      );
      if (fetchedProduct) {
        setProduct(fetchedProduct.data.response);
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
          title: "error fetching products try again",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchProduct();
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
    product?.productName?.toLowerCase().includes(searchTerm.toLowerCase())
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
        `https://villyzstore.onrender.com/products/delete/${id}`
      );

      if (response.data.success) {
        setProduct((prevProducts) =>
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

  return (
    <div className="w-100">
      <div className="product">
        <div className="product-information-container shadow-sm">
          <div className="product-info-item">
            <div>
              <div className="sale-type">In-store sale</div>
              <div className="sales-price">$5,600</div>
              <div className="d-flex align-items-center gap-2 mt-1">
                <div className="orders-number">5k order</div>
                <div className="order-percentage">+5.7%</div>
              </div>
            </div>
            <div className="Home-icn">
              <RiHomeSmile2Line />
            </div>
          </div>
          <div className="lin"></div>
          <div className="product-info-item">
            <div>
              <div className="sale-type">Website sale</div>
              <div className="sales-price">$150,600</div>
              <div className="d-flex align-items-center gap-2 mt-1">
                <div className="orders-number">50k order</div>
                <div className="order-percentage">+5.7%</div>
              </div>
            </div>
            <div className="Home-icn">
              <IoIosLaptop />
            </div>
          </div>
          <div className="lin"></div>

          <div className="product-info-item">
            <div>
              <div className="sale-type">Discount</div>
              <div className="sales-price">$15,600</div>
              <div className="d-flex align-items-center gap-2 mt-1">
                <div className="orders-number">6k order</div>
                <div className="order-percentage">+5.7%</div>
              </div>
            </div>
            <div className="Home-icn">
              <IoGiftOutline />
            </div>
          </div>
          <div className="lin"></div>

          <div className="product-info-item">
            <div>
              <div className="sale-type">Affiliate</div>
              <div className="sales-price">$105,600</div>
              <div className="d-flex align-items-center gap-2 mt-1">
                <div className="orders-number">10k order</div>
                <div className="order-percentage-negative">+6.7%</div>
              </div>
            </div>
            <div className="Home-icn">
              <TfiWallet />
            </div>
          </div>
        </div>
        <div className="">
          <div className="product-body shadow">
            <div className="product-body-head">filters</div>
            <div className="product-body-filter">
              <select name="" className="form-select p-2" id="">
                <option value="status">stock</option>
                <option value="in Stock">in stock</option>
                <option value="out of stock">out of stock</option>
              </select>
              <select name="" className="form-select p-2" id="">
                <option value="status">category</option>
                <option value="in Stock">Electronics</option>
                <option value="out of stock">Beddings</option>
              </select>
              <select name="" className="form-select p-2" id="">
                <option value="status">status</option>
                <option value="in Stock">published</option>
                <option value="out of stock">Active</option>
                <option value="out of stock">inActive</option>
              </select>
            </div>
            <div className="product-filter-2">
              <div>
                <input
                  type="text"
                  className="form-control w-100"
                  placeholder="search product"
                />
              </div>
              <div className="buttons-filter-group">
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
                <button className="export-btn">
                  <GoUpload /> Export
                </button>
                <button
                  className="add-product-button"
                  onClick={() => navigate("/productadd")}
                >
                  <IoIosAdd size={20} /> Add Product
                </button>
              </div>
            </div>

            <div
              style={{
                maxWidth: "100%",
                height: "100%",
                overflow: "scroll",
                scrollbarWidth: "none",
              }}
            >
              {/* Search Bar */}

              {/* Product Table */}
              <table className="">
                <thead>
                  <tr className="tableHead">
                    <th className="product-check">
                      <input type="checkbox" />
                    </th>
                    <th>Product</th>
                    <th>Product ID</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loader ? (
                    <div className="text-center mt-3">loading...</div>
                  ) : currentProducts.length > 0 ? (
                    currentProducts.map((product, index) => (
                      <tr key={product.id}>
                        <td className="product-check">
                          <input type="checkbox" />
                        </td>
                        <td className="d-flex align-items-center gap-2">
                          <img
                            width={30}
                            height={30}
                            src={product.image}
                            alt=""
                          />
                          <div>
                            <div className="product-list-name">
                              {product.productName.slice(0, 9)}
                            </div>
                            <div className="product-list-category">
                              {product.categories}
                            </div>
                          </div>
                        </td>
                        <td>#{product._id.slice(0, 5)}</td>
                        <td className="product-category">
                          {product.categories}
                        </td>
                        <td>
                          {product.availability === "out Of Stock" ? (
                            <div class="form-check form-switch">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="switchCheckDefault"
                              />
                            </div>
                          ) : (
                            <div class="form-check form-switch">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="switchCheckDisabled"
                                checked
                              />
                            </div>
                          )}
                        </td>
                        <td className="product-price">${product.newPrice}</td>
                        <td>
                          <div
                            className={
                              product.availability === "in Stock"
                                ? "in-design"
                                : "out-design"
                            }
                          >
                            {product.availability === "in Stock"
                              ? "in Stock"
                              : "out Of Stock"}
                          </div>
                        </td>

                        <td>
                          <div className="d-flex align-items-center gap-2 actionIcons">
                            <div
                              className="EditIcn"
                              onClick={() =>
                                navigate(`/productedit/${product._id}`)
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
                        No products found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
            </div>
            {loader ? null : (
              <div style={{ textAlign: "end", padding: 10 }}>
                {paginationButtons}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
