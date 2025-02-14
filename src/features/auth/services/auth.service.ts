import Http from "@/lib/http";
import { APIS } from "../config";
import CoreAppStorageService, {
  StorageLocation,
} from "@/core/app-store/app-storage.service";
import { LoginModel } from "../models/login.model";
import { CookieConfigKeys } from "@/config/app-storage/cookie.config";
import { LocalStorageConfigKeys } from "@/config/app-storage/local-storage.config";

export const loginService = async (payload: TLoginPayload) => {
  try {
    const response: any = await Http.post(APIS.login, payload);

    const model = new LoginModel(response);
    if (!model.token) {
      return response;
    }
    setCookieToken(model.token);
    setMenuActive(model.listmenu_active);

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

const setMenuActive = (menu_active: string[]) => {
  CoreAppStorageService.setItem(
    LocalStorageConfigKeys.features.auth.menu_active,
    menu_active,
    {
      location: StorageLocation.LOCAL_STORAGE,
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
  const token = getAccessToken();
  return token ? `${type} ${token}` : "";
};

export const getMenuActive = () => {
  return (
    CoreAppStorageService.getItem<string[]>(
      LocalStorageConfigKeys.features.auth.menu_active,
      {
        location: StorageLocation.LOCAL_STORAGE,
      }
    ) || []
  );
};
