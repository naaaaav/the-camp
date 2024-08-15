import React from "react";
import ReactPaginate from "react-paginate";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import './PagingComponent.css';

const PagingComponent = ({ pageCount, onPageChange, currentPage }) => {
  //pageCount    : 총 페이지 수
  //onPageChange  : 클릭한 페이지
  //current Page : 현재페이지
  return (
    <ReactPaginate
      previousLabel={<FiChevronLeft />}
      nextLabel={<FiChevronRight />}
      pageCount={pageCount}
      onPageChange={onPageChange}
      containerClassName={"pagination"}
      pageLinkClassName={"pagination__link"}
      activeLinkClassName={"pagination__link__active"}
    />
  );
};

export default PagingComponent;