new Vue({
  el: "#app",
  delimiters: ["${", "}"],
  data: {
    form: {
      username: "",
      email: "",
      password: "",
    },
    message: "",
    messageType: "",
  },
  methods: {
    handleRegister() {
      axios
        .post("/register", this.form)
        .then((response) => {
          if (response.data.success) {
            this.message = response.data.message;
            this.messageType = "alert-success";
            setTimeout(() => {
              window.location.href = response.data.redirect;
            }, 1500);
          } else {
            this.message = response.data.message;
            this.messageType = "alert-error";
          }
        })
        .catch((error) => {
          this.message = "An error occurred. Please try again.";
          this.messageType = "alert-error";
          console.error(error);
        });
    },
  },
});

new Vue({
  el: '#app',
  data: {
      form: {
          username: '',
          email: '',
          password: ''
      },
      message: '',
      messageType: ''
  },
  methods: {
      validateEmail(email) {
          const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return re.test(email);
      },
      handleRegister() {
          // Validate
          if (!this.form.username || !this.form.email || !this.form.password) {
              this.message = 'All fields are required';
              this.messageType = 'alert-error';
              return;
          }
          
          if (!this.validateEmail(this.form.email)) {
              this.message = 'Invalid email format';
              this.messageType = 'alert-error';
              return;
          }
          
          axios.post('/register', this.form)
              .then(response => {
                  if (response.status === 201) {
                      this.message = response.data.message;
                      this.messageType = 'alert-success';
                      setTimeout(() => {
                          window.location.href = response.data.redirect;
                      }, 1500);
                  } else {
                      this.message = response.data.message || 'Registration failed';
                      this.messageType = 'alert-error';
                  }
              })
              .catch(error => {
                  const serverMsg = error.response?.data?.message;
                  this.message = serverMsg || 'An error occurred. Please try again.';
                  this.messageType = 'alert-error';
                  console.error('Registration error:', error.response || error);
              });
      }
  }
});
