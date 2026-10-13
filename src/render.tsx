import { StrictMode } from "react";
import { prerender } from "react-dom/static";
import { renderToString } from "react-dom/server";
import App from "./App";

export async function render(page: string) {
  const app = <StrictMode><App page={page} /></StrictMode>;
  await prerender(app);
  return renderToString(app);
}
