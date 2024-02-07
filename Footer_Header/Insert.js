// Este js inserta el header y footer a los HTML
export function  exportar() {
    document.addEventListener("DOMContentLoaded",()=>{
        const header = document.querySelector("header");
        const footer = document.querySelector("footer");

        const headerContent = "../Footer_Header/header.txt";
        const footerContent = "../Footer_Header/footer.txt";
        
        async function insertarHeader_Footer() {
            const headerResponse = await fetch(headerContent);
            const headerData = await headerResponse.text();
            
            const footerResponse = await fetch(footerContent);
            const footerData = await footerResponse.text(); 
        
            header.innerHTML = headerData;
            footer.innerHTML = footerData;

        }
        insertarHeader_Footer();

    })
}