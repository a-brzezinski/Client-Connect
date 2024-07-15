import axios from "axios";

import { Customer } from "@/@types/vite-env";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export const fetchCustomers = async (page: number = 1, limit: number = 10): Promise<Customer[]> => {
  const url = new URL(API_BASE_URL);
  url.searchParams.append("page", page.toString());
  url.searchParams.append("limit", limit.toString());

  try {
    const response = await axios.get<Customer[]>(url.toString(), {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch customers, try again later");
  }
};

export const fetchCustomer = async (id: string): Promise<Customer> => {
  const url = new URL(`${API_BASE_URL}/${id}`);

  try {
    const response = await axios.get<Customer>(url.toString(), {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch customer, try again later");
  }
};

export const deleteCustomer = async (id: string) => {
  const url = new URL(`${API_BASE_URL}/${id}`);

  try {
    const response = await axios.delete<Customer>(url.toString(), {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to delete customer, try again later");
  }
};

export const updateCustomer = async (customer: Customer) => {
  const url = new URL(`${API_BASE_URL}/${customer.id}`);

  try {
    const response = await axios.put<Customer>(url.toString(), customer, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to update customer, try again later");
  }
};
