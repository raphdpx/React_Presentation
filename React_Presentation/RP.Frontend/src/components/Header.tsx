import { Alignment, Button, Classes, Colors, Navbar, Switch } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import * as React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { ERoutes } from "../AppRouter";
import assets from "../assets";

interface IHeaderProps {
  showMenuIcon: boolean;
  toggleLeftMenu?: () => void;
  isDark?: boolean;
  onDarkSwitchChange?: (e: boolean) => void;
}
const LogoImage = styled.img`
  width: 50px;
  margin-right: 1em;
`;

const NavBarStyled = styled(Navbar)`
  background-color: ${Colors.BLUE1} !important;
`;

export const Header: React.FC<IHeaderProps> = props => {
  const history = useHistory();
  return (
    <div className={Classes.DARK}>
      <NavBarStyled>
        <Navbar.Group align={Alignment.LEFT}>
          {props.toggleLeftMenu && props.showMenuIcon && (
            <>
              <Button icon={IconNames.MENU} minimal={true} onClick={props.toggleLeftMenu} />
              <Navbar.Divider />
            </>
          )}
          <LogoImage src={assets.images.nsiLogoWhite} />
          <Navbar.Divider />
          <Navbar.Heading
            style={{
              cursor: "pointer",
              fontSize: "1.3rem"
            }}
            onClick={() => {
              history.push(ERoutes.home);
            }}
          >
            Presentation React
          </Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          {props.onDarkSwitchChange && (
            <Switch
              label="Dark"
              large={true}
              checked={props.isDark}
              onChange={e => {
                props.onDarkSwitchChange!(e.currentTarget.checked);
              }}
            />
          )}
        </Navbar.Group>
      </NavBarStyled>
    </div>
  );
};
