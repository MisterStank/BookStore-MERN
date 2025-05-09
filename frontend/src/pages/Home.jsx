import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Switch, Typography, Spin } from "antd";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BookTable from "../components/home/BookTable";
import BookCard from "../components/home/BookCard";

const { Title } = Typography;

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("card");

  const handleToggle = () => {
    setShowType((prevShowType) => (prevShowType === "table" ? "card" : "table"));
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://bookstore-mern-slfb.onrender.com/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <Title level={2}>Books List</Title>
        <Link to="/books/create">
          <Button type="primary" icon={<MdOutlineAddBox fontSize={28}/>} shape="default" size="large" style={{ backgroundColor: '#38bdf8' }}/>
        </Link>
      </div>

      <div className="my-4">
        <span className="font-thin mx-3">Change view</span>
        <Switch
          checked={showType === "table"}
          onChange={handleToggle}
          checkedChildren="Table"
          unCheckedChildren="Card"
          style={{ backgroundColor: '#38bdf8' }}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : showType === "table" ? (
        <BookTable books={books} />
      ) : (
        <BookCard books={books} />
      )}
    </div>
  );
};

export default Home;