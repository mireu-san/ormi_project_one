function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // # 추후개선2
    axios.post('http://127.0.0.1:8000/api/login/', {
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
