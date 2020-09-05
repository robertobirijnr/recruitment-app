<template>
  <router-view :key="$route.fullPath"></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style src="./styles/theme.scss" lang="scss" />
