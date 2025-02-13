import Http from "@/lib/http";

export const getHoiNhom = async (payload?: any) => {
  try {
    const response: any = await Http.post(
      "https://eduzaa.api1.lamgigio.net/main-api/api/guild/search",
      {
        per_page: 100,
        khong_gian_id: "",
        flag: "all",
      }
    );

    return response.list;
  } catch (error) {
    console.log("error: ", error);
    return [];
  }
};
