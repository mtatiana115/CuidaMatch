(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const path = window.location.pathname;
    const routeActu = path.substring(path.lastIndexOf('/') + 1);

    const privateRoutes = [
        "main.html"
    ];
    
    if (privateRoutes.includes(routeActu) && !isAuthenticated) {
        window.location.href = "index.html";
    }
}
)()

function cerrarSesion() {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "index.html";
}