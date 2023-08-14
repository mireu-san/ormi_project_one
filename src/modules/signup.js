function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    // # 추후개선1
    axios.post('http://127.0.0.1:8000/users/', {
        username: username,
        password: password
    })
    .then((response) => {
        alert('Sign up successful! Redirecting to login page...');
        window.location.href = '../../login.html';
    })
    .catch((error) => {
        alert('Sign up failed');
    });
}
