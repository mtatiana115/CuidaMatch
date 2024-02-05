//variables
const URLBase = "https://api.mymemory.translated.net/";

/**
 * Traduce un texto en base al idioma en el que está el texto y al que lo desea traducir
 * @param {Texto que se va a traducir} texto
 * @param {Idioma actual del texto} idiomaTexto
 * @param {Idioma en el que desea traducir el texto} idiomaTraducir
 * @returns
 */
async function traducir(texto, idiomaTexto, idiomaTraducir) {
  const URL = `${URLBase}?q=${texto}&langpair=${idiomaTexto}|${idiomaTraducir}`;
  try {
    const respuesta = await fetch(URL);
    const data = await respuesta.json();

    if (!respuesta.ok) {
      console.error("Error al traducir:", data.responseDetails);
      return false;   
    }

    const traduccion = data.responseData.translatedText;
    return traduccion;
  } catch (error) {
    console.log("Error al traducir:", error);
  }
}

/**
 * Traduce una lista de elementos HTML especificada en la funcion
 * @param {Idioma actual del texto} idiomaTexto
 * @param {Idioma en el que desea traducir el texto} idiomaTraducir
 */
async function traducirElementos(idiomaTexto, idiomaTraducir) {
  const textoTraducir = Array.from(
    document.querySelectorAll("h1,h2,h5,td,li,label,a")
  );

  //Recorre todos los elementos que se van a traducir
  for (let element of textoTraducir) {
    const texto = await traducir(
      element.textContent,
      idiomaTexto,
      idiomaTraducir
    );
    //Si la funciono la traduccion deja de traducir  la pagina
    if (!texto) break;
    element.textContent = texto;
  }
}

/**
 * En base al elemento("isEnglish") del local storage, el idioma de la pagina se traduce a ingles o español
 */
export function TraducirPagina() {
  if (localStorage.getItem("isEnglish")) {
    traducirElementos("en-GB", "es-ES");
    localStorage.removeItem("isEnglish");
    btnIdioma.src="/multimedia/iconoEnglish.png"
  } else {
    traducirElementos("es-ES", "en-GB");
    localStorage.setItem("isEnglish", true);
    btnIdioma.src="/multimedia/iconoSpanish.png"
  }
}

/**
 * Traduce la pagina en base al idioma que tiene actualmente el elemento("isEnglish") del local storage,
 */
export async function UtilizarIdiomaActual() {
  //Si la pagina es en español no hace nada
  localStorage.getItem("isEnglish") && traducirElementos("es-ES", "en-GB");
}

//Selectores
const btnIdioma = document.querySelector(".iconIdioma");


//Eventos
btnIdioma.addEventListener("click", () => {
  TraducirPagina()
});
