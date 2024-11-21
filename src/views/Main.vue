<template>
  <div>
    <h1>Main</h1>
    <ul>
      <li v-for="event in events" :key="event.id">{{ event.name }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      events: []
    };
  },
  async created() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.$router.push({ name: 'Login' });
      return;
    }

    try {
      const response = await axios.get('http://localhost:8080/events', {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.events = response.data;
    } catch (error) {
      console.error('이벤트 목록 조회 실패:', error);
    }
  }
};
</script>
