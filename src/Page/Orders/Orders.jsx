import React, { useState } from "react";
import SideBar from "../../Component/SideBar/SideBar";
import "./Orders.css";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { CiEdit, CiSearch } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../Component/BreadCrumbs/BreadCrumb";
const Orders = () => {
  const navigate = useNavigate();
  const productData = [
    {
      img: "https://themesflat.co/html/remos/images/products/45.png",
      id: 1,
      name: "Product A",
      category: "Electronics",
      price: "$50",
      stock: "out of stock",
    },
    {
      img: "https://themesflat.co/html/remos/images/products/46.png",
      id: 2,
      name: "Product B",
      category: "Clothing",
      price: "$30",
      stock: "in stock",
    },
    {
      img: "https://themesflat.co/html/remos/images/products/47.png",
      id: 3,
      name: "Product C",
      category: "Groceries",
      price: "$10",
      stock: "out of stock",
    },
    {
      img: "https://themesflat.co/html/remos/images/products/48.png",
      id: 4,
      name: "Product D",
      category: "Electronics",
      price: "$70",
      stock: "in stock",
    },
    {
      img: "https://themesflat.co/html/remos/images/products/49.png",
      id: 5,
      name: "Product E",
      category: "Clothing",
      price: "$90",
      stock: "in stock",
    },
    {
      img: "",
      id: 6,
      name: "Product F",
      category: "Groceries",
      price: "$20",
      stock: "out of stock",
    },
    {
      img: "https://themesflat.co/html/remos/images/products/50.png",
      id: 7,
      name: "Product G",
      category: "Electronics",
      price: "$100",
      stock: "out of stock",
    },
    {
      img: "",
      id: 8,
      name: "Product H",
      category: "Clothing",
      price: "$40",
      stock: "out of stock",
    },
    {
      img: "",
      id: 9,
      name: "Product I",
      category: "Groceries",
      price: "$15",
      stock: "in stock",
    },
    {
      img: "",
      id: 10,
      name: "Product J",
      category: "Electronics",
      price: "$200",
      stock: "out of stock",
    },
    {
      img: "",
      id: 11,
      name: "Product K",
      category: "Clothing",
      price: "$25",
      stock: "in stock",
    },
    {
      img: "",
      id: 12,
      name: "Product L",
      category: "Groceries",
      price: "$5",
      stock: "out of stock",
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
        <BreadCrumb name="Order page" />
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
            <div className="d-flex align-items-center mt-4">
              <div className=" d-flex align-items-center gap-1">
                <div className="table-desc">Showing</div>
                <div>
                  <select
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
              <div className="ms-4 d-flex align-items-center gap-1">
                <div className="table-desc">Search</div>
                <div className="product-search ms-1">
                  <input
                    type="text"
                    placeholder="Search customer name..."
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
              <table>
                <thead>
                  <tr className="tableHead">
                    <th>order ID</th>
                    <th>Created at</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Items</th>
                    <th>Order status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                      <tr key={product.id}>
                        <td>#557779</td>
                        <td>{product.category}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.id}</td>
                        <td>
                          <div
                            className={
                              product.stock === "out of stock" ? "out" : "in"
                            }
                          >
                            {product.stock}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2 actionIcons">
                            <div
                              class="EyeIcn"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop"
                            >
                              <IoEyeOutline size={20} color="blue" />
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
                        colSpan="7"
                        style={{ textAlign: "center", padding: "10px" }}
                      >
                        No order found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div
                class="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="staticBackdropLabel">
                        Order details
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div className="d-flex align-items-center justify-content-between mt-3">
                        <div>Customer name</div>
                        <div>omojola</div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-3">
                        <div>Order ID</div>
                        <div>#571423</div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-3">
                        <div>Order date</div>
                        <div>2024-8-10</div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-3">
                        <div>Order price</div>
                        <div>$571</div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-3">
                        <div>payment method</div>
                        <div>paypal</div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-3">
                        <div>payment status</div>
                        <div className="success">paid</div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-3">
                        <div>order status</div>
                        <div className="paid">Delivered</div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-3">
                        <div>order status edit</div>
                        <select name="" id="">
                          <option value="Delivered">Delivered</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Shipped">in Shipping</option>
                          <option value="pending">pending</option>
                          <option value="canceled">canceled</option>
                          <option value="canceled">Returned</option>
                        </select>
                      </div>
                    </div>
                    <hr />
                    <div className="px-3 pb-3">
                      <div className="modal-head">order details</div>
                      <div className="order-details my-3">
                        <div className="d-flex align-items-center justify-content-between mt-2">
                          <div className="d-flex align-items-center">
                            <div>
                              <img
                                src="https://static.vecteezy.com/system/resources/previews/047/826/370/non_2x/portable-blender-against-transparent-background-free-png.png"
                                alt=""
                                width={40}
                                height={40}
                              />
                            </div>
                            <div>Blender</div>
                          </div>
                          <div>2</div>
                          <div>$20</div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-2">
                          <div className="d-flex align-items-center">
                            <div>
                              <img
                                src="https://static.vecteezy.com/system/resources/previews/047/826/370/non_2x/portable-blender-against-transparent-background-free-png.png"
                                alt=""
                                width={40}
                                height={40}
                              />
                            </div>
                            <div>Blender</div>
                          </div>
                          <div>2</div>
                          <div>$20</div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-2">
                          <div className="d-flex align-items-center">
                            <div>
                              <img
                                src="https://static.vecteezy.com/system/resources/previews/047/826/370/non_2x/portable-blender-against-transparent-background-free-png.png"
                                alt=""
                                width={40}
                                height={40}
                              />
                            </div>
                            <div>Blender</div>
                          </div>
                          <div>2</div>
                          <div>$20</div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="modal-head px-3 pb-1 ">
                      shipping address
                    </div>
                    <div className="address px-4 pb-5">
                      <div>Country : Nigeria</div>
                      <div>Address : Lagos</div>
                      <div>State : Lagos</div>
                      <div>Postal Code : 123432</div>
                      <div>city : Benin</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Pagination */}
            </div>
            <div style={{ textAlign: "end" }}>{paginationButtons}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
