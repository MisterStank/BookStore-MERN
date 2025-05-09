import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Tooltip, Modal, Space, Typography, Tag, Row, Col } from "antd";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiShow, BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const { Text, Title } = Typography;

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Card
        style={{ margin: "16px", backgroundColor: "#e0f2fe" }}
        bordered
        hoverable
        bodyStyle={{ padding: 16 }}
        title={
          <Row justify="space-between" align="middle">
            <Col xs={24} md={18}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {book._id}
              </Text>
              <Title level={5} style={{ marginTop: 4 }}>
                {book.title}
              </Title>
            </Col>
            <Col xs={24} md={6} style={{ textAlign: "right" }}>
              <Tag color="blue" style={{ fontSize: 14 }}>{book.publishYear}</Tag>
            </Col>
          </Row>
        }
      >
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Space>
              <PiBookOpenTextLight style={{ color: "#fca5a5", fontSize: 20 }} />
              <Text strong>{book.title}</Text>
            </Space>
          </Col>
          <Col span={24}>
            <Space>
              <BiUserCircle style={{ color: "#fca5a5", fontSize: 20 }} />
              <Text>{book.author}</Text>
            </Space>
          </Col>
          <Col span={24}>
            <Space wrap size="middle">
              <Tooltip title="Quick View">
                <BiShow
                  style={{ fontSize: 24, color: "#1e40af", cursor: "pointer" }}
                  onClick={() => setShowModal(true)}
                />
              </Tooltip>
              <Tooltip title="Details">
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle style={{ fontSize: 20, color: "#065f46" }} />
                </Link>
              </Tooltip>
              <Tooltip title="Edit">
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit style={{ fontSize: 20, color: "#ca8a04" }} />
                </Link>
              </Tooltip>
              <Tooltip title="Delete">
                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete style={{ fontSize: 20, color: "#dc2626" }} />
                </Link>
              </Tooltip>
            </Space>
          </Col>
        </Row>
      </Card>

      <Modal
        title="Book Details"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <p><strong>ID:</strong> {book._id}</p>
        <p><strong>Title:</strong> {book.title}</p>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Publish Year:</strong> {book.publishYear}</p>
      </Modal>
    </>
  );
};

export default BookSingleCard;