import React, { useState, useEffect } from "react";
import "./BlogPage.css"; // Optional: Add styles for better appearance
import { Link } from "react-router-dom";
import BreadCrumb from "../../Component/BreadCrumbs/BreadCrumb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import axios from "axios";
import Swal from "sweetalert2";
// Sample blog data

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlog] = useState([]);
  const [loader, setDeleteLoader] = useState(false);
  const itemsPerPage = 6;

  const getallBlog = async () => {
    try {
      setDeleteLoader(true);
      const response = await axios.get(
        "https://villyzstore.onrender.com/getallBlog"
      );
      setBlog(response.data.response);
      if (response) {
        Swal.fire({
          icon: "success",
          title: "blogs fetched successfully",
          timer: 3000,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "error fetching blog",
          timer: 3000,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
        timer: 3000,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
      });
    } finally {
      setDeleteLoader(false);
    }
  };
  useEffect(() => {
    getallBlog();
  }, []);
  // Calculate paginated blogs
  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleDelete = async (id) => {
    try {
      setDeleteLoader(true);
      const response = await axios.delete(
        `https://villyzstore.onrender.com/blog/delete/${id}`
      );

      if (response.data.success) {
        setBlog((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );

        Swal.fire({
          icon: "success",
          title: "blog deleted successfully",
          timer: 3000,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: response.data.message || "Error deleting blog",
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
    <div>
      <BreadCrumb name="blog" />
      <div className="blog-page">
        <div className="blogs-container mt-5">
          {loader ? (
            <div className="text-center">loading.....</div>
          ) : (
            paginatedBlogs.map((item) => (
              <div className="blog-item1" data-aos="fade-up">
                <div className="blog-image">
                  <img src={item.image} alt="" />
                </div>
                <div className="date mt-2">{item.BlogDate}</div>
                <div className="blog-content mt-2">{item.BlogTitle}</div>
                <div className="blog-icon">
                  <div className="d-flex align-items-center gap-2 mt-3">
                    <div
                      data-bs-toggle="modal"
                      data-bs-target={`#modal-${item._id}`}
                    >
                      <IoEyeOutline size={20} color="blue" />
                    </div>

                    <div
                      className="modal fade"
                      id={`modal-${item._id}`}
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      tabIndex="-1"
                      aria-labelledby={`modal-label-${item._id}`}
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id={`modal-label-${item._id}`}
                            >
                              {item._id}
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <div className="Blog-image">
                              <img src={item.image} alt="" />
                            </div>
                            <div className="Blog_title">{item.BlogTitle}</div>
                            <div className="Blog_date mt-3">
                              {item.BlogDate}
                            </div>
                            <div className="Blog_visibility mt-3">
                              {item.BlogVisibility}
                            </div>
                            <div
                              className="Blog_description mt-3"
                              dangerouslySetInnerHTML={{
                                __html: item.BlogDescription,
                              }}
                            ></div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <RiDeleteBin6Line
                        onClick={() => handleDelete(item._id)}
                        size={20}
                        color="red"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`pagination-btn ${
                currentPage === i + 1 ? "active" : ""
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
