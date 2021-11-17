<template>
  <div>
    <header>
      <nav>
        <ul>
          <li v-for="(tab, tabName) in tabs" :key="tabName">
            <button
              class="tab"
              @click="setTabActive(tabName)"
              :class="{ active: tabName === activeTab }"
            >
              <span class="tab-copy">{{ tabName }}</span>
              <span class="tab-background">
                <span class="tab-rounding left"></span>
                <span class="tab-rounding right"></span>
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </header>

    <article>
      <div class="container">
        <transition name="fade" mode="out-in" appear :duration="500">
          <tab-content
            v-for="(tabContent, t) in tabs"
            :data="tabContent"
            :key="'content' + t"
            inline-template
          >
            <div class="content">
              <h1>{{ data.title }}</h1>
              <p>{{ data.body }}</p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Nesciunt labore id sint voluptas assumenda optio ullam excepturi
                officia, a commodi nobis rem saepe error iusto, minima ipsum
                ducimus quos dignissimos itaque, temporibus esse impedit?
                Veritatis repellat dolor magnam modi error!
              </p>
            </div>
          </tab-content>
        </transition>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  data: () => ({
    message: 'Hello',
    tabs: {
      'Tab 1': {
        title: 'Awesome Title',
        body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab nam alias architecto officia, dolores animi qui debitis incidunt eius temporibus nostrum nihil soluta commodi molestiae necessitatibus ducimus amet. Suscipit, saepe!',
      },
      'Tab 2': {
        title: 'This is great',
        body: 'Lorem ipsasdfasdfasd alias architecto officia, dolores animi qui debitis incidunt eius temporibus nostrum nihil soluta commodi molestiae necessitatibus ducimus amet. Suscipit, saepe!',
      },
      'Tab 3': {
        title: "Look I'm a title!",
        body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab nam aliasdfasdfaas architecto officia, dolores animi qui debitis incidunt eius temporibus nostrum nihil soluta commodi molestiae necessitatibus ducimus amet. Suscipit, saepe!',
      },
      'Tab 4': {
        title: 'LOREM IPSUM?',
        body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab nam alias architecto officia, dolores animi qui debitis incidunt eius temporibus nostrum nihil soluta commodi molestiae necessitatibus ducimus amet. Suscipit, saepe!',
      },
    },
    activeTab: 'Tab 1',
  }),
  computed: {
    tabContent() {
      return this.tabs[this.activeTab];
    },
  },
  methods: {
    setTabActive(tab) {
      this.activeTab = tab;
    },
  },
  components: {
    TabContent: {
      props: {
        data: Object,
      },
    },
  },
};
</script>

<style lang="scss" scoped>
$purple: #8a6cb4;
$pink: #d07faf;
header {
  background-image: linear-gradient(30deg, $purple, $pink);
  height: 30vh;
  min-height: 180px;
  width: 100%;
  display: flex;
  align-items: flex-end;
  overflow: hidden;

  nav {
    width: 100%;
    display: flex;
    justify-content: center;
    border-bottom: 20px solid #fff;
    filter: drop-shadow(0 -4px 4px rgba(darken($purple, 30%), 0.3));
    ul {
      display: flex;
      flex-direction: row;
    }
    .tab {
      $border-radius: 8px;
      $transition-duration: 0.24s;
      $transition-timing: cubic-bezier(0.86, 0, 0.07, 1);
      font-family: 'PT Sans', sans-serif;
      font-weight: bold;
      font-size: 20px;
      color: #fff;
      border: none;
      padding: 16px 40px;
      margin: 0 24px 0;
      outline: none;
      cursor: pointer;
      position: relative;
      background: none;
      &:hover {
        .tab {
          &-background {
            height: 16px;
          }
          &-rounding {
            transform: scaleY(1);
          }
        }
      }
      &.active {
        color: $purple;
        .tab {
          &-background {
            height: 100%;
          }
          &-rounding {
            transform: scaleY(1);
          }
        }
      }
      &-copy {
        position: relative;
        z-index: 1;
      }
      &-background {
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: #fff;
        z-index: 0;
        height: 0;
        border-radius: $border-radius $border-radius 0 0;
        transition: height $transition-timing $transition-duration;
      }
      &-rounding {
        $rounding-size: $border-radius;
        $background-color: #fff;
        //padding:$rounding-size / 2;
        padding: $rounding-size / 2 $rounding-size;
        display: block;
        position: absolute;
        overflow: hidden;
        bottom: 0;
        transform: scaleY(0);
        transform-origin: bottom;
        transition: transform $transition-timing $transition-duration;
        &:before {
          content: '';
          position: absolute;
          width: $rounding-size * 2;
          height: $rounding-size * 2;
          top: -$rounding-size;
          left: -$rounding-size;
          border-radius: 100%;
        }
        &.left {
          left: -$rounding-size;
          &:before {
            box-shadow: 0 0 0 10rem $background-color;
          }
        }
        &.right {
          right: -$rounding-size;
          &:before {
            left: $rounding-size;
            box-shadow: 0 0 0 10rem $background-color;
          }
        }
      }
    }
  }
}
article {
  .container {
    width: 100%;
    padding: 40px;
    max-width: 1024px;
    box-sizing: border-box;
    margin: 0 auto;
    height: 200px;
  }
  h1 {
    font-weight: bold;
    font-size: 48px;
    margin-bottom: 30px;
    color: $purple;
  }
  p {
    line-height: 1.6;
    font-size: 19px;
    color: rgba(#000, 0.7);
    margin-bottom: 20px;
  }
}

.fade-enter-active,
.fade-leave-active {
  & > * {
    transition-duration: 200ms;
    transition-property: opacity, transform;
    transition-timing-function: cubic-bezier(0.6, 0.15, 0.35, 0.8);
  }
}

$delay: 100ms;
$delayStep: 100ms;

.fade-enter,
.fade-leave-to {
  & > * {
    opacity: 0;
    transform: translateY(40px);
  }
}
.fade-enter-active {
  & > * {
    &:nth-child(2) {
      transition-delay: $delay;
    }
    &:nth-child(3) {
      transition-delay: $delay + $delayStep;
    }
  }
}
.fade-leave-active {
  & > * {
    &:nth-child(1) {
      transition-delay: $delay + $delayStep;
    }
    &:nth-child(2) {
      transition-delay: $delay;
    }
  }
}
</style>
