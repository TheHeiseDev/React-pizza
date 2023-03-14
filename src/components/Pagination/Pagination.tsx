import { FC } from "react";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

interface IPaginationProps {
  onChangePage: (page: number) => void;
  currentPage: number;
}

const Pagination: FC<IPaginationProps> = ({ currentPage, onChangePage }) => {
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
