import React, {useState, createContext} from "react"

export const RestContext = createContext()

export const RestContextProvider = (props) => {

    const [restaurants, setRestaurants] = useState ([])
         
    const [restReview, setRestReview] = useState (0)
        
    
    return(
        //passing the value of restaurants to each component
        <RestContext.Provider value = {{restaurants, setRestaurants, restReview, setRestReview}}> 
            {props.children}
        </RestContext.Provider>
    )
}
