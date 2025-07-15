import React, { useEffect, useState } from "react";
import SideBar from "../../Component/SideBar/SideBar";
import "./Landing.css";
import { FiPieChart, FiShoppingCart, FiUsers } from "react-icons/fi";
import { TfiPieChart } from "react-icons/tfi";
import { LuEye, LuUsers } from "react-icons/lu";
import { TbCurrencyDollar } from "react-icons/tb";
import { SlOptionsVertical } from "react-icons/sl";
import {
  PiCurrencyDollarSimple,
  PiDotsThreeVerticalBold,
} from "react-icons/pi";
import { IoIosAdd } from "react-icons/io";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  LineController,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  BarElement,
} from "chart.js";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import { MdAttachMoney } from "react-icons/md";
import { FaChevronUp, FaPaperclip } from "react-icons/fa6";
import Graph from "../../Component/Graph/Graph";
import { useNavigate } from "react-router-dom";
import Footer from "../../Component/footer/Footer";
import axios from "axios";
import Swal from "sweetalert2";
import img from "../../assets/images/alluring-distinguished-casual-man-in-a-t-shirt-and-jeans-with-transparent-background-free-png.webp";
import { CiMenuKebab, CiWallet } from "react-icons/ci";
import { HiOutlineTrash } from "react-icons/hi2";

