<template>
  <div class="loading">
    <div class="loadingio-spinner-ripple-plgbw8156d">
      <div class="ldio-xnie317s2ao">
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loading"
};
</script>

<style>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(255, 255, 255);
  z-index: 1000000;
  /* backdrop-filter: blur(5px); */
  blur: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  transition: .5s;
}
.loading.show {
  opacity: 1;
  visibility: visible;
  transition: .2s ease-in;
  display:flex !important;
}
@keyframes ldio-xnie317s2ao {
  0% {
    top: 96px;
    left: 96px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 18px;
    left: 18px;
    width: 156px;
    height: 156px;
    opacity: 0;
  }
}
.ldio-xnie317s2ao div {
  position: absolute;
  border-width: 4px;
  border-style: solid;
  opacity: 1;
  border-radius: 50%;
  animation: ldio-xnie317s2ao 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  transform: scale(0.5);
}
.ldio-xnie317s2ao div:nth-child(1) {
  border-color: #0079f3;
  animation-delay: 0s;
}
.ldio-xnie317s2ao div:nth-child(2) {
  border-color: #429aff;
  animation-delay: -0.5s;
}
.loadingio-spinner-ripple-plgbw8156d {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background: rgba(241, 242, 243, 0);
}
.ldio-xnie317s2ao {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-xnie317s2ao div {
  box-sizing: content-box;
}
</style>
