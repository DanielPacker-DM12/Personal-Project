const getProducts = (req, res, next) => {
  req.qpp
    .get("db")
    .getProducts()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => res.status(500).json(err));
};

module.exports = {
  getProducts
};
