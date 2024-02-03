const cerrarSesionbtn = document.querySelector("#cerrarSesion");

function guardianCb() {
  const isAuthenticatedCb = localStorage.getItem("userId");
  const path = window.location.pathname;
  const routeActu = path.substring(path.lastIndexOf("/") + 1);
  const privateRoutes = ["mainCarebeneficiary.html"];

  if (privateRoutes.includes(routeActu) && isAuthenticatedCb == null) {
    alert("No tienes permisos");
    window.location.href = "../homePage/index.html";
    
  }
}

function guardianCg() {
  const isAuthenticatedCg = localStorage.getItem("userIdCg");
  const path = window.location.pathname;
  const routeActu = path.substring(path.lastIndexOf("/") + 1);
  const privateRoutes = ["mainCaregiver.html"];
  
  if (privateRoutes.includes(routeActu) && isAuthenticatedCg == null) {
    alert("No tienes permisos");
    window.location.href = "../homePage/index.html";
    
  }
}

function cerrarSesion() {
  const verificarExistenciaCbId = localStorage.getItem("userId");
  const verificarExistenciaCgId = localStorage.getItem("userIdCg");

  if ((verificarExistenciaCbId || verificarExistenciaCgId)==null) {
    alert("No tienes sesión que cerrar");
    return;
  }
  localStorage.removeItem("userId");
  localStorage.removeItem("userIdCg");
  window.location.href = "index.html";
}

guardianCb();
guardianCg();
