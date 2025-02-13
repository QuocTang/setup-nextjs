import Http from "@/lib/http";
import { APIS } from "../config";
import CoreAppStorageService, {
  StorageLocation,
} from "@/core/app-store/app-storage.service";
import { LoginModel } from "../models/login.model";
import { CookieConfigKeys } from "@/config/app-storage/cookie.config";

export const loginService = async (payload: TLoginPayload) => {
  try {
    const response: any = await Http.post(APIS.login, payload);

    const model = new LoginModel(response);
    if (!model.token) {
      return response;
    }
    setCookieToken(model.token);

    return model;
  } catch (error) {
    throw error;
  }
};

const setCookieToken = (token: string) => {
  CoreAppStorageService.setItem(
    CookieConfigKeys.features.auth.user_token,
    token,
    {
      location: StorageLocation.COOKIES,
    }
  );
};

export const getAccessToken = () => {
  return CoreAppStorageService.getItem<string>(
    CookieConfigKeys.features.auth.user_token,
    {
      location: StorageLocation.COOKIES,
    }
  );
};

export const getAuthorizationHeader = (type = "JWT") => {
  // const token = getAccessToken();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ2OCIsIk5oYW5WaWVuSUQiOiJOSE4wMjkwODc3IiwiYXBwIjoiRURVWkFBX1Y0IiwiaXAiOiI6OmZmZmY6MTI3LjAuMC4xIiwiaWF0IjoxNzM5NDE2OTEwNzMwLCJ0eXBlIjoiTE9HSU5fVE9LRU4iLCJleHAiOjE3Mzk0MTY5MTA3ODB9.q_mW9rMKIBroQfE0vgM1RbP76UCL9FpfYiui3caYYdE";
  return token ? `${type} ${token}` : "";
};
