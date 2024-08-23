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

  // Validar campos vacíos
  for (const campo of campos) {
    if (!document.getElementById(campo).value) {
      alert(`El campo ${campo} es obligatorio.`);
      return; // Detener el envío si hay campos vacíos
    }
  }

  const datos = campos.reduce((obj, campo) => {
    obj[campo] = document.getElementById(campo).value;
    return obj;
  }, {});

  // Deshabilitar el botón de envío
  const botonEnviar = document.getElementById("botonEnviar");
  botonEnviar.disabled = true;

  fetch(
    "https://script.google.com/macros/s/AKfycbw2qkY3k-LBTKrSiAXthtou58ObWzWVxODUIH1ZBYLIonSzkvZ1wdxl7tTjetp22hZi/exec",
    {
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
    })
    .finally(() => {
      // Habilitar el botón de envío nuevamente
      botonEnviar.disabled = false;
    });
}
