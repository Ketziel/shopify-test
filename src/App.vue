<template>
  <div id="app">
    <div class="product-view">
      <div class="product-view__inputs">
        <input class="product-view__product-search" v-model="search" placeholder="Search products...">
        <div class="product-view__controls">
          <div class="product-view__filters">
            <div class="product-view__filters-label">Filters:</div>
            <input type="checkbox" id="Bracelet" value="Bracelet" v-model="types">
            <label for="Bracelet">Bracelet</label>
            <input type="checkbox" id="Earrings" value="Earrings" v-model="types">
            <label for="Earrings">Earrings</label>
            <input type="checkbox" id="Necklace" value="Necklace" v-model="types">
            <label for="Necklace">Necklace</label>
          </div>
          <div class="product-view__sort">
            <div class="product-view__sort-label">Sort by:</div>
            <input type="radio" id="Title" value="TITLE" v-model="sortKey">
            <label for="Title">Title</label>
            <input type="radio" id="product-type" value="PRODUCT_TYPE" v-model="sortKey">
            <label for="product-type">Product Type</label>
            <select v-model="reverse">
              <option :value="true">DESC</option>
              <option :value="false">ASC</option>
            </select>
          </div>
        </div>
      </div>
      <div class="product-view__product-list">
        <div class="product" v-for="product in filteredProducts" :key="product.id">
          <hr/>
          <h3>{{ product.title }}</h3>
          <div>{{ product.type }}</div>
          <p v-html="product.description"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getProducts} from "@/api/api.shopify.js"

export default {
  name: 'App',
  data() {
    return {
      filteredProducts: [],
      search: '',
      types: [],
      sortKey: 'TITLE',
      reverse: false
    };
  },
  mounted() {
    this.filterProducts();
  },
  methods: {
    async filterProducts() {
      getProducts({search: this.search, types: this.types, sortKey: this.sortKey, reverse: this.reverse})
      .then((response) => response.json())
        .then((json) => {
          console.log(json.data.products.edges);
          this.filteredProducts = json.data.products.edges.map(product => ({
            id: product.node.id,
            title: product.node.title,
            type: product.node.productType,
            description: product.node.description
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  watch: {
    search: function () {
      this.filterProducts();
    },
    types: function () {
      this.filterProducts();
    },
    sortKey: function () {
      this.filterProducts();
    },
    reverse: function () {
      this.filterProducts();
    },
  },
}
</script>

<style lang="scss">
html {
  background-color: #1D2021;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.product-view {
  max-width: 1024px;
  margin: 4rem auto;
  padding: 3rem 2rem;
  background: #efefef;

  &__controls {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }

  &__inputs {
    margin-bottom: 2rem;
  }

  &__product-search {
    width: 100%;
    padding: .5rem;
    box-sizing: border-box;
  }

  &__filters {
    display: flex;

    > input {
      margin-left: 1rem;
    }
  }
  
  &__sort {
    display: flex;

    > input {
      margin-left: 1rem;
    }

    > select {
      margin-left: 1rem;
    }
  }

  &__product-list {
    text-align: left;
  }
}
</style>
