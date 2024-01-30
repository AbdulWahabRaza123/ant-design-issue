"use client";

import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import Sidebar from "../components/Home/Combined_Components/Sidebar/Sidebar";
import { useTranslation } from "../../../app/i18n/index";
import SelectionBar from "../components/Home/Combined_Components/Header/SelectionBar";
import "./layout.css";
const { Header, Sider, Content } = Layout;
const BasicLayout = ({ t, children, lng }) => {
  const [filterVisible, setFilterVisible] = useState(true);
  return (
    <div className="custom-container">
      <Layout>
        <Sider theme="light">
          <Sidebar t={t} lng={lng} />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: "white",
              // display:"flex",
              // justifyContent:"end"
            }}
          >
            <SelectionBar filterVisible={filterVisible} t={t} lng={lng} />
          </Header>
          <Content
            style={{
              background: "white",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default BasicLayout;