// Register necessary chart components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  LineController,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  BarElement
);
const Landing = () => {
  const [product, setProduct] = useState([]);
  const [prod, setProd] = useState([]);
  const [user, setUser] = useState([]);
  const [loader, setLoader] = useState(false);
  const [Prodloader, setProdLoader] = useState(false);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const fetchProduct = async () => {
    setProdLoader(true);
    try {
      const fetchedProduct = await axios.get(
        "https://villyzstore.onrender.com/getallProducts"
      );
      if (fetchedProduct) {
        setProd(fetchedProduct.data.response);
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
      setProdLoader(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  const percentage = 78;

  const dataCircle = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ["#007bff", "#e0e0e0"],
        borderWidth: 0,
      },
    ],
  };

  const options2 = {
    rotation: -90, // start at the bottom
    circumference: 180, // half circle
    cutout: "70%", // inner radius (like thickness)
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
  };
  const data = {
    labels: ["", "", "", "", "", ""],
    datasets: [
      {
        data: [10, 20, 15, 30, 25, 35],
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,

        tension: 0,
        pointRadius: 2,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const optionsForChart = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          drawTicks: false,
          drawOnChartArea: true,
          color: "rgba(0, 0, 0, 0.1)",
          borderDash: [4, 4], // dotted vertical lines
        },
      },
      y: {
        display: false, // Hides y-axis line, ticks, labels
        grid: {
          display: false, // Hides grid lines
        },
      },
    },
  };

  const data2 = {
    labels: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    datasets: [
      {
        label: "Activity",
        data: [4, 8, 5, 5, 10, 6, 7], // Example values
        backgroundColor: (ctx) => {
          const index = ctx.dataIndex;
          return index === 4 ? "#6D5DFE" : "rgba(109, 93, 254, 0.1)"; // Friday highlighted
        },
        borderRadius: 8,
        barThickness: 24,
      },
    ],
  };

  const options3 = {
    responsive: true,
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#aaa", font: { size: 12 } },
      },
      y: {
        grid: { display: false },
        ticks: { display: false },
      },
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    scales: {
      x: {
        display: false, // Hide x-axis
      },
      y: {
        display: false, // Hide y-axis
      },
    },
  };
  const getallUser = async () => {
    try {
      setLoader(false);
      const response = await axios.get(
        "https://villyzstore.onrender.com/alluser"
      );
      if (response) {
        setUser(response.data.users);
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
  const [productData, setProductData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const toggleProductName = (itemId) => {
    setExpandedProductId(expandedProductId === itemId ? null : itemId);
  };

  const fetchOrders = async () => {
    setLoad(true);
    try {
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
      setLoad(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = productData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(productData.length / itemsPerPage);
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
    setLoad(true);
    try {
      const response = await axios.delete(
        `https://villyzstore.onrender.com/deleteOrder/${itemId}`
      );
      if (response) {
        alert.alert("order deleted successfully");
        fetchOrders();
      }
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete the item.",
      });
    } finally {
      setLoad(false);
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
      fetchOrders();
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };
  return (
    <div>
      <div className="congratulation-Container">
        <div>
          <div className="CongratulationText">Congratulation Villyz! 🎉</div>
          <div className="bestSeller">Best Seller of the month</div>
          <div className="SalesPrice">$48.6k</div>
          <button>View Sales</button>
        </div>
        <div>
          <img src={img} alt="image" />
        </div>
      </div>
      <div className="statistics">
        <div className="StatisticsHead">Statistics</div>
        <div className="Stat-container">
          <div className="Stats-Item">
            <div className="icons">
              <TfiPieChart size={20} />
            </div>
            <div>
              <div className="Stats-Amount">230k</div>
              <div className="Stat-name">Sales</div>
            </div>
          </div>
          <div className="Stats-Item">
            <div className="icons2">
              <LuUsers size={20} />
            </div>
            <div>
              <div className="Stats-Amount">5.94k</div>
              <div className="Stat-name">Customers</div>
            </div>
          </div>
          <div className="Stats-Item">
            <div className="icons3">
              <FiShoppingCart size={20} />
            </div>
            <div>
              <div className="Stats-Amount">1.432k</div>
              <div className="Stat-name">Products</div>
            </div>
          </div>
          <div className="Stats-Item">
            <div className="icons4">
              <TbCurrencyDollar size={24} />
            </div>
            <div>
              <div className="Stats-Amount">
                <TbCurrencyDollar />
                11432
              </div>
              <div className="Stat-name">Revenue</div>
            </div>
          </div>
        </div>
      </div>

      <div className="Section-Container">
        <div className="Profit-Container">
          <div>
            <div className="profit-head">Profit</div>
            <div className="profit-SecondContent">Last-Month</div>
          </div>
          <div>
            <div>
              <div
                style={{ width: "100%", height: "120px", position: "relative" }}
              >
                <Line
                  data={data}
                  options={optionsForChart}
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between mt-">
              <div className="Profit-Price">624k</div>
              <div className="Profit-Percentage">+8.24%</div>
            </div>
          </div>
        </div>
        <div className="Expenses-Container">
          <div>
            <div className="Expenses-head">Profit</div>
            <div className="Expenses-SecondContent">Last-Month</div>
          </div>
          <div className="Circle-Cont">
            <div
              style={{
                position: "relative",
                width: 100,
                height: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Doughnut data={dataCircle} options={options2} />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -30%)",
                  fontSize: "20px",
                  fontWeight: "bold",
                  fontFamily: "publicRegular",
                }}
              >
                {percentage}%
              </div>
              <div className="Expenses-small-text">
                $27k Expenses more than last month
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Section-Container">
        <div className="Earning-Reports">
          <div className="d-flex align-items-center justify-content-between w-100">
            <div>
              <div className="Earning-Reports-head">Earning Reports</div>
              <div className="Earning-Reports-SecondContent">
                Weekly Earnings Overview
              </div>
            </div>
            <div className="bar">
              <SlOptionsVertical />
            </div>
          </div>
          <div className="mt-4 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <div className="Earning-Icons1">
                <FiPieChart color="purple" size={20} />
              </div>
              <div>
                <div className="Profit">Net Profit</div>
                <div className="Profit-price">12.4k</div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div className="Earning-Price">$1.432k</div>
              <div className="Earning-Percentage">
                <FaChevronUp color="rgb(43 200 113)" /> 18.6%
              </div>
            </div>
          </div>
          <div className="mt-4 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <div className="Earning-Icons2">
                <PiCurrencyDollarSimple color="rgb(77 209 136)" size={20} />
              </div>
              <div>
                <div className="Profit">Total Income</div>
                <div className="Profit-price">Sales,Affilation</div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div className="Earning-Price">$3,517k</div>
              <div className="Earning-Percentage">
                <FaChevronUp color="rgb(43 200 113)" /> 12.1%
              </div>
            </div>
          </div>
          <div className="mt-4 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <div className="Earning-Icons3">
                <CiWallet color="rgb(154 157 167)" size={20} />
              </div>
              <div>
                <div className="Profit">Wallet</div>
                <div className="Profit-price">Total Wallet</div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div className="Earning-Price">$7,432k</div>
              <div className="Earning-Percentage">
                <FaChevronUp color="rgb(43 200 113)" /> 15.6%
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Bar data={data2} options={options3} />
          </div>
        </div>
        <div className="Popular-Product">
          <div className="d-flex align-items-center justify-content-between w-100">
            <div>
              <div className="Popular-Product-head">Earning Reports</div>
              <div className="Popular-Product-SecondContent">
                Weekly Earnings Overview
              </div>
            </div>
            <div className="bar">
              <SlOptionsVertical />
            </div>
          </div>
          <div className="mt-2">
            {Prodloader ? (
              <div className="loading-text">loading....</div>
            ) : (
              prod.slice(0, 6).map((item) => {
                return (
                  <div className="d-flex align-items-center justify-content-between mt-3">
                    <div className="d-flex align-items-center gap-4">
                      <div>
                        <img src={item.image} alt="" width={40} height={50} />
                      </div>
                      <div>
                        <div className="Product-Name">
                          {item.productName.slice(0, 20)}...
                        </div>
                        <div className="product-ID">
                          item : FXY {item._id.slice(0, 4)}
                        </div>
                      </div>
                    </div>
                    <div className="Product-price">${item.newPrice}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <div className="Orders-container">
        <div className="order-head">
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex gap-2 align-items-center">
              <div className="Show-btn">Show</div>
              <div>
                <select name="" className="form-select" id="">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
            </div>
            <button className="order-button">
              <IoIosAdd size={22} />
              Show all Orders
            </button>
          </div>
          <div className="d-flex gap-3 align-items-center">
            <select name="" className="form-select p-2" id="">
              <option value="">Status</option>
              <option value="">Shipped</option>
              <option value="">Delivered</option>
              <option value="">Canceled</option>
              <option value="">Processing</option>
            </select>
            <div>
              <input
                type="text"
                className="form-control order-form"
                name=""
                placeholder="search by orderID"
                id=""
              />
            </div>
          </div>
        </div>
        <div>
          <div className="table-container ">
            <table>
              <thead>
                <tr className="table-head">
                  <th className="check-container">
                    <input type="checkbox" />
                  </th>
                  <th>#</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th className="table-Date">Issue Date</th>
                  <th>Delivery</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {load ? (
                  <p className="loading-text">loading....</p>
                ) : (
                  currentProducts.map((product) => (
                    <tr>
                      <td className="check-container">
                        <input type="checkbox" />
                      </td>
                      <td className="OrderCode">
                        #FX{product._id.slice(0, 5)}
                      </td>
                      <td>
                        <div
                          className={
                            product.orderStatus === "Processing"
                              ? "table-Status-pending"
                              : product.orderStatus === "Cancelled"
                              ? "table-Status-Cancelled"
                              : "table-Status"
                          }
                        >
                          {product.orderStatus}
                        </div>
                      </td>
                      <td className="table-text">${product.OrderPrice}</td>
                      <td className="table-Date">
                        {product.date.slice(0, 10)}
                      </td>
                      <td className="table-text">${product.DeliveryFee}</td>
                      <td>
                        <div className="d-flex align-items-center ">
                          <div
                            className="eye-container"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            onClick={() => setSelectedOrder(product)}
                          >
                            <LuEye className="icon-Eye" />
                          </div>
                          <div
                            className="icon-Trash-container"
                            onClick={() => handleDelete(product._id)}
                          >
                            <HiOutlineTrash className="icon-Trash" />
                          </div>
                          <div className="icon-DOts-container">
                            <PiDotsThreeVerticalBold className="icon-DOts" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
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
                  <p className="loading-text">Loading....</p>
                )}
              </div>
            </div>
          </div>
        </div>
        {load ? null : (
          <div style={{ textAlign: "end" }}>{paginationButtons}</div>
        )}
      </div>
    </div>
  );
};

export default Landing;
