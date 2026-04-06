import { Outlet, useLocation } from "react-router-dom";
import "./header.css";
import Footer from "./footer";
import Header from "./header"
import SmallHeader from "./smallHeader";



export default function Layout(){
  const location = useLocation();
const needsSmallHeader = location.pathname.includes("homeless-hero/play");
  return (<>

  {needsSmallHeader ?  <SmallHeader />: 
  <Header />}
      <div style={{ minHeight: "100vh" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
