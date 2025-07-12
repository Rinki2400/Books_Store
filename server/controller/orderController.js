
const User = require('../model/userModel.js')
const books = require('../model/bookModel.js')


const addBooksToFab = async (req, res) => {
  try {
    const { id, BookId } = req.params;
    const userData = await User.findById(id);
    if (!userData || userData.role !== "User") {
      return res.status(403).json({
        message: "Access denied! Only Users can add books to favorites.",
      });
    }
    const book = await books.findById(BookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }
    if (userData.favourities && userData.favourities.includes(BookId)) {
      return res.status(400).json({ message: "Book already in favorites." });
    }
    userData.favourities = userData.favourities || [];
    userData.favourities.push(BookId);
    await userData.save();
    return res.status(200).json({
      message: "Book added to favorites successfully.",
      favourities: userData.favourities,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports={addBooksToFab}