<template>
    <li class="comment-item">
      <p><strong>{{ comment.by }}</strong>:</p>
      <p v-html="comment.text"></p>
      <ul v-if="comment.kids" class="comment-list">
        <Comment v-for="childId in comment.kids" :key="childId" :id="childId" />
      </ul>
    </li>
  </template>
  
  <script>
  /* eslint-disable vue/multi-word-component-names */  // Disable the rule for this file
  
  import axios from 'axios';
  
  export default {
    name: 'Comment',
    props: ['id'],
    data() {
      return {
        comment: {},
      };
    },
    async created() {
      const { data: comment } = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${this.id}.json`);
      this.comment = comment;
    },
  };
  </script>

  <style>
  /* Comment.vue */
.comment-item {
  padding: 10px 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 10px;
}

.comment-item strong {
  color: #2a6fbb;
  font-weight: bold;
}

.comment-item p {
  font-size: 14px;
  color: #333;
}

.comment-item .nested-comment {
  margin-left: 20px;
  padding-left: 15px;
  border-left: 3px solid #ddd;
}

</style>
  