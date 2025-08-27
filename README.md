# Vue.js Lab Project

A complete Vue.js shopping cart application demonstrating all Vue directives, components, props, emits, methods, and computed properties.

## Project Structure

```
src/
├── main.js           → Vue app entry point
├── App.vue           → Parent component
└── components/
    ├── Navbar.vue      → Global navigation component
    ├── ProductCard.vue → Product display component
    └── Cart.vue        → Shopping cart component
```

## Features Implemented

### ✅ Required Components
- **Navbar.vue**: Global component displaying store name and cart count
- **ProductCard.vue**: Local component for individual products with props and emits
- **Cart.vue**: Optional cart component with remove functionality

### ✅ Data Properties
- `products`: Array of product objects with id, name, price, inStock, description, image
- `cartCount`: Number (default 0)
- `showProducts`: Boolean (default true)
- `discount`: Number (example 10)
- `cart`: Array storing added products

### ✅ Vue Directives Used
- `v-for`: Loop through products array
- `v-if/v-else-if/v-else`: Stock status conditions
- `v-show`: Toggle product list visibility
- `:class`: Dynamic classes based on stock status
- `v-bind`: Bind dynamic attributes like src for images
- `v-on/@click`: Event handling
- `v-text`: Text content binding

### ✅ Methods
- `addToCart(product)`: Adds product to cart, increments cartCount, shows alert
- `removeFromCart(index)`: Removes product from cart, decrements cartCount

### ✅ Computed Properties
- `totalPrice`: Sum of prices of products in cart

### ✅ Props & Emits
- **Navbar**: Receives `cartCount` prop
- **ProductCard**: Receives `product` prop, emits `add-to-cart`
- **Cart**: Receives `cart` and `totalPrice` props, emits `remove-from-cart`

### ✅ Extra Features
- "No products available" message when products array is empty
- Dynamic stock status with color coding (in-stock: green, limited-stock: orange, out-of-stock: grey)
- Discount message only shows if discount > 0
- Bootstrap grid layout (3 columns on large screens)
- Responsive design with Bootstrap classes

## How to Run

1. Open `index.html` in a web browser
2. Or use a local server like Live Server extension in VS Code

## Technologies Used
- Vue.js 3
- Bootstrap 5
- Modern ES6+ JavaScript
- CSS3 with custom styles
