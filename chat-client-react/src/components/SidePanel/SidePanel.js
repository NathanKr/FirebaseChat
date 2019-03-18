import React from "react";
import Rooms from "./Rooms";
import { Icon, Header } from "semantic-ui-react";
import UserMenu from './UserMenu'
import {appIconName , appName} from '../constants'

const SidePanel = () => {
  return (
    <div className="side-panel">
      <div>
        <Header inverted as="h2">
          <Icon name={appIconName} />
          {appName}
        </Header>
        <UserMenu/>
        <Rooms />
      </div>
    </div>
  );
};

export default SidePanel;
