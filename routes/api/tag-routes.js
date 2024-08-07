const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// THE `/api/tags` ENDPOINT

router.get('/', async (req, res) => {
  // FIND ALL TAGS
  // BE SURE TO INCLUDE ITS ASSOCIATED PRODUCT DATA
  try {
    const tagsData = await Tag.findAll({
      include: {
        model: Product,
        through: ProductTag,
        as: 'products'
      }
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // FIND A SINGLE TAG BY ITS `id`
  // BE SURE TO INCLUDE ITS ASSOCIATED PRODUCT DATA
  try {
    const tagsData = await Tag.findByPk(req.params.id, {
      include: {
        model: Product,
        through: ProductTag,
        as: 'products'
      }
    });

    if (!tagsData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // CREATE A NEW TAG
  try {
    const tag = await Tag.create(req.body);

    if (req.body.productIds.length) {
      const tagProductIdArr = req.body.productIds.map((product_id) => ({
        tag_id: tag.id,
        product_id
      }));
      await ProductTag.bulkCreate(tagProductIdArr);
    }

    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // UPDATE A TAG'S NAME BY ITS `id` VALUE
  try {
    const tag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (req.body.productIds && req.body.productIds.length) {
      const tagProducts = await ProductTag.findAll({
        where: { tag_id: req.params.id }
      });

      const tagProductsIds = tagProducts.map(({ product_id }) => product_id);
      const newTagProducts = req.body.productIds
        .filter((product_id) => !tagProductsIds.includes(product_id))
        .map((product_id) => ({
          tag_id: req.params.id,
          product_id
        }));

      const tagProductsToRemove = tagProducts
        .filter(({ product_id }) => !req.body.productIds.includes(product_id))
        .map(({ id }) => id);

      await Promise.all([
        ProductTag.destroy({ where: { id: tagProductsToRemove } }),
        ProductTag.bulkCreate(newTagProducts)
      ]);
    }

    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // DELETE ON TAG BY ITS `id` VALUE
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(deletedTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;