"use client";
import { App } from "antd";
export default function AntdProviderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <App>{children}</App>
    </>
  );
}
