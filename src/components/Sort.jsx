import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleTypeSort } from "../redux/slices/filterSlice";

export const sortList = [
  { name: "Популярности (Более)", sortProperty: "rating" },
  { name: "Популярности (Менее)", sortProperty: "-rating" },
  { name: "Цене (Убыванию)", sortProperty: "price" },
  { name: "Цене (Возрастанию)", sortProperty: "-price" },
  { name: "Алфавиту (А-Я)", sortProperty: "title" },
  { name: "Алфавиту (Я-А)", sortProperty: "-title" },
];

function SortMemo() {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filter.sort);
  const sortRef = useRef();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handleClickEvent = (event) => {
      let path = event.composedPath().includes(sortRef.current);
      if (!path) {
        setOpen(false);
      }
    };
    const handleKeyEvent = (event) => {
      let path = event.composedPath().includes(sortRef.current);
      if (event.code === "Escape") {
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

  const handleSort = () => {
    setOpen((prev) => !prev);
  };
  const onClicksortListItem = (obj) => {
    dispatch(handleTypeSort(obj));

    setOpen(false);
  };

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
                className={
                  sort.sortProperty === obj.sortProperty ? "active" : ""
                }
                onClick={() => onClicksortListItem(obj)}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export const Sort = React.memo(SortMemo);
