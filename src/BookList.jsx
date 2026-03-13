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

function BookList({ books, deleteBook, setEditIndex }) {

  return (
    <div>

      <h3>Book List</h3>

      {books.length === 0 ? (
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

            {books.map((book, index) => (
              <tr key={index}>

                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.quantity}</td>

                <td>

                  <button onClick={() => setEditIndex(index)}>
                    Edit
                  </button>

                  <button onClick={() => deleteBook(index)}>
                    Delete
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