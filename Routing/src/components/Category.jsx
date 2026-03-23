// Importerer useParams-hooken fra react-router-dom
// useParams brukes for å hente URL-parametere (f.eks :slug)
import { useEffect } from 'react'
import { useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'

export default function Category(){
    const {apiEndpoint, defaultApiUrl} = useOutletContext()
    const [apiData, setApiData] = useState([])
    //Kommenterer ut staten under da den blir unødvendig siden vi allerede har en state som oppdateres og endres basert på hva vi er inne på og hva endepunktet fra api er
    //const [spritesImg, setSpritesImg] = useState()
    
    /* spritesImg regnes ut direkte fra apiData
    hver gang komponenten renderer.*/
    const spritesImg = apiData?.sprites
    ? Object.keys(apiData.sprites)
    : [];
    
    const { slug,cat } = useParams()

    console.log("Denne kommer fra Category", apiEndpoint)

    const getSingleData = async()=>{
        const response = await fetch(apiEndpoint ? apiEndpoint : defaultApiUrl+slug+"/"+cat)
        const data = await response.json()
        setApiData(data)
    }


    useEffect(()=>{
        getSingleData()
    },[cat, apiEndpoint])


    return (
        <main>
             <h1>{apiData?.name}</h1>
             <section>
                <h2>Bilder</h2>
                {spritesImg?.map((item) => (
                    apiData?.sprites?.[item] ?
                   
                        <img key={item} src={apiData?.sprites?.[item]} alt={apiData?.name} />
                        : null
                ))}
             </section>
        </main>
       
    )
}