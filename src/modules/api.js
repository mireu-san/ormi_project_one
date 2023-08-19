const axios = window.axios;

// !!!주의: 향후 실제 서비스 시, 백엔드 프록시 서버 또는 aws 로 처리 필수.
// const url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;
const url = `http://127.0.0.1:8000/chatbot/api/chat/`;

// data = main.js 의 questionData 와 연계되고 있음.
export const apiPost = async (data) => {
  const token = localStorage.getItem('access_token');
  try {
    const result = await axios({
      method: "post",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      data: JSON.stringify(data),
    });
    return result.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // 토큰 만료로 인한 401 오류 처리
      console.log("Token has expired. Redirecting to login page...");
      // 로그인 페이지로 리다이렉트하는 코드
      window.location.href = "/login.html";
    } else {
      throw error;
    }
  }
};

// jwt 토큰 유효기간 체크 함수
function decodeJWT(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};


export function checkTokenExpiration() {
  const token = localStorage.getItem('access_token');
  if (!token) {
      console.log("No access_token found in localStorage.");
      return;
  }

  const decodedToken = decodeJWT(token);
  const expirationDate = new Date(decodedToken.exp * 1000);
  const now = new Date();

  if (now > expirationDate) {
      console.log("Token has expired.");
  } else {
      console.log("Token is still valid. Expires at:", expirationDate);
  }
}
