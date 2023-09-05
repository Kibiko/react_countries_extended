import Checkbox from "./Checkbox";

const Country = ({country, moveCountryToVisited, moveCountryToAll, name}) => {

    return(
        <>
            <details><summary className="header">{country.flag} {country.name.common}
            <Checkbox 
                country={country} 
                moveCountryToVisited={moveCountryToVisited} 
                moveCountryToAll={moveCountryToAll}
                name={name}/></summary>
            <p>Region: {country.region}</p>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            </details>
        </>
    )

}

export default Country;