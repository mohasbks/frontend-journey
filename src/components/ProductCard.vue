<template>
  <div class="card h-100 product-card" :class="stockClass">
    <img 
      :src="product.image" 
      :alt="product.name"
      class="card-img-top"
      style="height: 200px; object-fit: cover;"
    >
    <div class="card-body d-flex flex-column">
      <h5 class="card-title" v-text="product.name"></h5>
      <p class="card-text text-muted" v-text="product.description"></p>
      
      <div class="mb-2">
        <span class="h5 text-primary">${{ product.price }}</span>
      </div>
      
      <div class="mb-3">
        <span v-if="product.inStock && stockLevel === 'high'" class="badge bg-success in-stock">
          ✅ In Stock
        </span>
        <span v-else-if="product.inStock && stockLevel === 'limited'" class="badge bg-warning limited-stock">
          ⚠️ Limited Stock
        </span>
        <span v-else class="badge bg-secondary out-of-stock">
          ❌ Out of Stock
        </span>
      </div>
      
      <div class="mt-auto">
        <button 
          @click="$emit('add-to-cart', product)"
          :disabled="!product.inStock"
          class="btn btn-primary w-100"
          :class="{ 'btn-secondary': !product.inStock }"
        >
          <span v-if="product.inStock">🛒 Add to Cart</span>
          <span v-else>Out of Stock</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true,
      validator(value) {
        return value && 
               typeof value.id === 'number' &&
               typeof value.name === 'string' &&
               typeof value.price === 'number' &&
               typeof value.inStock === 'boolean' &&
               typeof value.description === 'string' &&
               typeof value.image === 'string'
      }
    }
  },
  emits: ['add-to-cart'],
  computed: {
    stockLevel() {
      // Simulate different stock levels for demonstration
      if (!this.product.inStock) return 'out'
      // Random logic for demo - you can implement real stock levels
      return this.product.id % 3 === 0 ? 'limited' : 'high'
    },
    stockClass() {
      if (!this.product.inStock) return 'out-of-stock'
      if (this.stockLevel === 'limited') return 'limited-stock'
      return 'in-stock'
    }
  }
}
</script>

<style scoped>
.product-card {
  transition: all 0.3s ease;
  border: 1px solid #dee2e6;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.out-of-stock {
  opacity: 0.6;
}

.out-of-stock .card-img-top {
  filter: grayscale(50%);
}

.in-stock {
  border-left: 4px solid #28a745;
}

.limited-stock {
  border-left: 4px solid #ffc107;
}

.out-of-stock {
  border-left: 4px solid #6c757d;
}
</style>
