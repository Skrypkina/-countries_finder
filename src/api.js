import axios from "axios";
import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

export default async function fetchCountries(searchUrl, query) {
  try {
    const response = await axios.get(`${searchUrl}/name/${query}`);
    return response;
  } catch (err) {
    console.error(err);
    error("Please, enter the correct name of the country!");
  }
}
