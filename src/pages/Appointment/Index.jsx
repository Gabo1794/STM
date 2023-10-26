import React from 'react'
import AppLayout from '../../components/Layout/Index';
import { Space, Table, Tag } from 'antd';

const columns = [
  {
    title: 'Medico Veterinario',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Tipo de cita',
    dataIndex: 'appointment',
    key: 'appointment',
  },
  {
    title: 'Propietario',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Telefono',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Paciente',
    dataIndex: 'pet',
    key: 'pet',
  },
  {
    title: 'Fecha',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Editar</a>
        <a>Cancelar</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 5511223344,
    address: 'Gabriel Montaño',
    pet: 'Boby',
    date: '2023-01-30',
    appointment: 'medica'
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 5511223344,
    address: 'Jamil Ramirez',
    pet: 'Firulais',
    date: '2023-01-30',
    appointment: 'medica'
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 5511223344,
    address: 'Gabriela Macias',
    pet: 'Mordelon',
    date: '2023-01-30',
    appointment: 'estética'
  },
];

const Index = () => {
  return (
    <AppLayout>
      <div>
        <h3>Citas agendadas</h3>
      </div>
      <Table columns={columns} dataSource={data} />
    </AppLayout>
  )
}

export default Index
