import React from 'react'
import { useState } from 'react';


const SelectForm = () => {
    const [sensor, setSensor] = useState('abc');
    const [time, setTime] = useState('');
    const [inside, setInside] = useState('');

    const [isPending, setIsPending] = useState(false);
    const [display, setDisplay] = useState(false);
    const [exist, setExist] = useState(true);

    const handleSubmit = (e) =>{
        e.preventDefault();
        setIsPending(true);

        fetch('https://remi-square-backend.herokuapp.com/api/occupancy?sensor='+sensor+'&atInstant='+time)
            .then(res=>{
                if(res.ok){
                    return res.json()
                }
            }).then(data => {
                if(data.inside!==false){
                    setInside(data.inside);
                    setDisplay(true);
                }
                else{
                    setExist(false)
                    setInside(false);
                    setDisplay(false);
                }
                setIsPending(false);
            })
    }

    return ( 
        <div className="classic-form">
            <h2>Meeting room occupancy</h2>
            <form onSubmit={handleSubmit}>
                <label>Select a sensor</label>
                <select value={sensor} title="sensor" onChange={(e)=>setSensor(e.target.value)}>
                    <option value="abc">ABC</option>
                    <option value="def">DEF</option>
                    <option value="xyz">XYZ</option>
                </select>
                <label>Select the date and time</label>
                <input type="datetime-local" title="datetime" step='1' required value={time} onChange={(e)=> setTime(e.target.value)}/>
                {!isPending && <button title="submit">Show occupancy</button> }
                {isPending && <button disabled>Getting occupancy for {sensor}</button>}
            </form>
            {display && <div className="result">The sensor reports  {<h1>{inside}</h1>} people in the room</div>}
            {!exist && !display && <div className="result">The sensor was not yet in operation</div>}
        </div>
     );
}
 
export default SelectForm;