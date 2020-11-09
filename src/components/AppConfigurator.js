/**
 * Global configuration for antd
 */
import React from "react";
import { ConfigProvider } from "antd";

const AppConfigurator = props => {
  return (
    <ConfigProvider getPopupContainer={triggerNode => triggerNode.parentNode}>
      {props.children}
    </ConfigProvider>
  );
};

export default AppConfigurator;
