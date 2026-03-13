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

import { useState } from "react";
import axios from "axios";
import BookList from "./BookList";
import AddBook from "./AddBook";

function App() {

  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);

  const fetchBooks = () => {
    axios.get("http://localhost:8080/api/books")
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📚 Smart Library System</h2>

      <AddBook
        selectedBook={selectedBook}
        setSelectedBook={setSelectedBook}
        fetchBooks={fetchBooks}
      />

      <BookList
        books={books}
        fetchBooks={fetchBooks}
        setSelectedBook={setSelectedBook}
      />

    </div>
  );
}

export default App;