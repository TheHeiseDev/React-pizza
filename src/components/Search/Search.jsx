import React from "react";
import styles from "./Search.module.scss";
import searchSVG from "../../assets/img/search.svg";
import removeSVG from "../../assets/img/btn-remove.svg";
import { useSearch } from "../../hook/useSearch";
import debounce from "lodash.debounce";

function Search() {
  const inputRef = React.useRef();
  // Responsible for the fast display of input data
  const [value, setValue] = React.useState("");

  // Responsible for sending the input data from the input
  const { setSearchValue } = useSearch();

  // When you press the clear button, the focus stays on the input
  const onClickClear = () => {
    setSearchValue("");
    setValue("");
    inputRef.current.focus();
  };

  // Loading delay when searching, search is performed (500 ms) after input is paused
  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 500),
    []
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

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
}

export default Search;
