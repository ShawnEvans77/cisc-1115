import { Analytics } from "@vercel/analytics/react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/layout/ScrollToTop";

function App() {
  return (
    <div className="app-root">
      <ScrollToTop />
      <Navbar />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;