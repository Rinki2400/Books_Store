const books = require("../model/bookModel");

const userdetail = require("../model/userModel"); // import user model if not already

const addBooks = async (req, res) => {
  try {
    const { id } = req.params; 

    const user = await userdetail.findById(id);

    if (!user || user.role !== "Admin") {
      return res.status(403).json({
        message: "Access denied. Only Admin can add books.",
      });
    }

    const bookData = req.body;
    const newBook = new books(bookData);
    const savedBook = await newBook.save();

    res.status(201).json({
      message: "Book added successfully",
      book: savedBook,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { addBooks };



