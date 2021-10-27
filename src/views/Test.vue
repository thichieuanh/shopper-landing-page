<template>
  <div id="app">
    <div
      class="modal-overlay"
      style="display: block"
      v-show="isOpen"
      @click="hidemodal"
    ></div>
    <a href="" @click.prevent="toggle" class="js-open-modal">
      open modal {{ isOpen }}
    </a>
    <div class="modal">
      <div class="modal__header">
        modal header
        <a href="" @click="hidemodal" class="js-close-modal">X</a>
      </div>
      <p>hey there, I'm the modal</p>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isOpen: false,
  }),
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.showmodal();
      } else {
        this.hidemodal();
      }
    },
    showmodal() {
      document.querySelector('.modal').classList.add('visible');
      this.isOpen = true;
    },
    hidemodal() {
      document.querySelector('.modal').classList.remove('visible');
      this.isOpen = false;
    },
    clickoutside() {
      window.addEventListener('mousedown', (event) => {
        if (!event.target.closest('.modal,.js-open-modal')) {
          document
            .getElementsByClassName('modal visible')[0]
            .classList.remove('visible');
          this.isOpen = false;
        }
      });
    },
  },
  created() {
    // clickoutside
    // this.clickoutside();
  },
};
</script>
<style scoped lang="scss">
body {
  padding: 20px;
}
.modal {
  z-index: 100;
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: 320px;
  height: 320px;
  text-align: center;
  box-sizing: border-box;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

  &.visible {
    display: block;
  }
}

.modal__header {
  color: white;
  background: #333;
  line-height: 50px;
  text-align: center;
  position: relative;
  height: 50px;
  box-sizing: border-box;

  a {
    position: absolute;
    top: 0;
    right: 0;
    text-decoration: none;
    color: white;
    font-weight: bold;
    display: block;
    padding: 0 20px;
    font-size: 16px;
    background: #555;
    height: 100%;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  opacity: 0.3;
  background: black;
}
</style>
