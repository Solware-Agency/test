function enviarFormulario() {
  const campos = [
    "nombre",
    "telefono",
    "correo",
    "empresa",
    "sector",
    "areasInteres",
    "comentarios",
  ];
  const datos = campos.reduce((obj, campo) => {
    obj[campo] = document.getElementById(campo).value;
    return obj;
  }, {});

  fetch(
    "https://script.google.com/macros/s/AKfycbz7OWowppuf1PM64wckorjANI-5SYCLVYahSvCpSJqrxBpVqZsYvQFsLwYUHgDsw8qG/exec",
    {
      // URL de tu Apps Script (actualizada)
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(datos),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la red: " + response.status);
      }
      return response.text();
    })
    .then((data) => {
      document.querySelector(".form-section").style.display = "none";
      document.getElementById("thankYouMessage").style.display = "flex";
    })
    .catch((error) => {
      alert("Error al enviar los datos: " + error);
    });
}
