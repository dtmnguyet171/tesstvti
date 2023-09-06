
import * as React from "react";

// antd
import { Avatar, List } from 'antd';
import { Modal } from 'antd';
// axios call api
import axios, { isCancel, AxiosError } from 'axios';
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function DataComponent() {
  // data list user
  const [data, setData] = useState([]);

  // show modal info
  const [isModalOpen, setIsModalOpen] = useState(false);

  // show modal delete
  const [isModalOpenDelete, setisModalOpenDelete] = useState(false);

  
  // show item
  const [itemInfo, setItemInfo] = useState(null);

  useEffect(() => {
      callapi();
  }, []);

  const callapi = () => {
      const data = axios.get("https://643d4c71f0ec48ce90586caf.mockapi.io/Account/")
          .then(res => {
              console.log('res', res);
              setData(res.data)
          })
          .catch(err => console.log(err));

      return () => data;
  }

  const handleShowModal = (item, index) => {
      console.log(item, index, "=====");
      setIsModalOpen(true);

      // click ban ghi thi setiTEMINFO is item
      setItemInfo(item);

  }

  const handleOk = () => {
      setItemInfo(null);
      setIsModalOpen(false);
  };
  const handleCancel = () => {
      setItemInfo(null);
      setIsModalOpen(false);
  };


  // delete
  const handleDelete = (item, index) => {
      setisModalOpenDelete(true);
      setItemInfo(item);
  };

  const handleOkeDelete = () => {
      const data = axios.delete("https://643d4c71f0ec48ce90586caf.mockapi.io/Account/" + `/${itemInfo.id}`)
          .then(res => {
              console.log('res', res);

              // setData(res.data)
          }).then(() => {
              callapi();
              setisModalOpenDelete(false);
              setItemInfo(null);
          })
          .catch(err => console.log(err));

      return () => data;
  }

  const handleCancelDelete = () => {
      setItemInfo(null);
      setisModalOpenDelete(false);
  }

  return (
      <>
          <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item, index) => (
                  <List.Item
                      actions={[
                          <NavLink
                              to={`dataDeatail/${item.id}`}
                              className={({ isActive, isPending }) =>
                                  isActive
                                      ? "active"
                                      : isPending
                                          ? "pending"
                                          : ""
                              }
                          ><p key="list-loadmore-edit">edit</p></NavLink>,
                          <p key="list-loadmore-more"
                              onClick={() => handleShowModal(item, index)}>more</p>,
                          <p key="list-loadmore-delete"
                              onClick={() => handleDelete(item, index)}>delete</p>
                      ]
                      }
                  >
                      <List.Item.Meta
                          avatar={<Avatar src={item.avatar} />}
                          title={<>{item.name}</>}
                          description={item.address}
                      />
                  </List.Item>
              )}
          />

          <Modal title="model detail" open={isModalOpen} onOk={handleOk}
              onCancel={handleCancel}>
              <p>{itemInfo?.name}</p>
              <p>{itemInfo?.address}</p>
              <p>Some contents...</p>
          </Modal>

          <Modal title="model confirm" open={isModalOpenDelete} onOk={handleOkeDelete}
              onCancel={handleCancelDelete}>
              Do u want delete item ?
          </Modal>

      </>
  )
}