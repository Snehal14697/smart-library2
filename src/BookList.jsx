// import axios from "axios";
// import { useEffect, useState } from "react";

// function BookList({ setSelectedBook })  {
//   const [books, setBooks] = useState([]);

//   const fetchBooks = () => {
//   axios.get("http://localhost:8080/api/books")
//     .then(res => setBooks(res.data))
//     .catch(err => console.error(err));
// };

// useEffect(() => {
//   fetchBooks();
// }, []);

// // const deleteBook = (id) => {
// //   axios.delete(`http://localhost:8080/api/books/${id}`)
// //     .then(() => fetchBooks())
// //     .catch(err => console.error(err));
// // };
  
//   const searchBook = (title) => {
//   if (title === "") {
//     fetchBooks();
//   } else {
//     axios
//       .get(`http://localhost:8080/api/books/search/${title}`)
//       .then(res => setBooks(res.data))
//       .catch(err => console.error(err));
//   }
// };
// const deleteBook = (id) => {

//   if (window.confirm("Are you sure you want to delete this book?")) {

//     axios.delete(`http://localhost:8080/api/books/${id}`)
//       .then(() => {
//         alert("Book Deleted Successfully");
//         fetchBooks();
//       })
//       .catch(err => console.error(err));

//   }

// };

//   return (
//     <div>
//       <h3>Book List</h3>
//       <input
//   type="text"
//   placeholder="Search by Title"
//   onChange={(e) => searchBook(e.target.value)}
//   style={{
//     marginBottom: "15px",
//     padding: "6px",
//     width: "220px"
//   }}
// />
//       <table border="1">
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Author</th>
//             <th>Category</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//   {books.length > 0 ? (
//     books.map(book => (
//       <tr key={book.bookId}>
//         <td>{book.title}</td>
//         <td>{book.author}</td>
//         <td>{book.category}</td>
//         <td>
//           <button onClick={() => setSelectedBook(book)}>
//             Edit
//           </button>

//           <button onClick={() => deleteBook(book.bookId)}>
//             Delete
//           </button>
//         </td>
//       </tr>
//     ))
//   ) : (
//     <tr>
//       <td colSpan="4">No Books Found</td>
//     </tr>
//   )}
// </tbody>
//       </table>
//     </div>
//   );
// }

// export default BookList;
import React, { useState } from "react";

function BookList({ books, deleteBook, setEditIndex, search }) {
  const [message, setMessage] = useState("");

  // Delete handler
  const handleDelete = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirmDelete) {
      deleteBook(index);
      setMessage("Book deleted successfully ✅");
    } else {
      setMessage("Delete cancelled ❌");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  // Filter books based on search and keep original index
  const filteredBooks = books
    .map((book, index) => ({ ...book, originalIndex: index }))
    .filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div>
      <h3>Book List</h3>
      {message && (
        <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>
      )}

      {filteredBooks.length === 0 ? (
        <p>No Books Found</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.originalIndex}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.quantity}</td>
                <td>
                  <button
                    onClick={() => setEditIndex(book.originalIndex)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book.originalIndex)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookList;