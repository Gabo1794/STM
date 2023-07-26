import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import CustomModalProps from './CustomModalProps';

const CustomModal = (props: CustomModalProps) => {
    const { open, title, children, footer, close } = props;

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleOk = () => {
//     setIsModalOpen(false);
//   };

  const handleCancel = () => {
    close(false);
  };

  return (
    <>
      <Modal 
        title={title} open={open}
        onCancel={handleCancel}
        onOk={handleCancel}
        footer={footer}
        >
        {children}
      </Modal>
    </>
  );
}
export default CustomModal