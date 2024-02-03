const privateRoutes = ["mainCarebeneficiary.html","mainCaregiver.html"];

function guardianCb() {
  const isAuthenticatedCb = localStorage.getItem("userId");
  const path = window.location.pathname;
  const routeActu = path.substring(path.lastIndexOf("/") + 1);

  if (privateRoutes.includes(routeActu) && !isAuthenticatedCb) {
    alert("No tienes permisos");
    window.location.href = "index.html";
    
  }
}

function guardianCg() {
  const isAuthenticatedCg = localStorage.getItem("userIdCg");
  const path = window.location.pathname;
  const routeActu = path.substring(path.lastIndexOf("/") + 1);

  if (privateRoutes.includes(routeActu) && !isAuthenticatedCg) {
    alert("No tienes permisos");
    window.location.href = "index.html";
    
  }
}

function cerrarSesion() {
  localStorage.removeItem("userId");
  localStorage.removeItem("userIdCg");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded",()=>{
  guardianCb();
  guardianCg();
})