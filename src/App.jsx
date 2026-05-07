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
import AddBook from "./AddBook";
import BookList from "./BookList";

function App() {
  const [books, setBooks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");

  // ✅ Fetch books from backend
  useEffect(() => {
     fetch("http://localhost:8080/api/books") 
      .then(res => res.json())
      .then(data => {
        console.log("API data:", data);
        setBooks(data);
      })
      .catch(err => console.error(err));
  }, []);

  // ❌ localStorage remove केले

  const addBook = (book) => {
    setBooks([...books, book]);
  };

  const deleteBook = (index) => {
    const bookId = books[index].bookid;

    fetch(`http://localhost:8080/api/books/${bookId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updated = books.filter((_, i) => i !== index);
        setBooks(updated);
      })
      .catch(err => console.error(err));
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