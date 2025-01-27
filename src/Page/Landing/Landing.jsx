import React from "react";
import SideBar from "../../Component/SideBar/SideBar";
import "./Landing.css";
import { Line } from "react-chartjs-2";
import { FiUsers } from "react-icons/fi";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
} from "chart.js";
import { MdAttachMoney } from "react-icons/md";
import { FaPaperclip } from "react-icons/fa6";
import Graph from "../../Component/Graph/Graph";
import { useNavigate } from "react-router-dom";
import Footer from "../../Component/footer/Footer";
// Register necessary chart components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip
);
const Landing = () => {
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
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [10, 20, 15, 30, 25, 35],
        fill: true, // Enable the background fill
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Background below the line
        borderColor: "rgba(75, 192, 192, 1)", // Line color
        borderWidth: 2,
        tension: 0.4, // Smooth curves
        pointRadius: 3, // Small dots on data points
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };
  const data2 = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [10, 20, 15, 30, 25, 35],
        fill: true, // Enable the background fill
        backgroundColor: "#ff520029", // Background below the line
        borderColor: "#ff5200", // Line color
        borderWidth: 2,
        tension: 0.4, // Smooth curves
        pointRadius: 3, // Small dots on data points
        pointBackgroundColor: "#ff5200",
      },
    ],
  };
  const data3 = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [10, 20, 15, 30, 25, 35],
        fill: true, // Enable the background fill
        backgroundColor: "rgba(88, 88, 88, 0.2)", // Background below the line
        borderColor: "rgba(61, 61, 61, 0.14)", // Line color
        borderWidth: 2,
        tension: 0.4, // Smooth curves
        pointRadius: 3, // Small dots on data points
        pointBackgroundColor: "rgba(88, 88, 88, 0.2)",
      },
    ],
  };
  const data4 = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [10, 20, 15, 30, 25, 35],
        fill: true, // Enable the background fill
        borderColor: "#2377fc", // Background below the line
        backgroundColor: "#cee1fe", // Line color
        borderWidth: 2,
        tension: 0.4, // Smooth curves
        pointRadius: 3, // Small dots on data points
        pointBackgroundColor: "#2377fc",
      },
    ],
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

  return (
    <div>
      <div className="body-container">
        <div className="container-fluid recent">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="info-container shadow-sm">
                <div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <div className="info-icn">
                        <img
                          src="data:image/png;base64,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"
                          alt="benzene-ring"
                        ></img>
                        <div className="info-img">
                          <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAVklEQVR4nO2WSQoAMAgD8/8/p+kPShfBKhnwIgiDCwgYs4BDigiUF0BSPVIFGNT+awn+IoBHLMDoETAoX1+Am9veT+AUC9AjGF5C+QxV+yFh9mds2jMBUg5KYs4SBnAAAAAASUVORK5CYII="
                            alt="shopping-bag"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="total">Total sales</div>
                        <div className="price">$34,500</div>
                      </div>
                    </div>
                    <div className="chart">
                      <img
                        width="20"
                        height="20"
                        src="https://img.icons8.com/cotton/50/chart-arrow-descent.png"
                        alt="chart-arrow-descent"
                      />
                      -1.56%
                    </div>
                  </div>
                </div>
                <div className="">
                  <div style={{ width: "100%", height: "70px" }}>
                    <Line data={data} options={options} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="info-container shadow-sm">
                <div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <div className="info-icn">
                        <img
                          src="data:image/png;base64,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"
                          alt="benzene-ring"
                        ></img>
                        <div className="info-img">
                          <MdAttachMoney
                            size={30}
                            color="white"
                            className="img"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="total">Total Income</div>
                        <div className="price">$37,500</div>
                      </div>
                    </div>
                    <div className="chart">
                      <img
                        width="20"
                        height="20"
                        src="https://img.icons8.com/cotton/50/chart-arrow-descent.png"
                        alt="chart-arrow-descent"
                      />
                      -1.56%
                    </div>
                  </div>
                </div>
                <div className="">
                  <div style={{ width: "100%", height: "70px" }}>
                    <Line data={data2} options={options} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="info-container shadow-sm">
                <div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <div className="info-icn">
                        <img
                          src="data:image/png;base64,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"
                          alt="benzene-ring"
                        ></img>
                        <div className="info-img">
                          <FaPaperclip
                            color="white"
                            size={30}
                            className="img"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="total">orders paid</div>
                        <div className="price">$39,500</div>
                      </div>
                    </div>
                    <div className="chart">
                      <img
                        width="20"
                        height="20"
                        src="https://img.icons8.com/cotton/50/chart-arrow-descent.png"
                        alt="chart-arrow-descent"
                      />
                      -1.56%
                    </div>
                  </div>
                </div>
                <div className="">
                  <div style={{ width: "100%", height: "70px" }}>
                    <Line data={data3} options={options} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="info-container shadow-sm">
                <div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <div className="info-icn">
                        <img
                          src="data:image/png;base64,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"
                          alt="benzene-ring"
                        ></img>
                        <div className="info-img">
                          <FiUsers size={30} className="img" color="white" />
                        </div>
                      </div>
                      <div>
                        <div className="total">Total Customer</div>
                        <div className="price">34,500</div>
                      </div>
                    </div>
                    <div className="chart">
                      <img
                        width="20"
                        height="20"
                        src="https://img.icons8.com/cotton/50/chart-arrow-descent.png"
                        alt="chart-arrow-descent"
                      />
                      -1.56%
                    </div>
                  </div>
                </div>
                <div className="">
                  <div style={{ width: "100%", height: "70px" }}>
                    <Line data={data4} options={options} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="recent-order-graph shadow-sm p-5">
            <div className="recent-header">Recent Order</div>
            <Graph />
          </div>
        </div>
        <div className="px-3">
          <div className="row">
            <div className="col-md-5 col-sm-12 mt-3">
              <div className="recent-Users shadow-sm">
                <div className="recent-order-head">Recent Users</div>{" "}
                <table>
                  <thead>
                    <tr className="tableHead">
                      <th>user</th>
                      <th>Phone number</th>
                      <th>email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productData.length > 0 ? (
                      productData.slice(0, 3).map((product) => (
                        <tr key={product.id}>
                          <td onClick={() => navigate("/user")}>
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
              </div>
            </div>
            <div className="col-md-7 col-sm-12 mt-3">
              <div className="recent-Users shadow-sm">
                <div className="recent-order-head">Recent Product</div>
                <table>
                  <thead>
                    <tr className="tableHead">
                      <th>Product</th>
                      <th>Product ID</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productData.length > 0 ? (
                      productData.slice(0, 3).map((product) => (
                        <tr key={product.id}>
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate("/product")}
                          >
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
                          <td>{product.price}</td>
                          <td>
                            <div
                              className={
                                product.stock === "out of stock" ? "out" : "in"
                              }
                            >
                              {product.stock}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
