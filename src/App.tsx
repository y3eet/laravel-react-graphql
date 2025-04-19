import "./App.css";
import { Outlet, Route, Routes } from "react-router";
import { Topbar } from "./components/topbar";
import { AppSidebar } from "./components/sidebar";
import { SidebarInset } from "./components/ui/sidebar";
import Home from "./components/routes/home";
import Root from "./components/routes/root";
import Dashboard from "./components/routes/dashboard";
import AuthPage from "./components/routes/auth-page";
import Crud from "./components/routes/crud";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(import.meta.env.VITE_BACKEND_URL + "/sanctum/csrf-cookie", {
      credentials: "include",
    }).then(() => setLoading(false));
  }, []);

  return loading ? (
    <div className="flex items-center justify-center w-full">
      <div className="text-lg">Loading...</div>
    </div>
  ) : (
    <Routes>
      <Route element={<BarLayout />}>
        <Route element={<ContentLayout className="flex-1 p-4" />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/crud" element={<Crud />} />
        </Route>
      </Route>
      <Route element={<BarLayout showSidebar={false} />}>
        <Route index element={<Root />} />
      </Route>
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} />
    </Routes>
  );
}

const BarLayout = ({ showSidebar = true }: { showSidebar?: boolean }) => (
  <>
    {showSidebar && <AppSidebar />}
    <SidebarInset>
      <Topbar showSidebar={showSidebar} />
      <Outlet />
    </SidebarInset>
  </>
);

const ContentLayout = ({ ...props }) => (
  <div {...props}>
    <Outlet />
  </div>
);
export default App;
