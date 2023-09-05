import { useState, useEffect } from "react";
import CountriesList from "../components/CountriesList";
import FilterInput from "../components/FilterInput";

const CountriesContainer = () => {

    const [countries, setCountries] = useState([]);
    const [visitedCountries, setVisitedCountries] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [visitedPageNumber, setVisitedPageNumber] = useState(1);
    const [filtered, setFiltered] = useState(false);
    const [filteredCountries, setFilteredCountries] = useState([]);

    const loadData = async () => {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const jsonData = await response.json();
        setCountries(jsonData); 
    };

    const maxItemsPerPage = 5;

    useEffect(() => {
        loadData();
    },[]);

    const backPage = () => {
        if(pageNumber > 1){
            setPageNumber(pageNumber - 1);
        }
    };

    const nextPage = () => {
        if(!filtered){
            if(pageNumber < countries.length/maxItemsPerPage){
                setPageNumber(pageNumber + 1);
            }
        } else {
            if(pageNumber< filteredCountries.length/maxItemsPerPage){
                setPageNumber(pageNumber + 1);
            }
        }
    };

    const visitedBackPage = () => {
        if(visitedPageNumber > 1){
            setVisitedPageNumber(visitedPageNumber - 1);
        }
    };

    const visitedNextPage = () => {
        if(visitedPageNumber < visitedCountries.length/maxItemsPerPage){
            setVisitedPageNumber(visitedPageNumber + 1);
        }
    };

    const moveCountryToVisited = (countryToUpdate) => {
        const updatedVisited = [countryToUpdate, ...visitedCountries];
        setVisitedCountries(updatedVisited);
        setCountries(countries.filter((country) => country.name.common !== countryToUpdate.name.common));
        setFilteredCountries(filteredCountries.filter((country) => country.name.common !== countryToUpdate.name.common))
    };

    const moveCountryToAll = (countryToUpdate) => {
        const updatedAllCountries = [countryToUpdate, ...countries];
        setCountries(updatedAllCountries);
        setVisitedCountries(visitedCountries.filter((country) => country.name.common !== countryToUpdate.name.common))
    };

    const filterByName = (name) => {
        setFiltered(true);
        const filteredCountries = [];

        countries.forEach((country) => {
            if(country.name.common.toLowerCase().includes(name.toLowerCase())){
                filteredCountries.push(country);
            }
        });
        setFilteredCountries(filteredCountries);
    }

    const maxPageNumber = () => {
        if(!filtered){
            return Math.ceil(countries.length/maxItemsPerPage)
        } else{
            return Math.ceil(filteredCountries.length/maxItemsPerPage)
        }
    }

    const displayTitle = () =>{
        if(!filtered){
            return "All Countries"
        } else{
            return "Filtered Countries"
        }
    }

    const clearFilter = () => {
        setFiltered(false);
    }

    const displayCountries = () => {
        if(!filtered){
            return countries ? <CountriesList 
            countries={countries} 
            pageNumber={pageNumber} 
            maxItemsPerPage={maxItemsPerPage} 
            moveCountryToVisited={moveCountryToVisited}
            moveCountryToAll={moveCountryToAll}
            name="all_countries"/> : <p>loading...</p>
        } else{
            return filteredCountries ? <CountriesList 
            countries={filteredCountries} 
            pageNumber={pageNumber} 
            maxItemsPerPage={maxItemsPerPage} 
            moveCountryToVisited={moveCountryToVisited}
            moveCountryToAll={moveCountryToAll}
            name="all_countries"/> : <p>loading...</p>
        }
    }

    return(
        <>
            <div className="page_layout">
                <div className="all_countries">
                    <FilterInput filterByName={filterByName}/>
                    <input type="button" onClick={clearFilter} value="Clear"/>
                    <h2>{displayTitle()}</h2>
                    <p>Page: {pageNumber}/{maxPageNumber()}</p>
                    <div className="buttons">
                        <button onClick={backPage}>Back</button>
                        <button onClick={nextPage}>Next</button>
                    </div>
                    {displayCountries()}
                </div>
                <div className="visited_countries">
                    <h2>Visited Countries</h2>
                    <p>Page: {visitedPageNumber}/{Math.ceil(visitedCountries.length/maxItemsPerPage)}</p>
                    <div className="buttons">
                        <button onClick={visitedBackPage}>Back</button>
                        <button onClick={visitedNextPage}>Next</button>
                    </div>
                    <CountriesList 
                        countries={visitedCountries} 
                        pageNumber={visitedPageNumber} 
                        maxItemsPerPage={maxItemsPerPage}
                        moveCountryToVisited={moveCountryToVisited}
                        moveCountryToAll={moveCountryToAll}
                        name="visited_countries"/>
                </div>
            </div>
        </>
    )
}

export default CountriesContainer;