<template>
  <div class="callback-page">
    <h1>로딩 중...</h1>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  async created() {
    const urlParams = new URLSearchParams(window.location.search);
    const approvalCode = urlParams.get('code');
    const data = {
      authorizationCode: approvalCode,
      redirectUrl: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
    }

    if (approvalCode) {
      try {
        const response = await axios.post('http://localhost:8080/auth/join', data);
        console.log(response);
        const token = response.data.token;

        // JWT 토큰을 저장하고 main 페이지로 이동
        localStorage.setItem('token', token);
        await this.$router.push({name: 'Main'});
      } catch (error) {
        console.error('Google 로그인 실패:', error);
      }
    } else {
      console.error('구글 로그인 코드가 없습니다.');
    }
  }
};
</script>

<style scoped>
.callback-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
