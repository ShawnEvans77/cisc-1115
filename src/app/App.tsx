import { Suspense } from "react";
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
        {/* pages load lazily; navigations run as transitions, so the old page stays up while the next one loads */}
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
