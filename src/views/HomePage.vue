<template>
  <div class="home-page">
    <h1>Hacker News Clone</h1>
    <!-- Search Bar -->
    <input
      v-model="searchQuery"
      class="search-bar"
      placeholder="Search Hacker News..."
    />

    <!-- Conditionally render the post list only if posts exist -->
    <div class="post-list" v-if="posts.length">
      <div
        class="post"
        v-for="post in filteredPosts" 
        :key="post.id"
        @click="goToPostDetail(post.id)"
      >
        <h2>{{ post.title }}</h2>
        <p>{{ post.score }} points by {{ post.by }}</p>
        <p>{{ formatTime(post.time) }}</p>
      </div>
    </div>

    <!-- Loading State if posts are not available -->
    <div v-else>
      <p>Loading posts...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomePage',  // Ensure it's HomePage
  data() {
    return {
      searchQuery: '',  // Search query data
      posts: [],  // Array for posts
    };
  },
  created() {
    this.fetchPosts();
  },
  computed: {
    // This is the computed property to filter posts based on searchQuery
    filteredPosts() {
      return this.posts.filter(post =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    async fetchPosts() {
      const { data } = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
      const postDetails = await Promise.all(
        data.slice(0, 10).map(id =>
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.data)
        )
      );
      this.posts = postDetails;
    },
    goToPostDetail(id) {
      this.$router.push({ name: 'PostDetail', params: { id } });
    },
    formatTime(time) {
      const date = new Date(time * 1000);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    },
  },
};
</script>


<style scoped>
/* Global Styles */
* {
  box-sizing: border-box;
}

body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background-color: #fafafa;
  margin: 0;
  padding: 0;
  color: #222222;
}

a {
  text-decoration: none;
  color: inherit;
}

/* Header Styles */
.header {
  background-color: #ff6600;
  color: white;
  padding: 10px 20px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

.header a {
  color: white;
}

.header a:hover {
  text-decoration: underline;
}

/* Search Bar */
.search-bar {
  margin: 20px auto;
  padding: 12px;
  background-color: #ffffff;
  border: 1px solid #d6d6d6;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  max-width: 700px;
  display: block;
}

.search-bar:focus {
  outline: none;
  border-color: #ff6600;
}

/* Post List Styles */
.post-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: 800px;
  margin: 20px auto;
}

.post {
  background-color: #fff;
  border: 1px solid #d6d6d6;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.post:hover {
  background-color: #f6f6f6;
}

.post .title {
  font-size: 18px;
  color: #2a2a2a;
  font-weight: 600;
  margin: 0;
  word-wrap: break-word;
}

.post .title a {
  color: #1a73e8;
  font-weight: 600;
}

.post .meta {
  font-size: 12px;
  color: #828282;
  margin-top: 5px;
}

.post .meta span {
  margin-right: 10px;
}

.post .meta .time {
  color: #828282;
}

.post .meta .score {
  color: #ff6600;
  font-weight: bold;
}

/* Time and Author Styles */
.post .meta .time {
  color: #828282;
  font-style: italic;
}

.post .meta .author {
  color: #828282;
}

/* Individual Post Link */
.post a {
  color: #1a73e8;
}

.post a:hover {
  text-decoration: underline;
}

/* Pagination Styles */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  background-color: white;
  color: #ff6600;
  border: 1px solid #ff6600;
  padding: 8px 16px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.pagination button:hover {
  background-color: #ff6600;
  color: white;
}

.pagination button[disabled] {
  background-color: #e1e1e1;
  cursor: not-allowed;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .search-bar {
    width: 90%;
  }

  .post-list {
    margin: 10px;
  }
}
</style>
