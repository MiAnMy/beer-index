import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

const fetchData = async <T>(query: string): Promise<T | string> => {
  try {
    const { data } = await api.get<T>(query);
    return data;
  } catch (err) {
    const error = err as AxiosError;
    return error.message;
  }
};

export default fetchData;
