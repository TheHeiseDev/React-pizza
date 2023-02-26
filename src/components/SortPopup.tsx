import React from "react";
import { useDispatch } from "react-redux";
import { sortList } from "../data";
import { handleTypeSort } from "../redux/slices/filterSlice/filterSlice";
import { Sort } from "../redux/slices/filterSlice/typesFilter";

type SortPopupProps = {
  sort: Sort;
};

const SortPopup: React.FC<SortPopupProps> = React.memo(({ sort }) => {
  const dispatch = useDispatch();

  const sortRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);

  const onClickSortListItem = (obj: Sort) => {
    dispatch(handleTypeSort(obj));
    setOpen(false);
  };

  const handleSort = () => {
    setOpen((prev) => !prev);
  };

  React.useEffect(() => {
    const handleClickEvent = (event: MouseEvent) => {
      const path = sortRef.current && event.composedPath().includes(sortRef.current);
      if (!path) {
        setOpen(false);
      }
    };

    const handleKeyEvent = (event: KeyboardEvent) => {
      let path = sortRef.current && event.composedPath().includes(sortRef.current);
      if (event.key === "Escape") {
        if (!path) {
          setOpen(false);
        }
      }
    };
    document.body.addEventListener("click", handleClickEvent);
    document.body.addEventListener("keydown", handleKeyEvent);

    return () => {
      document.body.removeEventListener("click", handleClickEvent);

      document.body.removeEventListener("keydown", handleKeyEvent);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={handleSort}>{sort.name}</span>
      </div>

      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj) => (
              <li
                key={obj.sortProperty}
                onClick={() => onClickSortListItem(obj)}
                className={sort.sortProperty === obj.sortProperty ? "active" : ""}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default SortPopup;
