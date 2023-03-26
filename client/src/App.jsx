import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./routes/Home"
import Adjust from "./routes/Adjust"
import Details from "./routes/Details"
import { RestContextProvider } from './context/RestContext'

const App = () =>{
    return (
        <RestContextProvider>
            <div>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Home/>} />
                        <Route exact path = "/:id/update" element = {<Adjust/>}/>
                        <Route exact path = "/:id" element = {<Details/>}/>
                    </Routes>
                </Router>
            </div>
        </RestContextProvider>
    )
};

export default App;