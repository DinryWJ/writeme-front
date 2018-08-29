<template>
    <img :src="notfound"/>
</template>
<script>

export default {
  data() {
    return {
      notfound: "/404.jpg"
    };
  }
}
</script>
