import axiosWrapper from "./axiosWrapper";

const getPokemons = async (
  feedbackDispatch,
  setPokemons,
  setTotalItems,
  offset,
  limit
) => {
  feedbackDispatch({ type: "SHOW_LOADING", payload: true });
  const response = await axiosWrapper(
    `/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );
  if (response.status === 200) {
    feedbackDispatch({ type: "SHOW_LOADING", payload: false });
    setPokemons(response.results);
    setTotalItems(response.count);
  } else {
    feedbackDispatch({ type: "SET_SNACKBAR", payload: true });
  }
};

const getPokemon = async (feedbackDispatch, setPokemon, pokemonName) => {
  feedbackDispatch({ type: "SHOW_LOADING", payload: true });
  const response = await axiosWrapper(`/api/v2/pokemon/${pokemonName}`);
  if (response.status === 200) {
    feedbackDispatch({ type: "SHOW_LOADING", payload: false });
    setPokemon(response);
  } else {
    feedbackDispatch({ type: "SET_SNACKBAR", payload: true });
  }
};

const getLocation = async (setIsLoading, setData, url, errorCallback) => {
  setIsLoading(true);
  const response = await axiosWrapper(url);
  if (response.status === 200) {
    setIsLoading(false);
    delete response["status"];
    setData(Object.keys(response).map((key) => response[key]));
  } else {
    setIsLoading(false);
    errorCallback();
  }
};

const API = {
  getPokemons,
  getPokemon,
  getLocation,
};

export default API;
