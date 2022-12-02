import Sidebar from "../components/dashboard_components/sidebar";
import Music from "../components/dashboard_components/Music";
import { Header } from "../components/header";

export const Dashboard = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Music />
    </>
  );
};
