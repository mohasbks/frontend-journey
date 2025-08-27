<template>
  <div class="card">
    <div class="card-header bg-primary text-white">
      <h4 class="mb-0">🛒 Shopping Cart ({{ cart.length }} items)</h4>
    </div>
    <div class="card-body">
      <div v-if="cart.length === 0" class="text-center py-4">
        <i class="bi bi-cart-x display-1 text-muted"></i>
        <h5 class="mt-3 text-muted">Your cart is empty</h5>
        <p class="text-muted">Add some products to get started!</p>
      </div>
      
      <div v-else>
        <div class="row">
          <div 
            v-for="(item, index) in cart" 
            :key="`cart-${item.id}-${index}`"
            class="col-12 mb-3"
          >
            <div class="card border-0 bg-light">
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col-md-2">
                    <img 
                      :src="item.image" 
                      :alt="item.name"
                      class="img-fluid rounded"
                      style="max-height: 60px; object-fit: cover;"
                    >
                  </div>
                  <div class="col-md-6">
                    <h6 class="mb-1" v-text="item.name"></h6>
                    <small class="text-muted" v-text="item.description"></small>
                  </div>
                  <div class="col-md-2 text-center">
                    <span class="h6 text-primary">${{ item.price }}</span>
                  </div>
                  <div class="col-md-2 text-end">
                    <button 
                      @click="$emit('remove-from-cart', index)"
                      class="btn btn-outline-danger btn-sm"
                      title="Remove from cart"
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="border-top pt-3 mt-3">
          <div class="row">
            <div class="col-md-8">
              <h5>Total Items: {{ cart.length }}</h5>
            </div>
            <div class="col-md-4 text-end">
              <h4 class="text-primary">Total: ${{ totalPrice }}</h4>
              <button class="btn btn-success btn-lg mt-2 w-100">
                💳 Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  props: {
    cart: {
      type: Array,
      required: true,
      default: () => []
    },
    totalPrice: {
      type: [String, Number],
      required: true,
      default: '0.00'
    }
  },
  emits: ['remove-from-cart']
}
</script>

<style scoped>
.card {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.card-header {
  border-bottom: none;
}

.bg-light {
  background-color: #f8f9fa !important;
}

.btn-outline-danger:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}
</style>
