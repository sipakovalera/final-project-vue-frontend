<template>
  <div class="paginate-container">
    <button class="btn-group" @click="prevPage">
      <i class="fas fa-chevron-left fa-2x"></i>
    </button>
    <ul>
      <li v-for="page in totalPages" :key="page">
        <button 
          class="paginate-page" 
          :class="{active: currentPage === page}" 
          @click="changePage(page)"
        >{{ page }}</button>
      </li>
    </ul>
    <button class="btn-group" @click="nextPage">
      <i class="fas fa-chevron-right fa-2x"></i>
    </button>
  </div>
</template>

<script>
export default {
  props:['totalPages', 'limit'],
  data() {
    return {
      currentPage: 1
    }
  },
  name: "pagination",
  methods: {
    async changePage(pageNumber){
      this.currentPage = pageNumber,
      this.$emit('change-page', pageNumber)
    },
    prevPage(){
      this.currentPage = this.currentPage - 1
      this.$emit('change-page', this.currentPage)
    },
    nextPage(){
      this.currentPage = this.currentPage + 1
      this.$emit('change-page', this.currentPage)
    }
  }
}
</script>

<style scoped>
  ul{
    display: flex;
    justify-content: center;
  }
  li{
    list-style-type: none;
    padding: 5px;
  }
  .paginate-container{
    display: flex;
    justify-content: space-around;
  }
  .paginate-page{
    color: brown;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    box-shadow: 2px 1px 5px 0px rgba(34, 60, 80, 0.2);
    background: #feae51;
    color: #fff;
    font-weight: 700;
    cursor: pointer;
    transition: 0.5s ease;
    border: none;
  }
  .btn-group{
    background: transparent;
    border: none;
    color: #ccc;
    cursor: pointer;
  }
  .btn-group:hover{
    color: #79a1d3;
  }
  .active{
    background: #79a1d3;
    box-shadow: 3px 2px 5px 0px rgba(34, 60, 80, 0.2);
    transition: all 0.5 ease;
  }
</style>
  

