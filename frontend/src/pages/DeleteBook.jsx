import React, { useState } from 'react';
import { Typography, Card, Button, Modal } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const { Title } = Typography;

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`https://bookstore-mern-slfb.onrender.com/books/${id}`)
      .then(() => {
        setLoading(false);
        toast.success('A book has been deleted!');
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        toast.error('An error happened. Please check the console.');
        console.log(error);
      });
  };

  return (
    <div style={{ padding: 16 }}>
      <BackButton />
      <Title level={3} style={{ marginTop: 16 }}>Delete Book</Title>
      {loading ? (
        <Spinner />
      ) : (
        <Card
          style={{
            maxWidth: 600,
            margin: '0 auto',
            padding: 24,
            border: '2px solid #38bdf8',
            textAlign: 'center',
          }}
        >
          <Title level={4}>Are you sure you want to DELETE this book?</Title>
          <Button
            type="primary"
            danger
            size="large"
            style={{ width: '100%', marginTop: 32 }}
            onClick={() => setConfirmVisible(true)}
          >
            Yes, Delete it
          </Button>
        </Card>
      )}

      <Modal
        open={confirmVisible}
        onCancel={() => setConfirmVisible(false)}
        onOk={handleDeleteBook}
        okText="Delete"
        okButtonProps={{ danger: true }}
        cancelText="Cancel"
      >
        <p>Do you really want to delete this book?</p>
      </Modal>
    </div>
  );
};

export default DeleteBook;