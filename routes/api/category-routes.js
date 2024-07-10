const router = require('express').Router();
const { Category, Product } = require('../../models');

// THE `/api/categories` ENDPOINT

router.get('/', async (req, res) => {
  // FIND ALL CATEGORIES
  // BE SURE TO INCLUDE ITS ASSOCIATED PRODUCTS
  try {
    const categoriesData = await Category.findAll({
      include: {
        model: Product,
        as: 'products'
      }
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // FIND ONE CATEGORY BY ITS `id` VALUE
  // BE SURE TO INCLUDE ITS ASSOCIATED PRODUCTS
  try {
    const categoriesData = await Category.findByPk(req.params.id, {
      include: {
        model: Product,
        as: 'products'
      }
    });

    if(!categoriesData) {
      res.status(404).json({message: 'No category found with this id'});
      return;
    }

    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
 // CREATE A NEW CATEGORY
  try {
    const categoriesData = await Category.create(req.body);
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // UPDATE A CATEGORY BY ITS `id` VALUE
  try {
    const updatedCategory = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    );

    res.status(200).json(updatedCategory);
  } catch (err) {
    req.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // DELETE A CATEGORY BY ITS `id` VALUE
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
