// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

 import { useState, useEffect } from "react";
import BookList from "./BookList";
import AddBook from "./AddBook";

function App() {

  const [books, setBooks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");

  // load books from localStorage
  useEffect(() => {
    const savedBooks = localStorage.getItem("books");
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  }, []);

  // save books whenever updated
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = (book) => {
    if (editIndex !== null) {
      const updated = books.map((b, i) => (i === editIndex ? book : b));
      setBooks(updated);
      setEditIndex(null);
    } else {
      setBooks([...books, book]);
    }
  };

  const deleteBook = (index) => {
    const updated = books.filter((_, i) => i !== index);
    setBooks(updated);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📚 Smart Library System</h2>
      <h4>Total Books: {books.length}</h4>

      <input
      type="text"
      placeholder="Search Book"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

      <AddBook
        addBook={addBook}
        books={books}
        editIndex={editIndex}
        setEditIndex={setEditIndex}
      />

      <BookList
        books={books}
        deleteBook={deleteBook}
        setEditIndex={setEditIndex}
         search={search}
      />
    </div>
  );
}

export default App;