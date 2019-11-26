import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/table/lib/css/table.css";
import "normalize.css/normalize.css";

import { Classes, Colors, Drawer, Position } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { ErrorBoundary, Footer } from "nsitools-react";
import * as React from "react";
import styled from "styled-components";

import { AppNavigation } from "./app-navigation";
import { AppRouter } from "./AppRouter";
import { Header, NavigationMenu } from "./components";
import { useTl } from "./hooks/useTl";
import { ETLCodes } from "./locales";
import { BrowserRouter } from "react-router-dom";

interface IAppProps {}

const AppContainer = styled.div<{ isDark: boolean }>`
  display: flex;
  flex: 1;
  height: -webkit-fill-available;
  width: 100%;
  flex-direction: column;
  background-color: ${props => (props.isDark ? Colors.DARK_GRAY2 : Colors.LIGHT_GRAY3)};
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
  overflow: auto;
`;

export const App: React.FunctionComponent<IAppProps> = props => {
  const { t } = useTl();
  const [menuFixed, setMenuFixed] = React.useState(true);
  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <BrowserRouter>
      <AppContainer isDark={darkMode} className={darkMode ? Classes.DARK : ""}>
        <Header
          showMenuIcon={!menuFixed}
          toggleLeftMenu={() => {
            setDrawerVisible(s => !s);
          }}
          isDark={darkMode}
          onDarkSwitchChange={() => setDarkMode(!darkMode)}
        />

        <ContentContainer className="page">
          <Drawer
            icon={IconNames.MENU}
            title={t(ETLCodes.Menu)}
            hasBackdrop={true}
            className={Classes.DARK}
            isOpen={drawerVisible}
            position={Position.LEFT}
            size={Drawer.SIZE_SMALL}
            onClose={() => setDrawerVisible(false)}
            canEscapeKeyClose={true}
            canOutsideClickClose={true}
            usePortal={false}
          >
            <div className={Classes.DRAWER_BODY}>
              <NavigationMenu
                navigationMenu={AppNavigation}
                isFixed={menuFixed}
                changeFixed={() => {
                  if (!menuFixed) {
                    setDrawerVisible(false);
                  }
                  setMenuFixed(!menuFixed);
                }}
              />
            </div>
            <div className={Classes.DRAWER_FOOTER} />
          </Drawer>

          {menuFixed && (
            <NavigationMenu
              navigationMenu={AppNavigation}
              isFixed={menuFixed}
              changeFixed={() => setMenuFixed(!menuFixed)}
            />
          )}
          <ErrorBoundary>
            <AppRouter />
          </ErrorBoundary>
        </ContentContainer>

        <Footer versionLoading={false} version={"0.0.0"} />
      </AppContainer>
    </BrowserRouter>
  );
};
