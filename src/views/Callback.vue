<template>
  <div class="callback-page">
    <h1>로그인 완료</h1>
    <p>Access Token: {{ accessToken }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accessToken: null
    };
  },
  created() {
    // URL의 query string에서 accessToken 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    this.accessToken = urlParams.get('accessToken');

    // 로컬 스토리지에 accessToken 저장
    localStorage.setItem('accessToken', this.accessToken);

    // Main 화면으로 리다이렉트
    this.$router.push({ name: 'Main' });
  },
};
</script>

<style scoped>
.callback-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}
</style>
