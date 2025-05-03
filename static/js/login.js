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
            window.location.href = response.data.redirect;
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
