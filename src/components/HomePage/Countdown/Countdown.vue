<template>
  <div class="ma-0 text-center d-flex">
    <div v-for="data in timeData" :key="data.label">
      <div class="flip-clock__piece" :id="data.elementId" v-show="data.show">
        <span class="flip-card">
          {{ data.current | twoDigits }}
        </span>

        <span class="flip-clock__slot">{{ data.label }}</span>
      </div>
      <div
        :key="data.elementId"
        class="flip-card px-md-4"
        v-if="data.label !== 'SECONDS'"
      >
        :
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import twoDigits from '@/utils/twoDigits';

export default {
  name: 'flipCountdown',

  props: {
    deadline: {
      type: String,
    },
    stop: {
      type: Boolean,
    },
    showDays: {
      type: Boolean,
      required: false,
      default: true,
    },
    showHours: {
      type: Boolean,
      required: false,
      default: true,
    },
    showMinutes: {
      type: Boolean,
      required: false,
      default: true,
    },
    showSeconds: {
      type: Boolean,
      required: false,
      default: true,
    },
    labels: {
      type: Object,
      required: false,
      default: function () {
        return {
          days: 'DAYS',
          hours: 'HOURS',
          minutes: 'MINUTES',
          seconds: 'SECONDS',
        };
      },
    },
  },
  data() {
    const uuid = uuidv4();
    return {
      now: Math.trunc(new Date().getTime() / 1000),
      date: null,
      interval: null,
      diff: 0,
      show: false,
      timeData: [
        {
          current: 0,
          previous: 0,
          label: this.labels.days,
          elementId: 'flip-card-days-' + uuid,
          show: this.showDays,
        },
        {
          current: 0,
          previous: 0,
          label: this.labels.hours,
          elementId: 'flip-card-hours-' + uuid,
          show: this.showHours,
        },
        {
          current: 0,
          previous: 0,
          label: this.labels.minutes,
          elementId: 'flip-card-minutes-' + uuid,
          show: this.showMinutes,
        },
        {
          current: 0,
          previous: 0,
          label: this.labels.seconds,
          elementId: 'flip-card-seconds-' + uuid,
          show: this.showSeconds,
        },
      ],
    };
  },
  created() {
    if (!this.deadline) {
      throw new Error("Missing props 'deadline'");
    }
    const endTime = this.deadline;
    this.date = Math.trunc(Date.parse(endTime.replace(/-/g, '/')) / 1000);
    if (!this.date) {
      throw new Error("Invalid props value, correct the 'deadline'");
    }
    this.interval = setInterval(() => {
      this.now = Math.trunc(new Date().getTime() / 1000);
    }, 1000);
  },
  mounted() {
    if (this.diff !== 0) {
      this.show = true;
    }
  },
  computed: {
    seconds() {
      return Math.trunc(this.diff) % 60;
    },
    minutes() {
      return Math.trunc(this.diff / 60) % 60;
    },
    hours() {
      return Math.trunc(this.diff / 60 / 60) % 24;
    },
    days() {
      return Math.trunc(this.diff / 60 / 60 / 24);
    },
  },
  watch: {
    deadline: function (newVal, oldVal) {
      const endTime = this.deadline;
      this.date = Math.trunc(Date.parse(endTime.replace(/-/g, '/')) / 1000);
      if (!this.date) {
        throw new Error("Invalid props value, correct the 'deadline'");
      }
    },
    now(value) {
      this.diff = this.date - this.now;
      if (this.diff <= 0 || this.stop) {
        this.diff = 0;
        this.updateTime(3, 0);
      } else {
        this.updateAllCards();
      }
    },
    diff(value) {
      if (value === 0) {
        this.updateAllCards();
      }
    },
  },
  filters: {
    twoDigits,
  },
  methods: {
    updateAllCards() {
      this.updateTime(0, this.days);
      this.updateTime(1, this.hours);
      this.updateTime(2, this.minutes);
      this.updateTime(3, this.seconds);
    },
    updateTime(idx, newValue) {
      if (idx >= this.timeData.length || newValue === undefined) {
        return;
      }

      if (window.requestAnimationFrame) {
        this.frame = requestAnimationFrame(this.updateTime.bind(this));
      }

      const d = this.timeData[idx];
      const val = newValue < 0 ? 0 : newValue;
      const el = document.querySelector(`#${d.elementId}`);

      if (val !== d.current) {
        d.previous = d.current;
        d.current = val;

        if (el) {
          el.classList.remove('flip');
          void el.offsetWidth;
          el.classList.add('flip');
        }

        if (idx === 0) {
          const els = el.querySelectorAll('span b');
          if (els) {
            for (const e of els) {
              const cls = e.classList[0];
              if (newValue / 1000 >= 1) {
                if (!cls.includes('-4digits')) {
                  const newCls = cls + '-4digits';
                  e.classList.add(newCls);
                  e.classList.remove(cls);
                }
              } else {
                if (cls.includes('-4digits')) {
                  const newCls = cls.replace('-4digits', '');
                  e.classList.add(newCls);
                  e.classList.remove(cls);
                }
              }
            }
          }
        }
      }
    },
  },
  beforeDestroy() {
    if (window.cancelAnimationFrame) {
      cancelAnimationFrame(this.frame);
    }
  },
  destroyed() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped lang="scss">
.flip-clock__piece {
  display: inline-block;
  margin: 0 0.2vw;

  @media (min-width: 1000px) {
    margin: 0 5px;
  }
}

.flip-clock__slot {
  font-size: 0.914rem;
  font-weight: 500;
  line-height: 1.5;
  display: block;
  color: #767676;
}

.flip-card {
  display: block;
  position: relative;
  padding-bottom: 0.72rem;
  font-size: 3rem;
  font-weight: 600;
  line-height: 0.95;
  color: #ff6f61;
}
</style>
