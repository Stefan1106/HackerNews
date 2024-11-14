<template>
    <div class="post-details">
      <h2>{{ post.title }}</h2>
      <p>{{ post.by }} | {{ formatTime(post.time) }}</p>
      <p v-if="post.url"><a :href="post.url" target="_blank">{{ post.url }}</a></p>
      <p v-if="post.text">{{ post.text }}</p>
  
      <div class="comments" v-if="comments.length">
        <h3>Comments</h3>
        <div v-for="comment in comments" :key="comment.id" class="comment-item">
          <p><strong>{{ comment.by }}</strong>: {{ comment.text }}</p>
          <div v-if="comment.kids" class="nested-comment">
            <div v-for="nestedComment in comment.kids" :key="nestedComment" class="comment-item">
              <!-- Render nested comments here -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'PostDetail', // Updated to follow multi-word convention
    props: {
      id: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        post: {},
        comments: [],
      };
    },
    created() {
      this.fetchPostDetails();
    },
    methods: {
      async fetchPostDetails() {
        const { data } = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${this.id}.json`);
        this.post = data;
        this.fetchComments(data.kids);
      },
      async fetchComments(commentIds) {
        const comments = await Promise.all(
          commentIds.map(id =>
            axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.data)
          )
        );
        this.comments = comments;
      },
      formatTime(time) {
        const date = new Date(time * 1000);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Styles for PostDetail.vue */
  .post-details {
    background-color: #fff;
    border-radius: 4px;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .post-details h2 {
    font-size: 24px;
    margin-bottom: 15px;
  }
  
  .post-details p {
    font-size: 14px;
    color: #555;
    margin-bottom: 10px;
  }
  
  .comments {
    margin-top: 20px;
  }
  
  .comment-item {
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  
  .comment-item strong {
    color: #2a6fbb;
  }
  
  .nested-comment {
    margin-left: 20px;
    background-color: #fafafa;
    padding-left: 15px;
  }
  
  .nested-comment .comment-item {
    border-left: 3px solid #ddd;
  }
  </style>
  