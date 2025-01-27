import { AxiosError, AxiosResponse } from "axios";

interface ApiErrorResponse {
  message?: string;
}

export interface ApiErrorMesage extends AxiosError {
  response?: AxiosResponse<ApiErrorResponse>;
}