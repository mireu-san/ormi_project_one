function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // # 추후개선2 - jwt token 처리로 인해 endpoint 명은 token. 
    // env 처리 고려.
    axios.post('http://127.0.0.1:8000/api/token/', {
        username: username,
        password: password
    })    
    .then((response) => {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        window.location.href = '../../index.html';
    })
    .catch((error) => {
        alert('Login failed');
    });
}
