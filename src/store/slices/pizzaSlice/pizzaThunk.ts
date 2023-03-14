// fetchPizzas<first, second> - The first type is the return type, the second type is the input
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../API/serviceApi";
import { Pizza, SearchPizzaParams } from "./typesPizza";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetchPizzas",
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `${API_URL}?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
    );

    return data;
  }
);
