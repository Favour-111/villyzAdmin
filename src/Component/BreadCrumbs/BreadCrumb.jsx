import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import "./BreadCrumb.css";
const BreadCrumb = ({ name }) => {
  return (
    <div>
      <div className="breadcrumb">
        <div className="breadCrumbs p-3">{name}</div>
        <div className="bread-crumb-content">
          <div>DashBoard</div>
          <div>
            <MdKeyboardArrowRight />
          </div>
          <div>Ecommerce</div>
          <div>
            <MdKeyboardArrowRight />
          </div>
          <div className="content-crumb">{name}</div>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumb;
