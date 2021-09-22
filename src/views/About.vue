<template>
  <nav class="navigation">
    <ul class="menu">
      <li class="li">
        <a href="#">Home</a>
      </li>
      <li class="li">
        <a href="#">About me</a>
      </li>
      <li class="li">
        <a href="#">My Personal Blog</a>
      </li>
      <li class="li">
        <a href="#">Contact</a>
      </li>
      <li class="li">
        <a href="#">Twitter</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import 'animate.css';
export default {
  data: () => ({}),
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}

a {
  text-decoration: none;
}

html,
body {
  height: 100%;
}

body {
  font-family: 'Roboto', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
}

/*________________________________________________ */

.navigation {
  display: flex;
}

.menu {
  display: flex;
  flex-direction: column;

  @media (--min-sm) {
    flex-direction: row;
  }
}

.menu > li {
  @media (--min-sm) {
    &:not(:last-child) {
      margin-right: 40px;
    }
  }
}

.menu a {
  position: relative;
  display: inline-block;
  font-size: 20px;
  font-weight: 300;
  color: #666;
  transition: color 0.2s ease;
  padding: 3px 0;
  margin-bottom: 1px;

  &:hover {
    color: #aaa;

    /*     &::after, */
    &::before {
      width: 0%;
      right: 0%;
    }
  }

  /*   &::after, */
  &::before {
    content: '';
    position: absolute;
    top: calc(100% + 5px);
    width: 100%;
    height: 3px;
  }

  &::before {
    transition: width 0.1s cubic-bezier(0.29, 0.18, 0.26, 0.83);
    background: #2196f3;
  }
  /*
  &::after {
    transition: width .2s cubic-bezier(0.29, 0.18, 0.26, 0.83);
    background: #F44336;
  } */
}
</style>
