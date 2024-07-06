import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import type { AuthContext } from "../auth";
import React from "react";

export interface IRouterContext {
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<IRouterContext>()({
  component: () => (
    <React.Fragment>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
    </React.Fragment>
  ),
});
