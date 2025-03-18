import React, { useEffect, useState } from "react";
import SideBar from "../../Component/SideBar/SideBar";
import "./Product.css";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { CiEdit, CiSearch } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../Component/BreadCrumbs/BreadCrumb";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
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
        <BreadCrumb name="product page" />
        <div className="p-4">
          <div className="product-body shadow">
            <div className="d-flex align-items-center gap-2 actionIcons">
              <div>
                <MdOutlineTipsAndUpdates />
              </div>
              <div className="tips">
                Tip search by Product ID: Each product is provided with a unique
                ID, which you can rely on to find the exact product you need.
              </div>
            </div>
            <div className="showing">
              <div className=" d-flex align-items-center gap-1">
                <div className="table-desc">Showing</div>
                <div>
                  <select
                    className="select"
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
              </div>
              <div className="search-order">
                <div className="table-desc">Search</div>
                <div className="product-search ms-1">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div>
                    <CiSearch />
                  </div>
                </div>
              </div>
              <button
                className="add-btn"
                onClick={() => {
                  navigate("/productadd");
                }}
              >
                <div>
                  <IoMdAdd />
                </div>
                add product
              </button>
            </div>
            <div
              style={{
                maxWidth: "100%",
                height: "500px",
                overflow: "scroll",
                scrollbarWidth: "none",
              }}
            >
              {/* Search Bar */}

              {/* Product Table */}
              <table className="table3">
                <thead>
                  <tr className="tableHead">
                    <th>Product</th>
                    <th>Product ID</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>stock</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loader ? (
                    <div className="text-center">loading...</div>
                  ) : currentProducts.length > 0 ? (
                    currentProducts.map((product, index) => (
                      <tr key={product.id}>
                        <td>
                          <img
                            width={40}
                            height={40}
                            src={product.image}
                            alt=""
                          />
                          {product.productName}
                        </td>
                        <td>{index + 1}</td>
                        <td>{product.categories}</td>
                        <td>{product.newPrice}</td>
                        <td>
                          <div
                            className={
                              product.availability === "in Stock" ? "in" : "out"
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
                              <CiEdit size={20} color="green" />
                            </div>

                            <div
                              className="DeleteIcn"
                              onClick={() => handleDelete(product._id)}
                            >
                              {Deleteloader ? (
                                "wait.."
                              ) : (
                                <RiDeleteBin6Line size={20} color="red" />
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
            <div style={{ textAlign: "end" }}>{paginationButtons}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
