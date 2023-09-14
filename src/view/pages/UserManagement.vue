<template>
  <div>

  
      <router-view></router-view>
  
  </div>
</template>

<script>
// import { Main } from "../styled";

import { defineComponent } from "vue";

export default defineComponent({
  name: "User management",
  components: {
    // Main,
  },
  data() {
    return {};
  },
});
</script>
