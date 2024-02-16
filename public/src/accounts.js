function findAccountById(accounts, id) {
  for (let account in accounts) {
    if (id === accounts[account].id) return accounts[account];
  }
}

function sortAccountsByLastName(accounts) {
  let sorted = accounts.sort((accountA, accountB) => {
    let lastNameA = accountA.name.last;
    let lastNameB = accountB.name.last;

    return lastNameA.localeCompare(lastNameB);
  });
  return sorted;
}

function getTotalNumberOfBorrows(account, books) {
  let count = 0;
  books.forEach((book) => {
    book.borrows.forEach((borrow) => {
      if (borrow.id === account.id) count += 1;
    });
  });
  return count;
}

function getBooksPossessedByAccount(account, books, authors) {
  let arr = [];
  for (let id in books) {
    if (
      books[id].borrows.some(
        (borrow) => account.id === borrow.id && borrow.returned === false
      )
    ) {
      for (let index in authors) {
        if (authors[index].id === books[id].authorId) {
          arr.push({ ...books[id], author: authors[index] });
        }
      }
    }
  }
  return arr;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
