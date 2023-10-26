import React from 'react'
import { Modal } from "antd";

const Index = (props) => {
    const { openModal, setOpenModal, title } = props;
  return (
    <Modal
    open={openModal}
    title={title}
    onCancel={() => setOpenModal(false)}
  >
    {props.children}
  </Modal>
  )
}

export default Index
