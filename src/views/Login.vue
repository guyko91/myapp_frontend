<template>
  <div class="login-page">
<!--    <video autoplay loop muted class="background-video">-->
<!--      <source src="@/assets/login-background.mp4" type="video/mp4">-->
<!--      Your browser does not support the video tag.-->
<!--    </video>-->

    <div class="login-container">
      <h1>Spring Security OAuth</h1>
      <p class="description">서비스에 로그인하여 더 많은 기능을 이용하세요.</p>

      <!-- 아이디 / 비밀번호 로그인 폼 -->
      <div class="login-form">
        <input type="text" v-model="id" placeholder="아이디" />
        <input type="password" v-model="password" placeholder="비밀번호" />
        <button class="login-btn" @click="loginWithCredentials">로그인</button>
      </div>

      <p class="signup-prompt">아직 회원이 아니신가요?</p>
      <!-- 회원가입 버튼 -->
      <div class="buttons-container">
        <button class="signup-btn" @click="showSignupModal">회원가입</button>
      </div>

      <!-- SNS 로그인 버튼 -->
      <div class="sns-buttons">
        <button v-for="provider in providers" :key="provider.name" :class="provider.class" @click="OAuthLogin(provider.url)">
          <i :class="provider.icon"></i> {{ provider.name }} 로그인
        </button>
      </div>

      <!-- 회원가입 모달 -->
      <div v-if="isSignupModalVisible" class="modal">
        <div class="modal-content">
          <span class="close" @click="hideSignupModal">&times;</span>
          <h2>회원가입</h2>
          <form @submit.prevent="signup">
            <div>
              <input type="text" v-model="signupUsername" placeholder="ID" required>
            </div>
            <div>
              <input type="password" v-model="signupPassword" placeholder="PWD" required>
            </div>
            <div>
              <input type="password" v-model="signupPasswordConfirm" placeholder="PWD 확인" required>
            </div>
            <div>
              <input type="text" v-model="signupName" placeholder="이름">
            </div>
            <div>
              <input type="text" v-model="signupEmail" placeholder="이메일">
            </div>
            <button class="signup-btn" type="submit">회원가입</button>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id: '',
      password: '',
      signupUsername: '',
      signupPassword: '',
      signupPasswordConfirm: '',
      signupName: '',
      signupEmail: '',
      isSignupModalVisible: false,
      providers: [
        { name: 'Google', url: 'http://localhost:8080/oauth2/authorization/google', class: 'google', icon: 'fab fa-google' },
        { name: 'Facebook', url: 'http://localhost:8080/oauth2/authorization/facebook', class: 'facebook', icon: 'fab fa-facebook-f' },
        { name: 'Kakao', url: 'http://localhost:8080/oauth2/authorization/kakao', class: 'kakao', icon: 'fas fa-comment' },
        { name: 'Naver', url: 'http://localhost:8080/oauth2/authorization/naver', class: 'naver', icon: 'fas fa-comment-dots' }
      ]
    };
  },
  mounted() {
    // 로그인 상태 확인 (accessToken이 있으면 자동으로 Main 페이지로 리다이렉트)
    if (localStorage.getItem("accessToken")) {
      this.$router.push({ name: "Main" });
    }
  },
  methods: {
    OAuthLogin(url) {
      window.location.href = url;
    },
    loginWithCredentials() {
      axios
          .post('http://localhost:8080/auth/login', {
            id: this.id,
            password: this.password
          })
          .then(response => {
            console.log(response);

            const code = response.data.code;
            const message = response.data.message;

            if (code === '20000000') {
              // 응답의 헤더에서 Authorization 값을 가져오기
              localStorage.setItem('accessToken', response.headers['authorization']);

              // Main.vue로 리다이렉트
              this.$router.push({ name: "Main" });
            }else {
              console.log(message);
            }
          })
          .catch(error => {
            const code = error.response.data.code;
            if (code === '40101001') {
              alert('존재하지 않는 사용자입니다.');
            }else if (code === '40101002') {
              alert('ID 또는 비밀번호가 일치하지 않습니다.');
            }
          });
    },
    showSignupModal() {
      this.isSignupModalVisible = true;
    },
    hideSignupModal() {
      this.isSignupModalVisible = false;
    },
    signup() {
      if (this.signupPassword !== this.signupPasswordConfirm) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      axios
          .post("http://localhost:8080/auth/signup", {
            id: this.signupUsername,
            password: this.signupPassword,
            name: this.signupName,
            email: this.signupEmail
          })
          .then((response) => {
            console.log(response);

            const code = response.data.code;
            const message = response.data.message;

            if (code === '20000000') {
              // 응답의 헤더에서 Authorization 값을 가져오기
              localStorage.setItem('accessToken', response.headers['authorization']);

              // Main.vue로 리다이렉트
              this.$router.push({ name: "Main" });
            }else {
              console.log(message);
            }
          })
          .catch((error) => {
            const code = error.response.data.code;
            const message = error.response.data.message;

            // 회원가입 실패 처리 (예: 오류 메시지 표시)
            console.log(message + ' (' + code + ')');
          });

      this.hideSignupModal();
    }
  }
};
</script>

<style scoped>
/* 배경 비디오 스타일 */
.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 비디오가 화면을 꽉 채우도록 설정 */
  z-index: -1; /* 배경에 비디오가 위치하도록 설정 */
}

/* 로그인 페이지 스타일 */
.login-page {
  position: relative;
  height: 100vh;
  width: 100%;
  margin: 0;
}

/* 로그인 컨테이너 스타일 */
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

/* 아이디 / 비밀번호 입력창 스타일 */
.login-form {
  margin-bottom: 20px;
}

/* 입력창 스타일 (ID, Password 입력창) */
input[type="text"],
input[type="password"] {
  width: 90%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background-color: #343130;
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

/* 회원가입 버튼 및 텍스트 스타일 */
.signup-prompt {
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}

.buttons-container {
  margin-top: 10px;
}

.signup-btn {
  width: 100%;
  padding: 12px;
  background-color: #a5a1a0;
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

/* SNS 로그인 버튼 스타일 */
.sns-buttons {
  margin-top: 30px;
}

.sns-buttons button {
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

.google {
  background-color: #db4437;
  color: white;
}

.google:hover {
  background-color: #c1351d;
}

.facebook {
  background-color: #3b5998;
  color: white;
}

.facebook:hover {
  background-color: #2d4373;
}

.kakao {
  background-color: #ffeb00;
  color: black;
}

.kakao:hover {
  background-color: #f7d500;
}

.naver {
  background-color: #03c75a;
  color: white;
}

.naver:hover {
  background-color: #029a47;
}

/* 모달 스타일 */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
}

.modal-content .close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}
</style>
