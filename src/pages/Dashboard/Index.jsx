import React, { useState } from "react";
import { Button, Card, Space } from "antd";
import AppLayout from "../../components/Layout/Index";
import AppCalendar from "../../components/Calendar/Index";
import AppModal from '../../components/Modal/Index';
import AppAppointmentForm from '../../components/AppointmentForm/Index';

const Index = () => {
  const [openModal, setOpenModal] = useState(false);
  
  const handleOpenModalNewAppointment = () => {
    return (
      <AppModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title='Nueva cita'
      >
        <AppAppointmentForm />
      </AppModal>
    );
  };

  return (
    <AppLayout>
      <div className="dashboard-title">
        <h2>¿Agendar una </h2>
        <Button type="primary" onClick={() => setOpenModal(true)}>
          nueva cita
        </Button>
        <h2>?</h2>
      </div>
      <div className="display-flex-jc-sb">
        <AppCalendar />
        <div>
          <h3>Citas para el dia de hoy</h3>
          <Space direction="vertical" size={16}>
            <Card
              title="Cita con Boby"
              // extra={<a href="#">More</a>}
              style={{ width: 300 }}
            >
              <p>Tipo: estética</p>
              <p>Propietario: Gabriel Montaño</p>
              <p>Observaciones: Las observaciones capturadas</p>
            </Card>
            <Card
              title="Cita con mordelon"
              // extra={<a href="#">More</a>}
              style={{ width: 300 }}
            >
              <p>Tipo: médica</p>
              <p>Propietario: Gabriel Montaño</p>
              <p>Observaciones: Las observaciones capturadas</p>
            </Card>
          </Space>
        </div>
      </div>
      {handleOpenModalNewAppointment()}
    </AppLayout>
  );
};

export default Index;
