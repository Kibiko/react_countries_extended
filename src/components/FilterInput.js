import { useState } from "react";

const FilterInput = ({filterByName}) =>{

    const [filterName, setFilterName] = useState("")

    const handleFilter = (e) =>{
        e.preventDefault();
        filterByName(filterName);
    }

    return(
        <>
            <form onSubmit={handleFilter}>
                <input type="text" placeholder="Enter country..."  onChange={(e) => setFilterName(e.target.value)}/>
                <input type="submit"  value="Filter"/>
            </form>
        </>
    )
}

export default FilterInput;