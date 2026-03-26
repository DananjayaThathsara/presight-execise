import axios from "axios";

console.log(`${import.meta.env.VITE_API_URL}/api`);
// Create an Axios instance with default configuration
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const apiClient = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;

// Define TypeScript interfaces for the API response
export interface Person {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  age: number;
  nationality: string;
  hobbies: string[];
}

// Define the structure of the response from the /people endpoint
export interface PeopleResponse {
  data: Person[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: {
    topHobbies: { name: string; count: number }[];
    topNationalities: { name: string; count: number }[];
  };
}

// Function to fetch people from the API with optional query parameters
export const fetchPeople = async (params: { page: number; search?: string; hobby?: string; nationality?: string }): Promise<PeopleResponse> => {
  const response = await apiClient.get("/people", { params });
  return response.data;
};
