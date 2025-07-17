import React, { useEffect, useState } from "react";
import SideBar from "../../Component/SideBar/SideBar";
import "./User.css";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { CiEdit, CiSearch } from "react-icons/ci";
import { IoIosAdd, IoMdAdd } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../Component/BreadCrumbs/BreadCrumb";
import Swal from "sweetalert2";
import axios from "axios";
import { GoUpload } from "react-icons/go";
const User = ({ name }) => {
  const [loader, setLoader] = useState(false);
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();
  const getallUser = async () => {
    try {
      setLoader(false);
      const response = await axios.get(
        "https://villyzstore.onrender.com/alluser"
      );
      if (response) {
        setProductData(response.data.users);
        console.log(response.data.users);
        Swal.fire({
          icon: "success",
          title: "users gotten successfully!",
          timer: 3000,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "error fetching users!",
          timer: 3000,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "success",
        title: error.message,
        timer: 3000,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
      });
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getallUser();
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
    product.FirstName.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <div className="w-100">
      <div className="product">
        <div className="mt-4">
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
              <div className="d-flex align-items-center gap-2 flex-wrap">
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
                <button className="add-product-button">
                  <IoIosAdd size={20} /> Add Customer
                </button>
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
                    <th>CUSTOMER</th>
                    <th>CUSTOMER ID</th>
                    <th>COUNTRY</th>

                    <th>PHONE NUMBER</th>
                    <th>TOTAL SPEND</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.length > 0 ? (
                    loader ? (
                      <div className="text-center">loading....</div>
                    ) : (
                      currentProducts.map((product, i) => (
                        <tr key={product.i + 1}>
                          <td className="product-check">
                            <input type="checkbox" />
                          </td>
                          <td className="d-flex align-items-center gap-1">
                            <div>
                              <div className="user-profile">
                                {product.FirstName.slice(0, 2)}
                              </div>
                            </div>
                            <div>
                              <div className="username">
                                {product.FirstName}
                              </div>
                              <div className="useremail">
                                omojolaobaloluwa@gmail.com
                              </div>
                            </div>
                          </td>
                          <td>#V{product._id.slice(0, 6)}</td>
                          <td>
                            {product.isConfirmed ? (
                              <div className="d-flex align-items-center gap-1">
                                <div className="country-flag">
                                  <img
                                    src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/330px-Flag_of_France.svg.png"
                                    alt=""
                                  />
                                </div>
                                <div className="country-name">France</div>
                              </div>
                            ) : (
                              <div className="d-flex align-items-center gap-1">
                                <div className="country-flag">
                                  <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Flag_of_the_United_States_%28Web_Colors%29.svg/330px-Flag_of_the_United_States_%28Web_Colors%29.svg.png"
                                    alt=""
                                  />
                                </div>
                                <div className="country-name">America</div>
                              </div>
                            )}
                          </td>
                          <td>{product.phoneNumber}</td>

                          <td>
                            $
                            {Math.floor(
                              Math.random() *
                                parseInt(product.phoneNumber.slice(4, 8))
                            )
                              .toString()
                              .slice(0, 4)}
                            .00
                          </td>
                        </tr>
                      ))
                    )
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

export default User;
