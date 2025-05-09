import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Card, Typography } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const { Title } = Typography;

const EditBook = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://bookstore-mern-slfb.onrender.com/books/${id}`)
      .then((response) => {
        form.setFieldsValue({
          title: response.data.title,
          author: response.data.author,
          publishYear: response.data.publishYear,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error('An error happened. Please check the console.');
        console.log(error);
      });
  }, [id, form]);

  const handleEditBook = (values) => {
    setLoading(true);
    axios
      .put(`https://bookstore-mern-slfb.onrender.com/books/${id}`, values)
      .then(() => {
        setLoading(false);
        toast.success('Book updated successfully!');
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
      <Title level={3} style={{ marginTop: 16 }}>Edit Book</Title>
      {loading ? (
        <Spinner />
      ) : (
        <Card style={{ maxWidth: 600, margin: '0 auto' }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleEditBook}
          >
            <Form.Item
              label={<span style={{ fontSize: '1.25rem', color: '#6b7280' }}>Title</span>}
              name="title"
              rules={[{ required: true, message: 'Please enter the title' }]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label={<span style={{ fontSize: '1.25rem', color: '#6b7280' }}>Author</span>}
              name="author"
              rules={[{ required: true, message: 'Please enter the author' }]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label={<span style={{ fontSize: '1.25rem', color: '#6b7280' }}>Publish Year</span>}
              name="publishYear"
              rules={[{ required: true, message: 'Please enter the year' }]}
            >
              <InputNumber size="large" style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: '#38bdf8' }} // Tailwind sky-300
                size="large"
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
    </div>
  );
};

export default EditBook;