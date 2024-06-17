import fetch from 'node-fetch';
import CryptoJS from 'crypto-js';
import fs from 'fs';

async function getComics(){
    const publicKey ='96a3834334b5035f61b7ab28551e9e93';
    const privateKey = '24200ee263c222c28fc65e88fc43d0d5c13502fd';
    const timeStamp = new Date().getTime();
    const hash = CryptoJS.MD5(timeStamp + privateKey + publicKey).toString();
    const apiUrl = 'https://gateway.marvel.com/v1/public/comics';
    const url = `${apiUrl}?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;
    let csvContent = ""; // Encabezados del CSV
    
    try{
        const comics = await fetch(url);
        const comicsJson = await comics.json();
        //console.log(comicsJson.data.results);
        let uniqueIds = new Set();
        comicsJson.data.results.forEach(comic => {
            if(!uniqueIds.has(comic.id)){
                csvContent += csvContent += `${comic.id},${comic.title},"${comic.thumbnail.path}.${comic.thumbnail.extension}",${comic.prices[0].price}\n`;
                uniqueIds.add(comic.id);
            }
        });
        fs.writeFileSync('comics.csv', csvContent, 'utf-8')
    }
    catch (error){
        console.log(error);
    }
};

getComics();