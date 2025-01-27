import React, { useState } from "react";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { CiEdit, CiSearch } from "react-icons/ci";
import "./Category.css";
import { IoMdAdd } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../Component/BreadCrumbs/BreadCrumb";
const Category = () => {
  const navigate = useNavigate();
  const productData = [
    {
      img: "https://themesflat.co/html/remos/images/products/45.png",
      id: 1,
      name: "Product A",
      category: "Electronics",
      price: "$50",
      stock: "hidden",
    },
    {
      img: "https://themesflat.co/html/remos/images/products/46.png",
      id: 2,
      name: "Product B",
      category: "Clothing",
      price: "$30",
      stock: "published",
    },
    {
      img: "https://themesflat.co/html/remos/images/products/47.png",
      id: 3,
      name: "Product C",
      category: "Groceries",
      price: "$10",
      stock: "hidden",
    },
    {
      img: "https://themesflat.co/html/remos/images/products/48.png",
      id: 4,
      name: "Product D",
      category: "Electronics",
      price: "$70",
      stock: "published",
    },
    {
      img: "https://themesflat.co/html/remos/images/products/49.png",
      id: 5,
      name: "Product E",
      category: "Clothing",
      price: "$90",
      stock: "published",
    },
    {
      img: "",
      id: 6,
      name: "Product F",
      category: "Groceries",
      price: "$20",
      stock: "hidden",
    },
    {
      img: "https://themesflat.co/html/remos/images/products/50.png",
      id: 7,
      name: "Product G",
      category: "Electronics",
      price: "$100",
      stock: "hidden",
    },
    {
      img: "",
      id: 8,
      name: "Product H",
      category: "Clothing",
      price: "$40",
      stock: "hidden",
    },
    {
      img: "",
      id: 9,
      name: "Product I",
      category: "Groceries",
      price: "$15",
      stock: "published",
    },
    {
      img: "",
      id: 10,
      name: "Product J",
      category: "Electronics",
      price: "$200",
      stock: "hidden",
    },
    {
      img: "",
      id: 11,
      name: "Product K",
      category: "Clothing",
      price: "$25",
      stock: "published",
    },
    {
      img: "",
      id: 12,
      name: "Product L",
      category: "Groceries",
      price: "$5",
      stock: "hidden",
    },
  ];

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

  return (
    <div className="w-100">
      <div className="product">
        <BreadCrumb name="Category page" />
        <div className="p-4">
          <div className="product-body shadow">
            <div className="d-flex align-items-center gap-2 actionIcons">
              <div>
                <MdOutlineTipsAndUpdates />
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
              <div className="search-order ">
                <div className="table-desc">Search</div>
                <div className="product-search ms-1">
                  <input
                    type="text"
                    placeholder="Search category..."
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
                  navigate("/categoryadd");
                }}
              >
                <div>
                  <IoMdAdd />
                </div>
                add category
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
                    <th>category</th>
                    <th>quantity</th>
                    <th>Category</th>
                    <th>visibility</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <img
                            width={40}
                            height={40}
                            src={product.img}
                            alt=""
                          />
                          {product.name}
                        </td>
                        <td>{product.id}</td>
                        <td>{product.category}</td>
                        <td>
                          <div
                            className={
                              product.stock === "hidden" ? "out" : "in"
                            }
                          >
                            {product.stock}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2 actionIcons">
                            <div className="EyeIcn">
                              <IoEyeOutline size={20} color="blue" />
                            </div>
                            <div className="EditIcn">
                              <CiEdit size={20} color="green" />
                            </div>
                            <div className="DeleteIcn">
                              <RiDeleteBin6Line size={20} color="red" />
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
