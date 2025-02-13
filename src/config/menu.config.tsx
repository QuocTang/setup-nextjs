import {
  BookOutlined,
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

export const MENU_ITEMS: MenuItem[] = [
  {
    label: "Dashboard",
    key: "dashboard",
    icon: <DashboardOutlined />,
    danger: true,
  },
  {
    label: "Tài khoản",
    key: "profile",
    icon: <UserOutlined />,
  },
  {
    label: "Hội nhóm",
    key: "hoi-nhom",
    icon: <TeamOutlined />,
  },
  {
    label: "Khóa học",
    key: "courses",
    icon: <BookOutlined />,
    disabled: true,
  },
];
