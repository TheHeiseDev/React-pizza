import { Sort, SortPropertyEnum } from "./redux/slices/filterSlice/typesFilter";

export const typeNames = ["тонкое", "традиционное"];
export const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];
export const sortList: Sort[] = [
  { name: "Популярности (Более)", sortProperty: SortPropertyEnum.RATING },
  { name: "Популярности (Менее)", sortProperty: SortPropertyEnum.RATING_ },
  { name: "Цене (Убыванию)", sortProperty: SortPropertyEnum.PRICE },
  { name: "Цене (Возрастанию)", sortProperty: SortPropertyEnum.PRICE_ },
  { name: "Алфавиту (А-Я)", sortProperty: SortPropertyEnum.TITLE },
  { name: "Алфавиту (Я-А)", sortProperty: SortPropertyEnum.TITLE_ },
];
