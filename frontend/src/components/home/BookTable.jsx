import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Tooltip, Space } from 'antd';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const BookTable = ({ books }) => {
  const columns = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      responsive: ['md'], // hides on small screens
    },
    {
      title: 'Publish Year',
      dataIndex: 'publishYear',
      key: 'publishYear',
      responsive: ['md'],
    },
    {
      title: 'Operations',
      key: 'operations',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Details">
            <Link to={`books/details/${record._id}`}>
              <BsInfoCircle style={{ fontSize: '20px', color: '#065f46' }} />
            </Link>
          </Tooltip>
          <Tooltip title="Edit">
            <Link to={`books/edit/${record._id}`}>
              <AiOutlineEdit style={{ fontSize: '20px', color: '#ca8a04' }} />
            </Link>
          </Tooltip>
          <Tooltip title="Delete">
            <Link to={`books/delete/${record._id}`}>
              <MdOutlineDelete style={{ fontSize: '20px', color: '#dc2626' }} />
            </Link>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      dataSource={books}
      columns={columns}
      rowKey="_id"
      pagination={false}
    />
  );
};

export default BookTable;