import * as React from "react";
import { INavigationItem } from "../app-navigation";

import styled from "styled-components";
import { Button, Collapse, Alignment, Colors, Classes, Switch, Menu, Tooltip } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { useTl } from "../hooks/useTl";
import { handleBooleanChange } from "../utils/handleBooleanChange";
import { ETLCodes } from "../locales/ETLCodes";
import { useHistory } from "react-router-dom";

interface INavigationMenuProps {
  navigationMenu: INavigationItem[];
  isFixed: boolean;
  changeFixed: (value: boolean) => void;
}

/// Styles

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  min-width: 250px;
  height: auto;
  background-color: ${Colors.DARK_GRAY4};
`;

const MenuStyled = styled(Menu)`
  display: flex;
  flex-direction: column;
`;

const ButtonStyled = styled(Button)`
  margin: 0.2em;
`;

const BottomActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

interface IRootMenuItemProps {
  item: INavigationItem;
  level: number;
}

const MenuItem: React.FunctionComponent<IRootMenuItemProps> = ({ item, level }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const history = useHistory();
  const { t } = useTl();

  const hasChildren = React.useMemo(() => {
    return item.items && item.items.length > 0;
  }, [item]);

  const collapseIcon = React.useMemo(() => {
    if (hasChildren) {
      return isExpanded ? IconNames.CHEVRON_RIGHT : IconNames.CHEVRON_DOWN;
    } else {
      return IconNames.BLANK;
    }
  }, [hasChildren, isExpanded]);

  const onClick = React.useCallback(() => {
    if (hasChildren) {
      setIsExpanded(e => !e);
    } else if (item.route) {
      history.push(item.route);
    }
  }, [hasChildren, item.route, history]);

  return (
    <>
      <ButtonStyled
        text={t(item.name)}
        icon={item.icon}
        rightIcon={collapseIcon}
        onClick={() => onClick()}
        style={{ paddingLeft: `${level * 2 + 0.2}em` }}
        minimal={true}
        alignText={Alignment.LEFT}
        // intent={Intent.PRIMARY}
        large={true}
      />
      <Collapse isOpen={isExpanded}>
        <Container>
          {item.items && item.items!.map((itm, index) => <MenuItem key={index} item={itm} level={level + 1} />)}
        </Container>
      </Collapse>
    </>
  );
};

/// Component
export const NavigationMenu: React.FunctionComponent<INavigationMenuProps> = ({
  navigationMenu,
  isFixed,
  changeFixed
}) => {
  const { t } = useTl();

  return (
    <Container className={Classes.DARK}>
      <MenuStyled large={false}>
        {navigationMenu.map((n, i) => (
          <MenuItem item={n} key={i} level={0} />
        ))}
      </MenuStyled>
      <BottomActionsContainer>
        <Tooltip content={t(ETLCodes.ToggleFixedTooltip)}>
          <Switch checked={isFixed} onChange={handleBooleanChange(v => changeFixed(v))} />
        </Tooltip>
      </BottomActionsContainer>
    </Container>
  );
};
