import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root")!;
const page = window.location.pathname.split("/").pop()?.replace(/\.html$/, "") || "index";
const app = <StrictMode><App page={page} /></StrictMode>;

if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
