import { lazy, Suspense, useEffect } from "react";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";

const LancePage = lazy(() => import("./pages/LancePage").then(module => ({ default: module.LancePage })));
const SysadminPage = lazy(() => import("./pages/SysadminPage").then(module => ({ default: module.SysadminPage })));
const LibreChatPage = lazy(() => import("./pages/LibreChatPage").then(module => ({ default: module.LibreChatPage })));
const SfmPage = lazy(() => import("./pages/SfmPage").then(module => ({ default: module.SfmPage })));

export default function App({ page = "index" }: { page?: string }) {
  useEffect(() => {
    document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
  }, []);

  let content = <HomePage />;
  if (page === "lance") content = <LancePage />;
  if (page === "sysadmin") content = <SysadminPage />;
  if (page === "librechat") content = <LibreChatPage />;
  if (page === "sfm") content = <SfmPage />;
  return (
    <Layout>
      <Suspense fallback={<p>Loading...</p>}>{content}</Suspense>
    </Layout>
  );
}
