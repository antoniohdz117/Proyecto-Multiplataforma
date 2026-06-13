$(document).ready(function () {
  $("#loginForm").submit(function (event) {
    event.preventDefault();

    const numeroCuenta = $("#numero_cuenta").val();
    const fechaNacimiento = $("#fecha_nacimiento").val();

    if (!numeroCuenta || !fechaNacimiento) {
      alert("Debes ingresar número de cuenta y fecha de nacimiento");
      return;
    }

    $.ajax({
      url: "/api/auth/login",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        numero_cuenta: numeroCuenta,
        fecha_nacimiento: fechaNacimiento,
      }),

      success: function (response) {
        alert(response.message);

        localStorage.setItem("user", JSON.stringify(response.user));

        window.location.href = "/index";
      },

      error: function (error) {
        console.log(error);

        let mensaje = "Error al iniciar sesión";

        if (error.responseJSON && error.responseJSON.message) {
          mensaje = error.responseJSON.message;
          
        }

        alert(mensaje);
      },
    });
  });
});