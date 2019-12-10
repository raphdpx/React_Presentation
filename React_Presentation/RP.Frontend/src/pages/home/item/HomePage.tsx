import * as React from "react";
import assets from "../../../assets";
import styled from "styled-components";

interface IHomePageProps {}

const StyledPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  height: 100%;
  align-self: stretch;
  overflow: auto;
`;

export const HomePage: React.FunctionComponent<IHomePageProps> = props => {
  return (
    <StyledPageLayout>
      <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
        <img src={assets.images.presentationLogo} alt="Presentation React"></img>
      </div>
    </StyledPageLayout>
  );
};
