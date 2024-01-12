// Import the necessary dependencies
const lodash = require("lodash");
const productsList = require("./products.json").products;


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
const saveProduct = (newProduct, done) => {
   newProduct.id = Date.now(); // Assign a unique ID (timestamp in this case)
   productsList.push(newProduct);
 
   return done(null, JSON.stringify(productsList));
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
  let updatedProductList = lodash.filter(productsList, (product) => {
    return product.id !== productId;
  });

  done(null, JSON.stringify(updatedProductList));
}
module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct
}