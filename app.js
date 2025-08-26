const { createApp, ref, computed } = Vue;

const app = createApp({
  setup() {
    const cartCount = ref(0);
    const showProducts = ref(true);
    const discount = ref(10);
    const products = ref([
      {
        id: 1,
        name: 'MacBook Pro',
        price: 1299.99,
        inStock: true,
        description: 'Powerful laptop with M2 chip for professionals',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop'
      },
      {
        id: 2,
        name: 'iPhone 15 Pro',
        price: 999.99,
        inStock: true,
        description: 'Latest iPhone with titanium design and A17 Pro chip',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop'
      },
      {
        id: 3,
        name: 'AirPods Pro',
        price: 249.99,
        inStock: false,
        description: 'Premium wireless earbuds with active noise cancellation',
        image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=300&fit=crop'
      },
      {
        id: 4,
        name: 'Apple Watch Ultra',
        price: 799.99,
        inStock: true,
        description: 'Rugged smartwatch for extreme sports and adventures',
        image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&h=300&fit=crop'
      },
      {
        id: 5,
        name: 'iPad Pro',
        price: 1099.99,
        inStock: true,
        description: 'Professional tablet with M2 chip and Liquid Retina display',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop'
      },
      {
        id: 6,
        name: 'Gaming Mouse',
        price: 79.99,
        inStock: true,
        description: 'High-precision gaming mouse with RGB lighting',
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop'
      },
      {
        id: 7,
        name: 'Mechanical Keyboard',
        price: 149.99,
        inStock: false,
        description: 'Premium mechanical keyboard with Cherry MX switches',
        image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop'
      },
      {
        id: 8,
        name: 'Wireless Charger',
        price: 39.99,
        inStock: true,
        description: 'Fast wireless charging pad for all Qi-enabled devices',
        image: 'https://images.unsplash.com/photo-1609592919311-ead6a95e7636?w=400&h=300&fit=crop'
      },
      {
        id: 9,
        name: 'USB-C Hub',
        price: 69.99,
        inStock: true,
        description: '7-in-1 USB-C hub with 4K HDMI, USB 3.0, and SD card reader',
        image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=300&fit=crop'
      }
    ]);

    const cartItems = ref([]);
    const totalPrice = computed(() => {
      return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
    });

    const addToCart = (product) => {
      if (!product.inStock) return;
      
      const existingItem = cartItems.value.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cartItems.value.push({ ...product, quantity: 1 });
      }
      
      cartCount.value++;
      alert(`${product.name} added to cart!`);
    };

    const removeFromCart = (productId) => {
      const index = cartItems.value.findIndex(item => item.id === productId);
      if (index !== -1) {
        if (cartItems.value[index].quantity > 1) {
          cartItems.value[index].quantity--;
        } else {
          cartItems.value.splice(index, 1);
        }
        cartCount.value--;
      }
    };

    const toggleProducts = () => {
      showProducts.value = !showProducts.value;
    };


    return {
      cartCount,
      showProducts,
      discount,
      products,
      cartItems,
      totalPrice,
      addToCart,
      removeFromCart,
      toggleProducts
    };
  },
  template: `
    <div class="app">
      <nav class="navbar navbar-expand-lg mb-4 fixed-top">
        <div class="container">
          <a class="navbar-brand" href="#">
            <i class="fas fa-shopping-bag me-2"></i>Vue Shop
          </a>
          <div class="d-flex align-items-center">
            <div class="dropdown me-3">
              <button class="btn btn-light position-relative shadow-sm" type="button" data-bs-toggle="dropdown">
                <i class="fas fa-shopping-cart me-2"></i>Cart
                <span v-if="cartCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill cart-badge">
                  {{ cartCount }}
                </span>
              </button>
              <div class="dropdown-menu dropdown-menu-end p-3 cart-dropdown" style="min-width: 320px;">
                <h6 class="dropdown-header">
                  <i class="fas fa-shopping-cart me-2"></i>Your Cart
                </h6>
                <div v-if="cartItems.length === 0" class="text-muted text-center py-3">
                  <i class="fas fa-cart-plus fa-2x mb-2 d-block"></i>
                  Your cart is empty
                </div>
                <div v-else>
                  <div v-for="item in cartItems" :key="item.id" class="d-flex justify-content-between align-items-center mb-3 p-2 bg-light rounded">
                    <div>
                      <strong>{{ item.name }}</strong><br>
                      <small class="text-muted">$ {{ item.price }} x {{ item.quantity }}</small>
                    </div>
                    <button @click.stop="removeFromCart(item.id)" class="btn btn-sm btn-outline-danger rounded-circle">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                  <hr>
                  <div class="d-flex justify-content-between align-items-center">
                    <strong class="h5 mb-0">Total:</strong>
                    <strong class="h5 mb-0 text-success">$ {{ totalPrice.toFixed(2) }}</strong>
                  </div>
                  <button class="btn btn-success w-100 mt-2">
                    <i class="fas fa-credit-card me-2"></i>Checkout
                  </button>
                </div>
              </div>
            </div>
            <button @click="toggleProducts" class="btn toggle-btn text-white">
              <i :class="showProducts ? 'fas fa-eye-slash' : 'fas fa-eye'" class="me-2"></i>
              {{ showProducts ? 'Hide' : 'Show' }} Products
            </button>
          </div>
        </div>
      </nav>

      <div class="container" style="margin-top: 100px;">
        <div v-if="discount > 0" class="alert discount-banner text-white text-center mb-4">
          <i class="fas fa-fire me-2"></i>
          <strong>Special Offer! {{ discount }}% off on all products!</strong>
          <i class="fas fa-fire ms-2"></i>
        </div>

        <transition name="fade">
          <div v-show="showProducts">
            <div v-if="products.length === 0" class="alert alert-warning text-center">
              <i class="fas fa-exclamation-triangle me-2"></i>
              No products available
            </div>
            <div v-else class="row g-4">
              <div v-for="product in products" :key="product.id" class="col-lg-4 col-md-6">
                <div class="card product-card h-100">
                  <div class="position-relative overflow-hidden">
                    <img :src="product.image" class="card-img-top product-image" :alt="product.name" style="height: 250px; object-fit: cover;">
                    <div class="position-absolute top-0 end-0 m-2">
                      <span v-if="!product.inStock" class="badge bg-danger">
                        <i class="fas fa-times me-1"></i>Out of Stock
                      </span>
                      <span v-else-if="product.price < 50" class="badge bg-warning">
                        <i class="fas fa-exclamation me-1"></i>Limited Stock
                      </span>
                      <span v-else class="badge bg-success">
                        <i class="fas fa-check me-1"></i>In Stock
                      </span>
                    </div>
                  </div>
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title fw-bold" :class="{ 'text-muted': !product.inStock }">
                      {{ product.name }}
                    </h5>
                    <p class="card-text text-muted mb-3">{{ product.description }}</p>
                    <div class="mb-3">
                      <span class="price-tag">
                        <i class="fas fa-dollar-sign me-1"></i>{{ product.price }}
                      </span>
                    </div>
                    <div class="mt-auto">
                      <button 
                        @click="addToCart(product)" 
                        :disabled="!product.inStock"
                        class="btn btn-cart text-white w-100"
                        :class="{ 'btn-secondary': !product.inStock }"
                      >
                        <i v-if="product.inStock" class="fas fa-cart-plus me-2"></i>
                        <i v-else class="fas fa-ban me-2"></i>
                        {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  `
});

app.mount('#app');
