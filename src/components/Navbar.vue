<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">
        <i class="bi bi-shop"></i> 🛍️ Vue Store
      </a>
      <div class="navbar-nav ms-auto">
        <div class="nav-item">
          <span class="navbar-text">
            <i class="bi bi-cart"></i> 🛒 Cart: 
            <span class="badge bg-primary ms-1">{{ cartCount }}</span>
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    cartCount: {
      type: Number,
      required: true,
      default: 0
    }
  }
}
</script>

<style scoped>
.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
}

.navbar-text {
  font-size: 1.1rem;
}

.badge {
  font-size: 0.9rem;
}
</style>
