import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Tabs, Tag } from "antd";
import { getHoiNhom } from "../services/hoi-nhom.service";
import Image from "next/image";

export default async function HoiNhom() {
  const hoi_nhom_list: any[] = await getHoiNhom();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Nhóm của bạn</h2>
        <Button type="primary" icon={<PlusOutlined />}>
          Tạo hội nhóm mới
        </Button>
      </div>
      <Tabs
        defaultActiveKey="1"
        items={[
          { key: "1", label: "Tất cả" },
          { key: "2", label: "Bạn đang quản lý" },
        ]}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {hoi_nhom_list.map((group, index) => (
          <Card
            key={index}
            cover={
              group.space.info.thumbnail ? (
                // <Image
                //   alt="group"
                //   src={group.space.info.thumbnail}
                //   width={10}
                //   height={10}
                // />
                <img src={group.space.info.thumbnail} alt="" />
              ) : (
                <div className="h-32 bg-gray-200"></div>
              )
            }
            className="shadow-md hover:shadow-lg transition-all"
          >
            <Tag color={group.space.status === "public" ? "green" : "gray"}>
              {group.space.status}
            </Tag>
            <p className="font-semibold">{group.space.info.tieu_de}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
