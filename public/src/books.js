function findAuthorById(authors, id) {
  for (let author in authors) {
    if (authors[author].id === id) return authors[author];
  }
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let checkedOut = [];
  let returned = [];

  books.forEach((book) => {
    const checkedOutBorrows = book.borrows.filter((borrow) => !borrow.returned);

    if (checkedOutBorrows.length > 0) {
      checkedOut.push(book);
    } else {
      returned.push(book);
    }
  });

  return [checkedOut, returned];
}

function getBorrowersForBook(book, accounts) {
  const borrowers = book.borrows.map((transaction) => {
    const { id, returned } = transaction;
    const borrower = accounts.find((account) => account.id === id);
    return { ...borrower, returned };
  });

  return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
