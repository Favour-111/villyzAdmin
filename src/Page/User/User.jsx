import React, { useEffect, useState } from "react";
import SideBar from "../../Component/SideBar/SideBar";
import "./User.css";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { CiEdit, CiSearch } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../Component/BreadCrumbs/BreadCrumb";
import Swal from "sweetalert2";
import axios from "axios";
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
        <BreadCrumb name="User page" />
        <div className="p-4">
          <div className="product-body shadow">
            <div className="d-flex align-items-center gap-2 actionIcons">
              <div>
                <MdOutlineTipsAndUpdates />
              </div>
              <div className="tips">
                Tip search by User Name: Each user is provided with a unique
                email, which you can rely on to find the exact user you need.
              </div>
            </div>
            <div className="showing mt-4">
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
                    placeholder="Search User..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div>
                    <CiSearch />
                  </div>
                </div>
              </div>
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
                    <th>user</th>
                    <th>Phone number</th>
                    <th>email</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.length > 0 ? (
                    loader ? (
                      <div className="text-center">loading....</div>
                    ) : (
                      currentProducts.map((product, i) => (
                        <tr key={product.i + 1}>
                          <td>{product.FirstName}</td>
                          <td>{product.phoneNumber}</td>
                          <td>{product.email}</td>

                          <td></td>
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
