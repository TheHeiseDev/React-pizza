import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

import React from "react";

function Pagination({ currentPage, onChangePage }) {
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    onChangePage(event.selected + 1);
  };
  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage - 1}
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default Pagination;
