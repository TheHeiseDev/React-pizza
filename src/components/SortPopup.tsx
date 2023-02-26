import React from "react";
import { useDispatch } from "react-redux";
import { sortList } from "../data";
import { handleTypeSort } from "../redux/slices/filterSlice/filterSlice";
import { Sort } from "../redux/slices/filterSlice/typesFilter";
import SvgTriangle from "./IconComponents/SvgTriangle";

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
        <SvgTriangle />
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
