// IMPORT MODELS
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// PRODUCTS BELONGSTO CATEGORY
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

// CATEGORIES HAVE MANY PRODUCTS
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

// PRODUCTS BELONGTOMANY TAGS (THROUGH PRODUCTTAG)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
  onDelete: 'CASCADE'
});

// TAGS BELONGTOMANY PRODUCTS (THROUGH PRODUCTTAG)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
  onDelete: 'CASCADE'
});

// EXPORT MODELS
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
