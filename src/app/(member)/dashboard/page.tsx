import dynamic from "next/dynamic";

const Dashboard = dynamic(() => import("@/features/dashboard/dashboard"));

export default function Page() {
  return (
    <>
      a
      <Dashboard />
    </>
  );
}
