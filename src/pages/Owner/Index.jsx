import React from 'react'
import AppLayout from '../../components/Layout/Index';
import { Space, Table, Tag } from 'antd';

const columns = [
  {
    title: 'Propietarios',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Email',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Mascotas',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: '',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Editar</a>
        <a>Eliminar</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 5511334455,
    address: 'correo@correo.com',
    tags: ['boby', 'terry'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 5511334455,
    address: 'correo@correo.com',
    tags: ['kiara'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 5511334455,
    address: 'correo@correo.com',
    tags: ['eimi', 'mordelon'],
  },
];

const Index = () => {
  return (
    <AppLayout>
      <div>
        <h3>Propietarios</h3>
      </div>
      <Table columns={columns} dataSource={data} />
    </AppLayout>
  )
}

export default Index
