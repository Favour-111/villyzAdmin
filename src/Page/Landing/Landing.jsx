import React, { useEffect, useState } from "react";
import SideBar from "../../Component/SideBar/SideBar";
import "./Landing.css";
import { FiPieChart, FiShoppingCart, FiUsers } from "react-icons/fi";
import { TfiPieChart } from "react-icons/tfi";
import { LuUsers } from "react-icons/lu";
import { TbCurrencyDollar } from "react-icons/tb";
import { SlOptionsVertical } from "react-icons/sl";
import { PiCurrencyDollarSimple } from "react-icons/pi";
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
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      setLoader(true);
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
      setLoader(false);
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
                  fontFamily: "PoppinsMedium",
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
            {prod.slice(0, 6).map((item) => {
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
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
