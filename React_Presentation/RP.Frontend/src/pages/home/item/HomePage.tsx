import * as React from "react";
import { PageLayout } from "nsitools-react";
import assets from "../../../assets";

interface IHomePageProps {}

export const HomePage: React.FunctionComponent<IHomePageProps> = props => {
  return (
    <PageLayout>
      <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
        <img src={assets.images.presentationLogo} alt="Presentation React"></img>
      </div>
    </PageLayout>
  );
};
