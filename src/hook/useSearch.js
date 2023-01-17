import { useContext } from "react";
import AppContext from "../context";

export const useSearch = () => {
  const { searchValue, setSearchValue } = useContext(AppContext);

  return { searchValue, setSearchValue };
};
