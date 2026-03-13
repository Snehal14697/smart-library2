// import axios from "axios";
// import { useState } from "react";

// function AddBook() {

//   const [book, setBook] = useState({
//     title: "",
//     author: "",
//     category: "",
//     quantity: 0,
//     availableQuantity: 0
//   });

//   const addBook = () => {
//     axios.post("http://localhost:8080/api/books", book)
//       .then(() => {
//         alert("Book Added Successfully");
//         window.location.reload();
//       });
//   };

//   return (
//     <div>
//       <h3>Add Book</h3>
//       <input placeholder="Title"
//         onChange={e => setBook({ ...book, title: e.target.value })} />
//       <br />

//       <input placeholder="Author"
//         onChange={e => setBook({ ...book, author: e.target.value })} />
//       <br />

//       <input placeholder="Category"
//         onChange={e => setBook({ ...book, category: e.target.value })} />
//       <br />

//       <input type="number" placeholder="Quantity"
//         onChange={e => setBook({ ...book, quantity: e.target.value })} />
//       <br />

//       <button onClick={addBook}>Add Book</button>
//       <hr />
//     </div>
//   );
// }

// export default AddBook;
import { useState, useEffect } from "react";
import axios from "axios";

function AddBook({ fetchBooks, selectedBook, setSelectedBook }) {
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    quantity: ""
  });

  useEffect(() => {
    if (selectedBook) {
      setBook({
        title: selectedBook.title,
        author: selectedBook.author,
        category: selectedBook.category,
        quantity: selectedBook.quantity
      });
    }
  }, [selectedBook]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  if (book.quantity <= 0) {
    alert("Quantity must be greater than 0");
    return;
  }

  if (selectedBook) {

    axios.put(`http://localhost:8080/api/books/${selectedBook.bookId}`, {
      ...book,
      availableQuantity: book.quantity
    })
    .then(() => {
      alert("Book Updated Successfully");
      setSelectedBook(null);
      fetchBooks();
    });

  } else {

    axios.post("http://localhost:8080/api/books", {
      ...book,
      availableQuantity: book.quantity
    })
    .then(() => {
      alert("Book Added Successfully");
      setBook({ title: "", author: "", category: "", quantity: "" });
      fetchBooks();
    });

  }
};

  return (
    <div className="add-book-container">
      <h3>Add Book</h3>
      <form onSubmit={handleSubmit} className="book-form">

        <input
          name="title"
          placeholder="Title"
          value={book.title}
          onChange={handleChange}
          required
        />

        <input
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category"
          value={book.category}
          onChange={handleChange}
          required
        />

        {/* ✅ New Quantity Field */}
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={book.quantity}
          onChange={handleChange}
          required
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddBook;