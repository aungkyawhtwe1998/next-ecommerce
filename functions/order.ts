import apiInstance from "../lib/url";
import { handleError, handleResponse } from "./response";

export const createOrder = (data: any) => {
  return apiInstance
    .post(`/order/createOrder`, data)
    .then(handleResponse)
    .catch(handleError);
}; 