function getTotalCount(items) {
  return items.length;
}

function getTotalBooksCount(books) {
  return getTotalCount(books);
}

function getTotalAccountsCount(accounts) {
  return getTotalCount(accounts);
}

function getBorrowedCount(book) {
  return book.borrows.reduce((borrowCount, borrow) => {
    return borrow.returned ? borrowCount : borrowCount + 1;
  }, 0);
}

function getBooksBorrowedCount(books) {
  return books.reduce((totalBorrowed, book) => {
    return totalBorrowed + getBorrowedCount(book);
  }, 0);
}

function getMostCommonGenres(books) {
  const allGenres = books.map((book) => book.genre);

  let result = [];
  allGenres.forEach((element) => {
    let answer = result.find((res) => res.name === element);
    if (answer != null) {
      answer.count++;
    }

    result.push({ name: element, count: 1 });
  });

  return result.sort((a, b) => b.count - a.count).slice(0, 5);
}

function getMostPopularBooks(books) {
  const popularBooks = books.map((book) => {
    return { name: book.title, count: book.borrows.length };
  });

  return popularBooks
    .sort((bookA, bookB) => bookB.count - bookA.count)
    .slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const authorBorrowCounts = {};

  books.forEach((book) => {
    const authorId = book.authorId;
    const author = authors.find((author) => author.id === authorId);
    const authorName = `${author.name.first} ${author.name.last}`;

    if (!authorBorrowCounts[authorName]) {
      authorBorrowCounts[authorName] = 0;
    }

    authorBorrowCounts[authorName] += book.borrows.length;
  });

  const popularAuthors = Object.entries(authorBorrowCounts).map(
    ([name, count]) => ({ name, count })
  );

  popularAuthors.sort((a, b) => b.count - a.count);

  return popularAuthors.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
