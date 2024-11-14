<template>
  <div id="app">
    <router-view />  
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  background-color: #fffbf0;
  color: #000;
  line-height: 1.6;
}

a {
  color: #2a6fbb;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

h2, h3 {
  color: #333;
}

.container {
  width: 85%;
  margin: 0 auto;
  padding: 20px 0;
}
</style>
