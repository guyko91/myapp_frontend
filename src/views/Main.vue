<template>
  <div class="main-page">
    <h1>환영합니다!</h1>
    <p>로그인에 성공하였습니다.</p>
    <p>현재 accessToken: {{ accessToken }}</p>

    <!-- 로그아웃 버튼 -->
    <button @click="logout" class="logout-button">로그아웃</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      accessToken: localStorage.getItem("accessToken"),
    };
  },
  methods: {
    async logout() {
      try {
        // 서버에 로그아웃 요청 (accessToken을 보내지 않음)
        await axios
            .post("http://localhost:8080/auth/logout", null, {
              headers: {
                Authorization: `${this.accessToken}`,
              },
            });

        // 로그아웃 성공 시 localStorage에서 accessToken 삭제
        localStorage.removeItem("accessToken");

        // 로그인 페이지로 리다이렉트
        await this.$router.push({name: "Login"});
      } catch (error) {
        console.error("로그아웃 실패:", error);
        // 에러 처리 (예: 알림 메시지 추가)
      }
    },
  },
};
</script>

<style scoped>
.main-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

h1 {
  font-size: 32px;
  margin-bottom: 20px;
}

p {
  font-size: 18px;
  margin-bottom: 10px;
}

.logout-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ff4c4c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #ff1a1a;
}
</style>
