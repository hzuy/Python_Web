new Vue({
    el: '#app',
    delimiters: ['${', '}'],
    data: {
        user: userData
    },
    methods: {
        logout() {
            axios.get('/logout')
                .then(() => {
                    window.location.href = '/login';
                })
                .catch(error => {
                    console.error('Logout failed:', error);
                });
        }
    }
});