"use client";
import DefaultLoading from "@/components/ui/default-loading";
import {
  ExperimentOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { App, Avatar, Badge, Button, Card, Tabs, Tag } from "antd";
import { getHoiNhom } from "../services/hoi-nhom.service";
import { useHoiNhomStore } from "../stores/hoi-nhom.store";
import { HOI_NHOM_TAB_LIST } from "../config";
import React from "react";
import ViewPermissionHelper from "@/lib/helpers/view-permission.helper";
import { POLICIES } from "@/config/policy.config";
export default function HoiNhom() {
  const { notification } = App.useApp();
  const { hoiNhomSearch, setHoiNhomSearch, isHydrated } = useHoiNhomStore();

  //#region click

  const clickReload = () => {
    refetch();
  };

  const clickTabs = (key: string) => {
    switch (key) {
      case "1":
        setHoiNhomSearch({
          per_page: 100,
          khong_gian_id: "",
          flag: "all",
          active_tab: key,
        });
        break;
      case "2":
        setHoiNhomSearch({
          per_page: 100,
          khong_gian_id: "",
          flag: "owner",
          active_tab: key,
        });
        break;
    }
  };
  //#endregion

  //#region query

  const { data, isError, isFetching, refetch, error } = useQuery({
    queryKey: ["hoi-nhom-search", hoiNhomSearch],
    queryFn: async ({ queryKey }) => {
      const [, params] = queryKey as [string, typeof hoiNhomSearch];
      return getHoiNhom(params);
    },
    retry: 2,
    staleTime: 1000 * 60 * 5,
    enabled: isHydrated,
  });

  //#endregion

  if (isError) {
    notification.error({
      message: "Error",
      description: "error.message",
    });
  }

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Nhóm của bạn</h2>
          <div className="flex space-x-2">
            <ViewPermissionHelper
              policies={[POLICIES.eduzaa.hoi_nhom.tao_moi_hoi_nhom]}
            >
              <Button type="primary" icon={<PlusOutlined />}>
                Tạo hội nhóm mới
              </Button>
            </ViewPermissionHelper>
            <Button type="link" icon={<ReloadOutlined />} onClick={clickReload}>
              Tải lại
            </Button>
          </div>
        </div>
        <Tabs
          defaultActiveKey="1"
          items={HOI_NHOM_TAB_LIST}
          activeKey={hoiNhomSearch.active_tab}
          onTabClick={clickTabs}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {isFetching ? (
            <DefaultLoading />
          ) : (
            data?.map((group: any, index: number) => (
              <Card
                key={index}
                cover={
                  <Badge.Ribbon text={group.space.status}>
                    <div className="w-full h-40 flex items-center justify-center">
                      <Avatar
                        src={group.space.info.thumbnail || null}
                        shape="square"
                        className="w-full h-full flex items-center justify-center"
                        icon={<ExperimentOutlined />}
                      ></Avatar>
                    </div>
                  </Badge.Ribbon>
                }
                className="shadow-md hover:shadow-lg transition-all"
              >
                <p className="font-semibold">{group.space.info.tieu_de}</p>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  );
}
