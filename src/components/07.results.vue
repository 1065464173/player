<template>
  <div class="results">
      <img src="../assets/07.result.png" alt="">
  </div>
</template>

<script>
export default {
    created(){
        console.log(this.$route.query.q)
    }

}
</script>

<style>

</style>