import { Outlet } from "react-router-dom";
import "./header.css";
import Footer from "./footer";
import Header from "./header"

export default function Layout(){
  return (<>
  <Header />

      <div style={{ minHeight: "100vh" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
