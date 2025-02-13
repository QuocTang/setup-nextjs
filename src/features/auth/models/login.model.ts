import { get } from "lodash";

export class LoginModel {
  token: string;
  app_key: string;
  is_xac_thuc_email: boolean;
  is_da_doi_mat_khau: boolean;
  is_da_xac_thuc_so_dien_thoai: boolean;
  result: ResultModel;
  listmenu_active: string[];

  constructor(args?: Partial<LoginModel>) {
    this.token = get(args, "token", "");
    this.app_key = get(args, "app_key", "");
    this.is_xac_thuc_email = get(args, "is_xac_thuc_email", false);
    this.is_da_doi_mat_khau = get(args, "is_da_doi_mat_khau", false);
    this.is_da_xac_thuc_so_dien_thoai = get(
      args,
      "is_da_xac_thuc_so_dien_thoai",
      false
    );
    this.result = new ResultModel(get(args, "result"));
    this.listmenu_active = get(args, "listmenu_active", []);
  }
}

class ResultModel {
  code: number;
  messager: string;
  NhanVienID: string;
  NhanVienGuid: string;
  contact_id: string;
  Ho_Ten: string;
  avatar: Record<TAvatar, string>;
  loai: string;
  email: string;
  khoa_viet_tat: string;
  image: string;

  constructor(args?: Partial<ResultModel>) {
    this.code = get(args, "code", 0);
    this.messager = get(args, "messager", "");
    this.NhanVienID = get(args, "NhanVienID", "");
    this.NhanVienGuid = get(args, "NhanVienGuid", "");
    this.contact_id = get(args, "contact_id", "");
    this.Ho_Ten = get(args, "Ho_Ten", "");
    this.avatar = get(args, "avatar", {
      default: "",
      hq: "",
      mq: "",
      "120x60": "",
    });
    this.loai = get(args, "loai", "");
    this.email = get(args, "email", "");
    this.khoa_viet_tat = get(args, "khoa_viet_tat", "");
    this.image = get(args, "image", "");
  }
}

type TAvatar = "default" | "hq" | "mq" | "120x60";
