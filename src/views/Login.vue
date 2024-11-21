<template>
  <video autoplay loop muted class="background-video">
    <source src="@/assets/login-background.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>

  <div class="login-page">
    <div class="login-container">
      <h1>구글 계정으로 로그인</h1>
      <p class="description">서비스에 로그인하여 더 많은 기능을 이용하세요.</p>
      <button @click="googleLogin">Google 로그인</button>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    googleLogin() {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
      const scope = 'profile email https://www.googleapis.com/auth/calendar.readonly';
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=offline&response_type=code`;
    }
  }
};
</script>

<style scoped>
/* 비디오를 배경으로 설정 */
.login-page {
  position: relative;
  height: 100vh;
  width: 100%;
  margin: 0;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1; /* 비디오를 배경으로 두기 위해 낮은 z-index로 설정 */
}

/* 로그인 폼 스타일 */
.login-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-family: 'Arial', sans-serif;
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.description {
  font-family: 'Arial', sans-serif;
  font-size: 14px;
  color: #666;
  margin-bottom: 30px;
}
</style>