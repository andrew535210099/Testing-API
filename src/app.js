//Import the necessary dependencies
const http = require('http')
// Define a prot at which the server will run
const PORT = 4000

const productsService = require("./productsService");
const getRequestData = require('./utils');

const server = http.createServer(async (req, res) => {
  // Get all products
  if(req.url === '/products' && req.method == 'GET'){
    const products = await productsService.getProducts();
    res.setHeader("Content-type", "application/json");
    res.end(products)
  }

  // Get a product with specified id
  if (req.url.match(/\/products\/([0-9]+)/) && req.method == 'GET') {
    const id = parseInt(req.url.split('/')[2], 10); // Convert the ID to a number
    const product = await productsService.getProductsById(id);
  
    res.setHeader("Content-type", "application/json");
    res.end(product); 

  }
  
  // Create a new product
  if(req.url === '/products' && req.method == 'POST'){
    const product = await getRequestData(req);
    const newProduct = await productsService.saveProduct(product);
    res.setHeader("Content-type", "application/json");
    res.end(newProduct)
  }
  // Update a specific product
  if(req.url.match(/\/products\/([0-9]+)/) && req.method == 'PUT'){
    const id = req.url.split('/')[2];
    const product = await getRequestData(req);
    const updatedProduct = await productsService.updateProduct(id, product);
    res.setHeader("Content-type", "application/json");
    res.end(updatedProduct)
  }
  // Delete a specific Product
  if(req.url.match(/\/products\/([0-9]+)/) && req.method == 'DELETE'){
    const id = req.url.split('/')[2];
    const deletedProduct = await productsService.deleteProduct(id);
    res.setHeader("Content-type", "application/json");
    res.end(deletedProduct)
  }
});

// listen for client requests
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
})