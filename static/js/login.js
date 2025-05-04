new Vue({
  el: "#app",
  delimiters: ["${", "}"],
  data: {
    form: {
      username: "",
      password: "",
    },
    message: "",
    messageType: "",
  },
  methods: {
    handleLogin() {
      axios
        .post("/login", this.form)
        .then((response) => {
          if (response.data.success) {
            this.message = "Đăng nhập thành công";
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
