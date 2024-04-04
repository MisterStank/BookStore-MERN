import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BookTable from "../components/home/BookTable";
import BookCard from "../components/home/BookCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("card");
  const handleToggle = () => {
    setShowType((prevShowType) =>
      prevShowType === "table" ? "card" : "table"
    );
  };
  axios.defaults.withCredentials=true;
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://book-store-mern-api-eight.vercel.app/books")
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
      <label className="font-thin mx-3">change view</label>
      <div className="relative w-28 h-10 bg-gray-200 rounded-full p-1 flex justify-center items-center gap-x-4 shadow-md">
        <button
          className={`absolute top-0 left-0 w-1/2 h-full font-semibold text-white bg-sky-300 rounded-full transition-transform ${
            showType === "table"
              ? "transform translate-x-0"
              : "transform translate-x-full"
          }`}
          onClick={handleToggle}
        >
          {showType === "table" ? "Table" : "Card"}
          
        </button>
        {showType === 'table' && <span className="ml-14">Card</span>}
        {showType === 'card' && <span className="mr-14">Table</span>}
        <button
          className={`absolute top-0 right-0 w-1/2 h-full font-semibold text-white bg-sky-300 rounded-full transition-transform ${
            showType === "card"
              ? "transform translate-x-0"
              : "transform -translate-x-full"
          }`}
          onClick={handleToggle}
        >
          {showType === "card" ? "Card" : "Table"}
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BookTable books={books} />
      ) : (
        <BookCard books={books} />
      )}
    </div>
  );
};

export default Home;
