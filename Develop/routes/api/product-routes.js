const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  Product.findAll({
    include: [{model:Category}, {model: Tag, through: ProductTag, as: 'productid'}],
  })
  .then((products) => res.json(products))
  .catch((err) => res.status(500).json(err));
  // be sure to include its associated Category and Tag data
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  Product.findOne({
    where: {
      id: req.params.id,
    },
    include: [{model:Category}, {model: Tag, through: ProductTag, as: 'productid'}],
  })
  .then((product) => res.json(product))
  .catch((err) => res.status(400).json(err));
  // be sure to include its associated Category and Tag data
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => res.status(200).json(product))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((product) => res.status(200).json(product))
  .catch((err) => res.status(400).json(err));
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((product) => res.status(200).json(product))
  .catch((err) => res.status(400).json(err));
});

module.exports = router;
