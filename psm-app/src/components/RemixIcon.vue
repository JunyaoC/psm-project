<template>
  <component
    v-if="icon"
    :is="
      require(`vue-remix-icons/icons/ri-${icon}.js`)
        .default
    "
  />
</template>

<script>
export default {
  name: "RemixIcon",
  props: {
    icon: String,
    fill: Boolean,
  },
};
</script>