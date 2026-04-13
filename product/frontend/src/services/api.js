import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const predictText = (text) =>
  API.post("/predict-text", { text });

export const predictURL = (url) =>
  API.post("/predict-url", { url });

export const predictImage = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return API.post("/predict-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};