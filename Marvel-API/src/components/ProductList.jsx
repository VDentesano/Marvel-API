import React, { useState } from 'react'
import { useEffect } from 'react'
import { Pagination } from './Pagination'

export const ComicList = () => {

  const [comics, setComics] = useState([])
  const [comicsPerPage, setcomicsPerPage] = useState(6)
  const [currentPage, setcurrentPage] = useState(1)

  const PUBLIC_KEY = "8b176a03d6447e12ee9cc147f9659307";
  const MD5 = "7dd797e292d58dfe70a2bf65237488cf";
  const URL_EXTENSION = `?ts=1&apikey=${PUBLIC_KEY}&hash=${MD5}`;
  const URLApiComics = `http://gateway.marvel.com/v1/public/comics${URL_EXTENSION}`;
  

  const apiFetch = async (url) => {
    try {
      return fetch(url)
        .then(res => res.json())
        .then(data => data)
    } catch {
      console.log("Error en la llamada");
    }
  }

  const mostrarComic = () => {
    //fetch a comics
    const dataPromise = apiFetch(URLApiComics)
    dataPromise.then(res => {
      const arrayComics = res.data.results;

      arrayComics.forEach(async comic => {
        //fetch por cada comic
        const urlCaracter = comic.characters.collectionURI + URL_EXTENSION;
        const caracterDataObj = await apiFetch(urlCaracter)

        //datos que te pide la empresa por cada comic downs
        const characters = caracterDataObj.data.results
        const title = comic.title
        const description = comic.description
        const thumbnail = comic.thumbnail.path + "." + comic.thumbnail.extension;

        setComics([...comics, {
          title,
          description,
          characters,
          thumbnail,
        }])
      })
    })
  }

  useEffect(() => {
    mostrarComic();
  }, []);


  return (
      <>
        <div className="container-comics">
          {comics.map(comic => (
            <div key={comic.title} className="card-comic">
              <figure className="container-img">
                <img src={comic.thumbnail} alt={comic.title} />
              </figure>
              <div className="info-comic">
                <h3>{comic.title}</h3>
                <p className="description">{comic.description}</p>
                <p className="characters">{comic.characters}</p>
              </div>
            </div>
          ))}
        </div>
        <Pagination />
      </>
    );
};