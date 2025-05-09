import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Input, Button } from 'antd';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post('https://bookstore-mern-slfb.onrender.com/books', data)
      .then(() => {
        setLoading(false);
        toast.success('A book has been created!');
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        toast.error('An error happened. Please Check console');
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
            size="large"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <Input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full"
            size="large"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <Input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="w-full"
            size="large"
          />
        </div>
        <Button
          type="primary"
          className="m-8"
          style={{ backgroundColor: '#38bdf8' }}
          onClick={handleSaveBook}
          loading={loading}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default CreateBooks;