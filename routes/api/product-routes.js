const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// THE `/api/products` ENDPOINT

// get all products
router.get('/', async (req, res) => {
  // FIND ALL PRODUCTS
  // BE SURE TO INCLUDE ITS ASSOCIATED CATEGORY AND TAG DATA
  try {
    const productsData = await Product.findAll({
      include: [
        {
          model: Category,
          as: 'category'
        },
        {
          model: Tag,
          through: ProductTag,
          as: 'tags'
        }
      ] 
    });
    res.status(200).json(productsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ONE PRODUCT
router.get('/:id', async (req, res) => {
  // FIND A SINGLE PRODUCT BY ITS `id`
  // BE SURE TO INCLUDE ITS ASSOCIATED CATEGORY AND TAG DATA
  try {
    const productsData = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          as: 'category'
        },
        {
          model: Tag,
          through: ProductTag,
          as: 'tags'
        }
      ] 
    });

    if(!productsData) {
      res.status(404).json({message: 'No product found with this id'});
      return;
    }

    res.status(200).json(productsData);
  } catch (err) {
    res.status(500).json(err);
  }
  });

// CREATE NEW PRODUCT
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
    .then((product) => {
      // IF THERE'S PRODUCT TAGS, WE NEED TO CREATE PAIRINGS TO BULK CREATE IN THE PRODUCTTAG MODEL
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // IF NO PRODUCT TAGS, JUST RESPOND
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// UPDATE PRODUCT
router.put('/:id', (req, res) => {
  // UPDATE PRODUCT DATA
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // CREATE FILTERED LIST OF NEW TAG_IDS
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });

          // FIGURE OUT WHICH ONES TO REMOVE
          const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
          // RUN BOTH ACTIONS
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  /// DELETE ONE PRODUCT BY ITS `id` VALUE
  try {
    const deletedProduct = await Product.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
