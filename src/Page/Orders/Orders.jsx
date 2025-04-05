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
import axios from "axios";
import { useEffect } from "react";
const Orders = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [expandedProductId, setExpandedProductId] = useState(null);
  const toggleProductName = (itemId) => {
    setExpandedProductId(expandedProductId === itemId ? null : itemId);
  };

  const fetchOrders = async () => {
    try {
      setLoader(true);
      const response = await axios.get(
        "https://villyzstore.onrender.com/allOrders"
      );
      console.log(response);

      if (response) {
        setProductData(response.data);
      } else {
        alert("Error fetching orders");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchOrders();
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
  const handleDelete = async (itemId) => {
    try {
      const response = await axios.delete(
        `https://villyzstore.onrender.com/deleteOrder/${itemId}`
      );
      if (response) {
        alert.alert("order deleted successfully");
      }
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete the item.",
      });
    }
  };
  const [orderStatus, setOrderStatus] = useState("");
  useEffect(() => {
    if (selectedOrder) {
      setOrderStatus(selectedOrder.orderStatus || "Processing");
    }
  }, [selectedOrder]);

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    console.log("Selected Status:", newStatus); // Debugging log

    setOrderStatus(newStatus);

    if (!selectedOrder) return;

    try {
      const response = await fetch(
        `https://villyzstore.onrender.com/updateOrderStatus/${selectedOrder._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderStatus: newStatus }),
        }
      );

      const data = await response.json();
      console.log("Backend Response:", data); // Debugging log

      if (!response.ok) throw new Error("Failed to update order status");

      setSelectedOrder((prev) => ({ ...prev, orderStatus: newStatus }));
      alert("Order status updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

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
              <table className="table2">
                <thead>
                  <tr className="tableHead">
                    <th>order ID</th>
                    <th>Created at</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>OrderStatus</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                      <tr key={product.id}>
                        <td>{product._id}</td>
                        <td>{product.date}</td>
                        <td>{product.name}</td>
                        <td>{product.OrderPrice}</td>
                        <td>
                          <div
                            className={
                              product.orderStatus === "process" ? "in" : "out"
                            }
                          >
                            {product.orderStatus}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2 actionIcons">
                            <div
                              class="EyeIcn"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop"
                              onClick={() => setSelectedOrder(product)}
                            >
                              <IoEyeOutline size={20} color="blue" />
                            </div>

                            <div
                              className="DeleteIcn"
                              onClick={() => handleDelete(product._id)}
                            >
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
                  {selectedOrder ? (
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
                      <div className="modal-body">
                        <>
                          <div className="d-flex align-items-center justify-content-between mt-3">
                            <div>Customer name</div>
                            <div>{selectedOrder.name}</div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mt-3">
                            <div>Customer ID</div>
                            <div>{selectedOrder.UserID}</div>
                          </div>

                          <div className="d-flex align-items-center justify-content-between mt-3">
                            <div>Order ID</div>
                            <div>{selectedOrder._id}</div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mt-3">
                            <div>Order date</div>
                            <div>{selectedOrder.date}</div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mt-3">
                            <div>Payment Reference</div>
                            <div>{selectedOrder.paymentReference}</div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mt-3">
                            <div>Order price</div>
                            <div>${selectedOrder.OrderPrice}</div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mt-3">
                            <div>Delivery Fee</div>
                            <div>${selectedOrder.DeliveryFee}</div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mt-3">
                            <div>Payment method</div>
                            <div>Card</div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mt-3">
                            <div>Payment status</div>
                            <div
                              className={
                                selectedOrder.PaymentStatus === "Paid"
                                  ? "success"
                                  : "pending"
                              }
                            >
                              {selectedOrder.orderStatus}
                            </div>
                          </div>
                          <select
                            id="status"
                            value={orderStatus}
                            onChange={handleStatusChange}
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipping">Shipping</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <div className="d-flex align-items-center justify-content-between mt-3">
                            <div>Order status</div>
                            <div className="text-danger">
                              {selectedOrder.orderStatus}
                            </div>
                          </div>
                        </>
                      </div>

                      <hr />
                      <div className="px-3 pb-3">
                        <div className="modal-head">order details</div>
                        <div className="order-details my-3">
                          {selectedOrder.Orders.map((item) => {
                            return (
                              <div>
                                <div className="d-flex align-items-center">
                                  <div>
                                    <img
                                      src={item.image}
                                      alt=""
                                      width={40}
                                      height={40}
                                    />
                                  </div>
                                  <div>
                                    {expandedProductId === item._id
                                      ? item.name
                                      : item.name.length > 15
                                      ? `${item.name.slice(0, 15)}...`
                                      : item.name}
                                    {item.name.length > 15 && (
                                      <span
                                        onClick={() =>
                                          toggleProductName(item._id)
                                        }
                                        style={{
                                          color: "blue",
                                          cursor: "pointer",
                                          marginLeft: "5px",
                                        }}
                                      >
                                        {expandedProductId === item._id
                                          ? "Read less"
                                          : "Read more"}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <hr />
                                <div className="mt-2 ms-2">
                                  Quantity : {item.quantity}
                                </div>
                                <hr />
                                <div className="mt-2 ms-2 mb-1">
                                  Price:${item.price}
                                </div>
                                <hr />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <hr />
                      <div className="modal-head px-3 pb-1 ">
                        shipping address
                      </div>
                      <div className="address px-4 pb-5">
                        <div>Country : {selectedOrder.country}</div>
                        <div>Address :{selectedOrder.street}</div>
                        <div>State : {selectedOrder.state}</div>
                        <div>Postal Code : {selectedOrder.postalCode}</div>
                        <div>city : {selectedOrder.city}</div>
                      </div>
                    </div>
                  ) : (
                    <p>Loading...</p>
                  )}
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
