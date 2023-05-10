<template>
    <span class="loader"></span>
</template>

<style scoped>
.loader {
  width: 96px;
  height: 96px;
  border: 5px solid;
  /* border-color: #1096e4 transparent; */
  border-color: black transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  position: absolute;
  margin-bottom: 20px;
  margin-right: 20px;
  bottom:0;
  right:0;

}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 
</style>