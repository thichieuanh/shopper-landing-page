<template>
  <div class="review-body">
    <v-row>
      <v-col cols="2">
        <div class="avatar avatar-xxl">
          <Icon icon="fa-solid:user" :inline="true" />
        </div>
      </v-col>

      <v-col>
        <v-rating :value="review.rating" class="font-size-lg mb-1">
          <template v-slot:item="props">
            <Icon
              icon="eva:star-fill"
              :inline="true"
              :style="{
                color: props.isFilled ? '#111' : '#bdbdbd',
              }"
            />
          </template>
        </v-rating>

        <p class="font-size-xs text-muted mb-6">
          {{ review.reviewer }} ,
          {{ new Date(review.date).toDateString().slice(4) }}
        </p>

        <p class="font-size-lg font-weight-medium mb-2">{{ review.title }}</p>
        <p class="text-gray-500 mb-7">{{ review.text }}</p>

        <v-row class="font-size-sm align-center">
          <v-col cols="3" class="px-0">
            <p>Was this review helpful?</p>
          </v-col>

          <v-col class="d-flex align-center mr-auto">
            <div
              class="d-flex align-center pointer-cursor"
              @click="likeIncrement"
            >
              <Icon
                icon="ant-design:like-outlined"
                :inline="true"
                class="mr-1"
              />
              {{ likeCount }}
            </div>

            <div
              class="d-flex align-center ml-4 pointer-cursor"
              @click="dislikeIncrement"
            >
              <Icon
                icon="ant-design:dislike-outlined"
                :horizontalFlip="true"
                :inline="true"
              />
              {{ dislikeCount }}
            </div>
          </v-col>

          <v-col cols="2">Comments ({{ review.commentCount }}) </v-col>
          <v-col cols="2" class="text-center">
            <button class="btn btn-xs btn-outline-border">Comment</button>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2';
export default {
  props: {
    review: { type: Object, default: () => {} },
  },

  components: { Icon },

  computed: {
    likeCount: {
      get() {
        return this.review.likeCount;
      },

      set(newValue) {
        this.review.likeCount = newValue;
      },
    },

    dislikeCount: {
      get() {
        return this.review.dislikeCount;
      },

      set(newValue) {
        this.review.dislikeCount = newValue;
      },
    },
  },

  methods: {
    likeIncrement() {
      this.likeCount++;
    },

    dislikeIncrement() {
      this.dislikeCount++;
    },
  },
};
</script>

<style lang="scss">
.review-body {
  padding: 2.5rem;
  border: 1px solid #e5e5e5;
}

.review + .review {
  margin-top: 1.25rem;
}
</style>
