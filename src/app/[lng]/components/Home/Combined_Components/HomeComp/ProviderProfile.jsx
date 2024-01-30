import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Space, Button, Modal } from "antd";
import { Table, Tag } from "antd";
import "../../../../admin/home/page.css";
import { SearchOutlined } from "@ant-design/icons";
import "../HomePage.css";
import Signup_1_Fields from "../../../Signup_main_Details/Signup_1_Fields";
import "./ProviderProfile.css"
const tableHeight = 600;

const paginationConfig = {
  pageSize: 10,
};

const tableScrollConfig = {
  y: tableHeight,
};
const MyPage = ({ columns, data, t }) => {
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [width, setWidth] = useState(true);
  const [selectionType, setSelectionType] = useState('checkbox');

  const handleAddProviderClick = () => {
    // dispatch(addSpecificModal());
    // console.log(dispatch(addSpecificModal()));
    setIsModalOpen(true); 
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <>
      <div>
        <div className="flex flex-row align-center justify-between">
          <div style={{ width: "30%" }}>
            <Search
              placeholder={t('provider.search_for_doctor')}
              className="flex align-center btn-height"
              onSearch={onSearch}
              enterButton={
                <Button
                  type="primary"
                  className="fw-500 fs-16 flex flex-row align-center justify-conter btn-height"
                  style={{ background: "#23368D" }}
                >
                  <SearchOutlined />
                </Button>
              }
            />
          </div>
          <div className="flex justify-center sm:justify-end items-center md:w-5/6">
            <Button
              className="font-fam text-white btn-primary fw-500 fs-16 flex justify-end items-center group-buttons"
              htmlType="submit"
              icon={<PlusOutlined />}
              onClick={handleAddProviderClick}
            >
              Add Provider
            </Button>
            <Modal
              title={<span className="fw-600 font-fam fs-24">Add Provider</span>}
              open={isModalOpen}
              className="add-provider-modal"
              onCancel={() => setIsModalOpen(false)}
              footer={null}
            >
              {isModalOpen && <Signup_1_Fields width={width} t={t} showImageAndText={false} />}
            </Modal>

          </div>
        </div>
        <div className="mt-4" style={{overflowX:"auto", overflowY:"auto"}}>
          <Table
            // pagination={true}
            bordered={true}
            columns={columns}
            dataSource={data}
            pagination={paginationConfig}
            // scroll={tableScrollConfig}
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default MyPage;
