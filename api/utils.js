const sortByName = (a, b) => {
  if(a.name < b.name) {
    return -1;
  }

  if(a.name > b.name) {
    return 1;
  }

  return 0;
};

const formatDateToBr = (date) => (
  date.toISOString().substr(0, 10).split('-').reverse().join('/')
);

module.exports = {
  sortByName,
  formatDateToBr,
};
