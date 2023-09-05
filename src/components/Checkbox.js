import { useState } from "react";

const Checkbox = ({country, moveCountryToVisited, moveCountryToAll, name}) => {

    const [checked, setChecked] = useState(name === "visited_countries")

    const handleCheck = () => {
        setChecked(!checked);
        if(!checked){
            moveCountryToVisited(country);
            setChecked(false);
        } else{
            moveCountryToAll(country);
            setChecked(true);
        }
    }

    return(
        <>
            <input type="checkbox" checked={checked} onChange={handleCheck}/>
        </>
    )
}

export default Checkbox;