import React from "react";
import styles from "./Search.module.scss";
import searchSVG from "../../assets/img/search.svg";
import removeSVG from "../../assets/img/btn-remove.svg";

import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice/filterSlice";
import debounce from "../../utils/debounce";

const Search: React.FC = () => {
  const dispatch = useDispatch();

  // Responsible for the fast display of input data (search value)
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  // When press the clear button, the focus stays on the input
  const onClickClear = () => {
    setValue("");
    dispatch(setSearchValue(""));

    inputRef.current?.focus();
  };

  // Loading delay when searching, search is performed (500 ms) after input is paused
  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 500),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  React.useEffect(() => {
    return () => {
      setValue("");
      dispatch(setSearchValue(""));
    };
  }, []);

  return (
    <div className={styles.searchBlock}>
      <img src={searchSVG} alt="Search" />
      <input
        className="111"
        ref={inputRef}
        type="text"
        placeholder="Поиск пиццы..."
        value={value}
        onChange={onChangeInput}
      />
      {value && (
        <img
          className={styles.clear}
          src={removeSVG}
          alt="remove"
          onClick={onClickClear}
        />
      )}
    </div>
  );
};

export default Search;
