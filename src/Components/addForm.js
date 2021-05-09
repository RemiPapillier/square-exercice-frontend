import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

toast.configure();

const AddForm = () => {
    const [sensor, setSensor] = useState('abc');
    const [time, setTime] = useState('');
    const [into, setInto] = useState('');
    const [out, setOut] = useState('');
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = (e) =>{
        e.preventDefault();
        const counter = { sensor, time, into, out };

        setIsPending(true);

        fetch('https://remi-square-backend.herokuapp.com/api/webhook', {
            method: 'POST',
            body: JSON.stringify(counter)
        }).then(res=>{
            setIsPending(false);
            showMsg(res.ok);
        })
    }

    const showMsg = (s) => {
        if (s === true) {
            toast.success('New ' + sensor.toUpperCase() + ' request added', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } else {
            toast.error('Failed to add the request', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }

    return ( 
        <div className="classic-form">
            <h2>Simulate a new sensor request</h2>
            <form onSubmit={handleSubmit}>
                <label>Sensor</label>
                <select value={sensor} title="sensor" onChange={(e)=>setSensor(e.target.value)}>
                    <option value="abc">ABC</option>
                    <option value="def">DEF</option>
                    <option value="xyz">XYZ</option>
                </select>
                <label>Date and time</label>
                <input type="datetime-local" title="datetime" step='1' required value={time} onChange={(e)=> setTime(e.target.value)}/>
                <label>Number of people going in</label>
                <input type="number" title="inInput" required value={into} onChange={(e)=> setInto(e.target.value)}/>
                <label>Number of people going out</label>
                <input type="number" title="outInput" required value={out} onChange={(e)=> setOut(e.target.value)}/>
                {!isPending && <button title="submit">Add request</button> }
                {isPending && <button disabled>Adding request...</button>}
            </form>
        </div>
     );
}
 
export default AddForm;