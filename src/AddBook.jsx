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

function AddBook({ addBook, books, editIndex, setEditIndex }) {

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (editIndex !== null) {
      const book = books[editIndex];
      setTitle(book.title);
      setAuthor(book.author);
      setCategory(book.category);
      setQuantity(book.quantity);
    }
  }, [editIndex]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !author || !category || !quantity) return;

    addBook({ title, author, category, quantity });

    setTitle("");
    setAuthor("");
    setCategory("");
    setQuantity("");
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button type="submit">
        {editIndex !== null ? "Update" : "Add"}
      </button>

    </form>
  );
}

export default AddBook;