// Import the necessary dependencies
const lodash = require("lodash");
const productsList = require("./products.json").products;
const getRequestData = require('./utils')

const getProducts = () => {
  // get all products
  return JSON.stringify(productsList);
}

const getProductsById = (productId, done) => {
  const product = productsList.find(product => product.id === productId);

  if(product){
    return JSON.stringify(product)
  }else{
    return null
  }
}

const saveProduct = async (newProduct, done) => {
  try {
    // Assuming newProduct is a valid product object
    productsList.push(newProduct);

    return JSON.stringify(productsList)
  } catch (error) {
    return error
  }
}


const updateProduct = (productId, updateData, done) => { 
  let updatedProductList = lodash.map(productsList, (product) => {
    if (product.id === productId) {
      // update the product with the specified id
      return lodash.merge(product, updateData);
    }
    return product;
  });

  done(null, JSON.stringify(updatedProductList));
}

const deleteProduct = (productId, done) => {
  // delete a product
  const product = productsList.find(product => product.id === productId);
  let updatedProductList = lodash.filter(productsList, (product) => {
    return product.id !== productId;
  });

  return JSON.stringify(product)
}
module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct
}