import "./styles.css";
import fetchCountries from "./api";
import debaunce from "lodash.debounce";
import list from "./tamplates/list.hbs";
import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import listItem from "./tamplates/list_item.hbs";

const url = "https://restcountries.eu/rest/v2";

const refs = {
  input: document.querySelector('[data-action="seacher"]'),
  list: document.querySelector('[data-action="list"]'),
};

refs.input.addEventListener("input", debaunce(handleInputSearch, 600));
refs.input.addEventListener("change", handleInputChange);

function handleInputSearch() {
  refs.list.innerHTML = "";
  const searchQuery = refs.input.value;
  if (searchQuery === "") {
    return;
  }
  fetchCountries(url, searchQuery).then((response) => {
    console.log(response.data);
    if (response.data.length === 1) {
      createMarkupFromItem(response.data);
    } else {
      createMarkupFromList(response.data);
    }
  });
}

function handleInputChange(evt) {
  evt.currentTarget.value = "";
}

function createMarkupFromList(items) {
  if (items.length > 10) {
    error("Too many matches found. Please enter a more specific query");
    return;
  }
  const markup = list(items);
  refs.list.insertAdjacentHTML("beforeend", markup);
}

function createMarkupFromItem(items) {
  const markup = items.map((item) => listItem(item)).join();
  refs.list.insertAdjacentHTML("beforeend", markup);
}
