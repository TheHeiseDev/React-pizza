import React from "react";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

type PaginationProps = {
  onChangePage: (page: number) => void;
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage }) => {
  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
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
      />
    </>
  );
};

export default Pagination;
