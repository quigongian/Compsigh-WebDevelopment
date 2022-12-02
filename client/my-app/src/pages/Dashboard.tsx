import Sidebar from "../components/dashboard_components/sidebar";
import Music from "../components/dashboard_components/Music";
import { Header } from "../components/header";
import { LogHeader } from "../components/LogHeader";

export const Dashboard = () => {
  return (
    <>
      <LogHeader/>
      <Sidebar />
      <Music />
    </>
  );
};
