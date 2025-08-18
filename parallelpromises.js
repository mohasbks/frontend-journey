const fetchProducts = async () => {
  const urls = [
    'https://dummyjson.com/products/1',
    'https://dummyjson.com/products/2'
  ];
  
  const responses = await Promise.all(urls.map(url => fetch(url)));
  const products = await Promise.all(responses.map(response => response.json()));
  
  products.forEach(product => console.log(product.title));
};

fetchProducts();
