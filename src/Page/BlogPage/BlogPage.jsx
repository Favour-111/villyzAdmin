import React, { useState, useEffect } from "react";
import "./BlogPage.css"; // Optional: Add styles for better appearance
import { Link } from "react-router-dom";
import blogs from "../../blog";
import BreadCrumb from "../../Component/BreadCrumbs/BreadCrumb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
// Sample blog data

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  return (
    <div>
      <BreadCrumb name="blog" />
      <div className="blog-page">
        <div className="blogs-container mt-5">
          {paginatedBlogs.map((item) => (
            <div className="blog-item1" data-aos="fade-up">
              <div className="blog-image">
                <img src={item.imageUrl} alt="" />
              </div>
              <div className="date mt-2">{item.date}</div>
              <div className="blog-content mt-2">{item.title}</div>
              <div className="blog-icon">
                <div className="d-flex align-items-center gap-2 mt-3">
                  <div>
                    <IoEyeOutline size={20} color="blue" />
                  </div>
                  <div>
                    <CiEdit size={20} color="green" />
                  </div>
                  <div>
                    <RiDeleteBin6Line size={20} color="red" />
                  </div>
                </div>
              </div>
            </div>
          ))}
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
