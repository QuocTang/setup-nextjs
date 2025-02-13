import { Card } from "antd";
import {
  AimOutlined,
  BookOutlined,
  BulbOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Suspense } from "react";
import DefaultLoading from "@/components/ui/default-loading";

export default function Dashboard() {
  const card = async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return "2/5";
  };
  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      {/* Banner Chào Mừng */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6 rounded-xl flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">
            Chào, <span className="text-white">Huỳnh Nhất Nam</span>
          </h2>
          <p className="italic">
            "Hôm nay là một ngày đẹp để tiếp tục đi xa hơn!"
          </p>
          <p className="text-sm">- Albert Schweitzer</p>
        </div>
        <img src="https://picsum.photos/200" alt="Banner" className="w-40" />
      </div>

      {/* Thẻ Thống Kê */}
      <div className="grid grid-cols-4 gap-4">
        <Suspense fallback={<DefaultLoading />}>
          <Card className="flex items-center p-4 shadow-md text-center">
            <AimOutlined className="text-2xl text-red-500" />
            <p className="text-lg font-semibold">{card()}</p>
            <p className="text-sm">Đạt mục tiêu</p>
          </Card>
        </Suspense>
        <Card className="flex items-center p-4 shadow-md text-center">
          <BulbOutlined className="text-2xl text-yellow-500" />
          <p className="text-lg font-semibold">20</p>
          <p className="text-sm">Hội nhóm</p>
        </Card>
        <Card className="flex items-center p-4 shadow-md text-center">
          <BookOutlined className="text-2xl text-blue-500" />
          <p className="text-lg font-semibold">4/20</p>
          <p className="text-sm">Khóa học</p>
        </Card>
        <Card className="flex items-center p-4 shadow-md text-center bg-green-200">
          <ClockCircleOutlined className="text-2xl text-green-600" />
          <p className="text-lg font-semibold text-green-800">10 giờ</p>
          <p className="text-sm">Tổng giờ học</p>
        </Card>
      </div>

      {/* Danh Sách Khóa Học Gần Đây */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="font-semibold">Khóa học gần đây</h3>
          <div className="space-x-4">
            <a href="#" className="text-blue-500">
              Xem tất cả
            </a>
            <a href="#" className="text-blue-500">
              Lịch sử
            </a>
          </div>
        </div>
        <div className="mt-4">
          <Card className="p-4 flex flex-col items-center justify-center">
            <button className="bg-gray-200 px-4 py-2 rounded-md">
              Mua thêm
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}
