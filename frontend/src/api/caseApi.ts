import axios from "axios";
import { CreateCaseInput } from "../components/cases/create.case";
import { UpdateCaseInput } from "../components/cases/update.case";
import { ICase, ICaseResponse, ICasesResponse } from "./types";

const BASE_URL = "http://localhost:8000/api/";

export const caseApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// caseApi.defaults.headers.common["content-type"] = "application/json";

export const createCaseFn = async (caseInput: CreateCaseInput) => {
  const response = await caseApi.post<ICaseResponse>("cases/", caseInput);
  return response.data;
};

export const updateCaseFn = async (caseId: string, caseInput: UpdateCaseInput) => {
  const response = await caseApi.patch<ICaseResponse>(`cases/${caseId}`, caseInput);
  return response.data;
};

export const deleteCaseFn = async (caseId: string) => {
  return caseApi.delete<null>(`cases/${caseId}`);
};

export const getSingleCaseFn = async (caseId: string) => {
  const response = await caseApi.get<ICaseResponse>(`cases/${caseId}`);
  return response.data;
};

export const getCasesFn = async (page = 1, limit = 10) => {
  const response = await caseApi.get<ICasesResponse>(
    `cases?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const testCaseFn = async (caseId: string) => {
  return caseApi.get<null>(`cases/${caseId}/test`);
};

export const getSingleCaseResultFn = async (caseId: string) => {
  const response = await caseApi.get<ICaseResponse>(`cases/${caseId}`);
  return response.data;
};