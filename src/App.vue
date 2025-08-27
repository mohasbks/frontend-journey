<template>
  <div class="container-fluid">
    <Navbar :cartCount="cartCount" />
    
    <div v-if="discount > 0" class="alert alert-success mt-3" role="alert">
      🎉 Special Discount: {{ discount }}% off on all products!
    </div>
    
    <div class="d-flex justify-content-between align-items-center my-4">
      <h2>Our Products</h2>
      <button 
        @click="showProducts = !showProducts" 
        class="btn btn-outline-primary"
      >
        {{ showProducts ? 'Hide Products' : 'Show Products' }}
      </button>
    </div>
    
    <div v-show="showProducts">
      <div v-if="products.length === 0" class="alert alert-info text-center">
        <h4>No products available</h4>
        <p>Please check back later for new products.</p>
      </div>
      
      <div v-else class="row">
        <div 
          v-for="product in products" 
          :key="product.id"
          class="col-12 col-md-6 col-lg-4 mb-4"
        >
          <ProductCard 
            :product="product" 
            @add-to-cart="addToCart"
          />
        </div>
      </div>
    </div>
    
    <div class="mt-5">
      <Cart 
        :cart="cart" 
        :totalPrice="totalPrice"
        @remove-from-cart="removeFromCart"
      />
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import ProductCard from './components/ProductCard.vue'
import Cart from './components/Cart.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    ProductCard,
    Cart
  },
  data() {
    return {
      cartCount: 0,
      showProducts: true,
      discount: 10,
      cart: [],
      products: [
        {
          id: 1,
          name: "Wireless Headphones",
          price: 99.99,
          inStock: true,
          description: "High-quality wireless headphones with noise cancellation feature.",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop&crop=center"
        },
        {
          id: 2,
          name: "Smart Watch",
          price: 249.99,
          inStock: false,
          description: "Feature-rich smartwatch with fitness tracking and notifications.",
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop&crop=center"
        },
        {
          id: 3,
          name: "Laptop Stand",
          price: 45.50,
          inStock: true,
          description: "Ergonomic laptop stand for better posture and productivity.",
          image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop&crop=center"
        },
        {
          id: 4,
          name: "Bluetooth Speaker",
          price: 79.99,
          inStock: true,
          description: "Portable Bluetooth speaker with excellent sound quality.",
          image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=200&fit=crop&crop=center"
        },
        {
          id: 5,
          name: "Gaming Mouse",
          price: 65.00,
          inStock: false,
          description: "High-precision gaming mouse with customizable buttons.",
          image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=200&fit=crop&crop=center"
        },
        {
          id: 6,
          name: "Phone Case",
          price: 19.99,
          inStock: true,
          description: "Protective phone case with premium materials and design.",
          image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=200&fit=crop&crop=center"
        }
      ]
    }
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((total, product) => total + product.price, 0).toFixed(2)
    }
  },
  methods: {
    addToCart(product) {
      if (product.inStock) {
        this.cart.push({ ...product })
        this.cartCount++
        alert(`${product.name} has been added to your cart!`)
      } else {
        alert(`Sorry, ${product.name} is currently out of stock.`)
      }
    },
    removeFromCart(index) {
      if (index >= 0 && index < this.cart.length) {
        const removedProduct = this.cart[index]
        this.cart.splice(index, 1)
        this.cartCount--
        alert(`${removedProduct.name} has been removed from your cart.`)
      }
    }
  }
}
</script>

<style scoped>
.container-fluid {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}
</style>
