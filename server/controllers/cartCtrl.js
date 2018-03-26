const addToCart = (req, res, next) => {
  req.app
    .get("db")
    .addToCart([req.user.id, req.params.id])
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err));
};

module.exports = {
  addToCart
};
