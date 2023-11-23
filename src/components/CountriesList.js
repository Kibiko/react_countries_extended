import Country from "./Country"

const CountriesList = ({countries, pageNumber, maxItemsPerPage, moveCountryToVisited, moveCountryToAll, name}) => {

    const mappedCountries = countries.filter((country, index) => {
        if(index >= (pageNumber-1)*maxItemsPerPage && index < pageNumber*maxItemsPerPage){
            return true;
        }
    })
        .map((country, index) => {
        return <Country 
            country={country} 
            key={index} 
            moveCountryToVisited={moveCountryToVisited}
            moveCountryToAll={moveCountryToAll}
            name={name}/>
    });

    return(
        <>
            {mappedCountries}
        </>
    )
}

export default CountriesList;