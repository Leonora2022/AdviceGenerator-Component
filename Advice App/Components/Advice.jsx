
import { useEffect, useState } from "react"


export default function Advice() {
    const [advices, setAdvices] = useState(null)
    const [error, setError] = useState(false)

    useEffect(()=>{
        getAdvice()
    }, [])
    console.log(advices);

    // HANDLE DICE CLICK
    function handleClick() {
        let advice = null;
        try {
            advice =  getAdvice();
            if (!advice.ok) setError(preState => !preState)
        }catch(error) {
           setError(preState => !preState)
            console.error(error)
        } 
    }

    //   FETCH DATA FROM API
    async function getAdvice() {
        let res = await fetch(`https://api.adviceslip.com/advice`)
        let data = await res.json();
        return setAdvices(data.slip);
    }

    // DISPLAY ERROR MESSAGE
    let errorDisplay;
    if (error) {
        errorDisplay = "Loading Error..."
        setTimeout(()=>{
            errorDisplay = document.querySelector('.error').textContent = null
        }, 1000)
    } else {
        errorDisplay = null
    }
   
    return (
        
        <div className="wrapper-advice">
           {advices ? (
            <div>
            <p className="advice-title">{`Advice #${advices.id}`}</p>
            <p className="advice-body">{`"${advices.advice}"`}</p>
            <button onClick={()=> handleClick()} className="dice-btn"><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" fill="#ff3084"/></svg></button>
            <p className="error">{errorDisplay}</p>

             </div>
           ) : (<h2>loading...</h2>)}
        </div>
    
    )
}