import axios from "axios";

const BASE_URL = "http://192.168.1.17:5000"; // tumhara IP

export const getJobs = async () => {
  const res = await axios.get(`${BASE_URL}/jobs`);
  return res.data;
};

export const markComplete = async (id: string, note: string) => {
  const res = await axios.post(`${BASE_URL}/jobs/${id}/complete`, {
    note,
  });
  return res.data;
};