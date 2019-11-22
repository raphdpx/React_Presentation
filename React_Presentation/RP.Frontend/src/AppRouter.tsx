import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { HomePage } from "./pages/home/item/homePage";
import { EmployeeItemPage } from "./pages/employee/item/EmployeeItemPage";
import { EmployeeListPage } from "./pages/employee/list/EmployeeListPage";

export enum ERoutes {
  employee = "/employee",
  home = "/home"
}

export const AppRouter = () => {
  return (
    <Switch>
      <Route path={`${ERoutes.home}`} component={HomePage} exact />
      <Route path={`${ERoutes.employee}`} component={EmployeeListPage} exact />
      <Route path={`${ERoutes.employee}/:id`} component={EmployeeItemPage} exact />
      <Redirect to={ERoutes.home} exact />
    </Switch>
  );
};
