
document.addEventListener('DOMContentLoaded', () => {
    getComics();
});
async function getComics(){
    const publicKey ='96a3834334b5035f61b7ab28551e9e93';
    const privateKey = '24200ee263c222c28fc65e88fc43d0d5c13502fd';
    const timeStamp = new Date().getTime();
    const hash =    CryptoJS.MD5(timeStamp + privateKey + publicKey);
    const apiUrl = 'https://gateway.marvel.com/v1/public/comics';
    const url = `${apiUrl}?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;
    try{
        //Se ejecuta cuando todo anda bien
        const comics = await fetch(url);
        const comicsJson = await comics.json();
        console.log(comicsJson.data.results);
        

        const divComics = document.getElementById('comics');
        const arrayComics = [];
        comicsJson.data.results.forEach(comic => {
            
        if(comic.id != 82967 && comic.id != 82965 && comic.id != 1590 && comic.id != 183 && comic.id != 2088 && comic.id != 1749 && comic.id !=1158 && comic.id != 1689 && comic.id != 1220 && comic.id != 1308 && comic.id !=1994 && comic.id != 1332){
                
                divComics.innerHTML += ` <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 my-3">
                                        <div class="card h-100">
                                            <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" class="card-img-top" alt="..." style="max-height: 624.88px;">
                                            <div class="card-body">
                                                <h5 class="card-title">${comic.title}</h5>
                                                <p class="card-text">$12000</p>
                                            </div>
                                            <div class="d-grid">
                                                <button class="btn btn-dark btn-block" onclick="location.href='./vistaProducto.html'">Comprar</button>
                                            </div>
                                        </div>
                                    </div>`
            
            };
            
        });
    
    }
    catch (error){
        //Se ejecuta cuando hay un error
        console.log(error);
    };
};