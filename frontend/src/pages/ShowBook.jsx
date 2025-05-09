import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, Typography, Divider } from 'antd';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const { Title, Text } = Typography;

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://bookstore-mern-slfb.onrender.com/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div style={{ padding: '1rem' }}>
      <BackButton />
      <Title level={2} style={{ marginTop: '1rem' }}>Book details</Title>
      {loading ? (
        <Spinner />
      ) : (
        <Card bordered style={{ maxWidth: 600 }}>
          <Divider />
          <Text type="secondary">ID: </Text><Text>{book._id}</Text>
          <Divider />
          <Text type="secondary">Title: </Text><Text>{book.title}</Text>
          <Divider />
          <Text type="secondary">Author: </Text><Text>{book.author}</Text>
          <Divider />
          <Text type="secondary">Publish Year: </Text><Text>{book.publishYear}</Text>
          <Divider />
          <Text type="secondary">Create Time: </Text><Text>{new Date(book.createdAt).toString()}</Text>
          <Divider />
          <Text type="secondary">Last Update Time: </Text><Text>{new Date(book.updatedAt).toString()}</Text>
        </Card>
      )}
    </div>
  );
};

export default ShowBook;