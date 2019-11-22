import { ETLCodes } from "./locales/ETLCodes";
import { ERoutes } from "./AppRouter";
import { IconName } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

export interface INavigationItem {
  name: ETLCodes;
  route?: ERoutes;
  icon?: IconName;
  items?: INavigationItem[];
}

export const AppNavigation: INavigationItem[] = [
  {
    name: ETLCodes.Home,
    icon: IconNames.HOME,
    route: ERoutes.home
  },
  {
    name: ETLCodes.Employees,
    icon: IconNames.PERSON,
    route: ERoutes.employee
  }
];
