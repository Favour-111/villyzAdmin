import React, { useState, useRef, useEffect } from "react";
import "./SideBar.css";
import { Link, useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { AiOutlineAppstoreAdd, AiOutlineProduct } from "react-icons/ai";
import { LiaOpencart } from "react-icons/lia";
import { FaBlogger, FaUser } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { HiOutlineBellAlert } from "react-icons/hi2";
import {
  RiArrowDropDownLine,
  RiMenuFold2Line,
  RiMenuUnfold2Line,
} from "react-icons/ri";
import { FiMenu, FiX } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";

const SideBar = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("dashboard");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [dropdownOpen3, setDropdownOpen3] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setDropdownOpen2(false);
    setDropdownOpen3(false);
  };

  const toggleDropdown2 = () => {
    setDropdownOpen2(!dropdownOpen2);
    setDropdownOpen(false);
    setDropdownOpen3(false);
  };

  const toggleDropdown3 = () => {
    setDropdownOpen3(!dropdownOpen3);
    setDropdownOpen(false);
    setDropdownOpen2(false);
  };

  // Close sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setNavOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Top Bar */}
      <div className="topBar">
        <div className="d-flex align-items-center justify-content-between welcome-cont">
          <div className="">
            <div onClick={() => setNavOpen(true)}>
              <FiMenu size={20} />
            </div>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhY7_AHwrCyQgYQsj2ZWkKABdQz3Hb9asuUg&s"
                width={25}
                height={15}
                alt="flag"
              />
            </div>
            <div>
              <IoSunnyOutline size={20} />
            </div>
            <div>
              <AiOutlineAppstoreAdd size={20} />
            </div>
            <div className="NotificationBell">
              <HiOutlineBellAlert size={20} />
              <div className="ActiveNotification"></div>
            </div>
            <div className="Profile-Image">
              <img
                src="https://www.transparentpng.com/thumb/man/vkarWM-download-man-png-image-png-image-freepngimg.png"
                width={25}
                height={25}
                alt="admin"
              />
              <div className="Active"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`sidebar-container shadow ${
          navOpen ? "sidebarActive" : "sidebarInactive"
        }`}
        ref={sidebarRef}
      >
        <div className="p-4">
          <div className="sidebar-header d-flex align-items-center justify-content-between">
            <div>
              Vill<span>yz</span>
            </div>
            <div onClick={() => setNavOpen(false)}>
              <FiX size={20} />
            </div>
          </div>
          <div className="nav-content">
            <small>Menu</small>
            <ul className="unorderedList1">
              <li
                className={
                  activeLink === "dashboard" ? "Link-active" : "link-inactive"
                }
                onClick={() => {
                  handleLinkClick("dashboard");
                  navigate("/page");
                  window.scrollTo(0, 0);
                }}
              >
                <Link
                  className={activeLink === "dashboard" ? "Link-Open" : "Link"}
                  to="/page"
                >
                  <div className="d-flex align-items-center gap-2 actionIcons">
                    <GoHome size={15} />
                    <div>Dashboard</div>
                  </div>
                </Link>
              </li>
            </ul>

            <div className="sm-2">Menu</div>
            <ul className="unorderedList2">
              {/* Product Dropdown */}
              <li className="list">
                <div
                  className={
                    activeLink === "product" ? "Link-active" : "link-inactive"
                  }
                  onClick={() => {
                    handleLinkClick("product");
                    toggleDropdown();
                  }}
                >
                  <div className="LinkInActive w-100">
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <div className="d-flex align-items-center gap-2 actionIcons">
                        <AiOutlineProduct size={15} />
                        <div>Product</div>
                      </div>
                      <div>
                        <RiArrowDropDownLine
                          size={20}
                          className={`dropdownIcn ${
                            dropdownOpen
                              ? "dropdownOpenIcn"
                              : "dropdownInActiveIcn"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <ul
                  className={`dropdown ${
                    dropdownOpen ? "dropdownOpen" : "dropdownInActive"
                  }`}
                >
                  <li onClick={() => navigate("/product")}>Product List</li>
                  <li onClick={() => navigate("/productadd")}>Add Product</li>
                </ul>
              </li>

              {/* Category Dropdown */}
              {/* <li className="list">
                <div
                  className={
                    activeLink === "category" ? "Link-active" : "link-inactive"
                  }
                  onClick={() => {
                    handleLinkClick("category");
                    toggleDropdown2();
                  }}
                >
                  <div className="LinkInActive w-100">
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <div className="d-flex align-items-center gap-2 actionIcons">
                        <AiOutlineProduct size={15} />
                        <div>Category</div>
                      </div>
                      <div>
                        <RiArrowDropDownLine
                          size={20}
                          className={`dropdownIcn ${
                            dropdownOpen2
                              ? "dropdownOpenIcn"
                              : "dropdownInActiveIcn"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <ul
                  className={`dropdown ${
                    dropdownOpen2 ? "dropdownOpen" : "dropdownInActive"
                  }`}
                >
                  <li onClick={() => navigate("/category")}>Category List</li>
                  <li onClick={() => navigate("/categoryadd")}>Add Category</li>
                </ul>
              </li> */}

              {/* Orders */}
              <li
                className={
                  activeLink === "category" ? "Link-active" : "link-inactive"
                }
                onClick={() => {
                  handleLinkClick("category");
                  navigate("/category");
                  window.scrollTo(0, 0);
                }}
              >
                <Link className="LinkInActive">
                  <div className="d-flex align-items-center gap-2 actionIcons">
                    <AiOutlineProduct size={15} />
                    <div>Category</div>
                  </div>
                </Link>
              </li>
              <li
                className={
                  activeLink === "orders" ? "Link-active" : "link-inactive"
                }
                onClick={() => {
                  handleLinkClick("orders");
                  navigate("/orders");
                  window.scrollTo(0, 0);
                }}
              >
                <Link className="LinkInActive">
                  <div className="d-flex align-items-center gap-2 actionIcons">
                    <LiaOpencart size={15} />
                    <div>Orders</div>
                  </div>
                </Link>
              </li>
              {/* Delivery */}
              <li
                className={
                  activeLink === "fee" ? "Link-active" : "link-inactive"
                }
                onClick={() => {
                  handleLinkClick("fee");
                  navigate("/fee");
                  window.scrollTo(0, 0);
                }}
              >
                <Link className="LinkInActive">
                  <div className="d-flex align-items-center gap-2 actionIcons">
                    <MdOutlineDeliveryDining size={15} />
                    <div>delivery</div>
                  </div>
                </Link>
              </li>

              {/* Users */}
              <li
                className={
                  activeLink === "users" ? "Link-active" : "link-inactive"
                }
                onClick={() => {
                  handleLinkClick("users");
                  navigate("/user");
                  window.scrollTo(0, 0);
                }}
              >
                <Link className="LinkInActive">
                  <div className="d-flex align-items-center gap-2 actionIcons">
                    <FaUser size={15} />
                    <div>Users</div>
                  </div>
                </Link>
              </li>

              {/* Blogs Dropdown */}
              <li className="list">
                <div
                  className={
                    activeLink === "blogs" ? "Link-active" : "link-inactive"
                  }
                  onClick={() => {
                    handleLinkClick("blogs");
                    toggleDropdown3();
                  }}
                >
                  <div className="LinkInActive w-100">
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <div className="d-flex align-items-center gap-2 actionIcons">
                        <FaBlogger size={15} />
                        <div>Blogs</div>
                      </div>
                      <div>
                        <RiArrowDropDownLine
                          size={20}
                          className={`dropdownIcn ${
                            dropdownOpen3
                              ? "dropdownOpenIcn"
                              : "dropdownInActiveIcn"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <ul
                  className={`dropdown ${
                    dropdownOpen3 ? "dropdownOpen" : "dropdownInActive"
                  }`}
                >
                  <li onClick={() => navigate("/blogs")}>Blog List</li>
                  <li onClick={() => navigate("/addblog")}>Add Blog</li>
                </ul>
              </li>
            </ul>

            <div className="sm-2">Settings</div>
            <ul className="unorderedList2">
              <li
                className="link-inactive"
                onClick={() => {
                  navigate("/logout");
                }}
              >
                <Link className="LinkInActive">
                  <div className="d-flex align-items-center gap-2 actionIcons">
                    <CiLogout size={15} />
                    <div>Logout</div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
