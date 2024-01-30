import React, { useState, useEffect } from "react";
import Sidebar from "../components/Home/Combined_Components/Sidebar/Sidebar";
import { useTranslation } from "../../../app/i18n/client";
import SelectionBar from "../components/Home/Combined_Components/Header/SelectionBar";
import "./layout.css";
import { Layout, Button, Drawer, Row, Col } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

export default function SmallLayout({ lng, children, t }) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
      <div className="custom-container">
        <Layout>
          <Header
            className="md:flex block"
            style={{
              backgroundColor: "white",
              // display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              className="d-flex align-items-center justify-content-center"
              style={{ height: "2.5rem", width: "2rem" }}
              type="light"
              onClick={toggleSidebar}
            >
              {sidebarVisible ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <SelectionBar
              t={t}
              lng={lng}
              sidebarVisible={sidebarVisible}
              filterVisible={filterVisible}
            />
          </Header>
          <Content style={{ backgroundColor: "white", paddingBottom: "2rem" }}>
            <Drawer
              open={sidebarVisible}
              className="hamburger"
              onClose={toggleSidebar}
              placement="left"
              bodyStyle={{ padding: 0 }}
              width="inherit"
            >
              <Sidebar t={t} />
            </Drawer>
            <Row>
              <Col span={24}>
                <div className="body-outer-div">
                  <Content
                    style={{
                      background: "white",
                    }}
                  >
                    {children}
                  </Content>
                </div>
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
    </>
  );
}
