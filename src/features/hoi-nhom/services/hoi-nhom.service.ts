import Http from "@/lib/http";
import { APIS } from "../config";

export const getHoiNhom = async (payload: THoiNhomSearchPayload) => {
  try {
    const response: any = await Http.post(APIS.hoi_nhom, payload);

    return response.list;
  } catch (error) {
    throw error;
  }
};
