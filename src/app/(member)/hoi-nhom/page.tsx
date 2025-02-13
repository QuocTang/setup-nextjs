import dynamic from "next/dynamic";

const HoiNhom = dynamic(
  () => import("@/features/hoi-nhom/components/hoi-nhom")
);

export default function page() {
  return (
    <>
      <HoiNhom />
    </>
  );
}
