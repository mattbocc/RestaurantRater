import React, { useState } from 'react'
import RestaurantAPI from '../apis/RestaurantAPI'
import { useParams } from 'react-router-dom'

const AddReview = () => {

    const {id} = useParams()
    const [name, setName] = useState("")
    const [score, setScore] = useState("") 
    const [comment, setComment] = useState("")

    const submitReview = async (e) => {
        e.preventDefault()

        try {
            const newReview = await RestaurantAPI.post(`/${id}/review`, {
                name: name,
                comment: comment,
                score: score
            })
        } catch (error) {
            console.log(error)
        }
        
        window.location.reload(true)
    }

  return (
    <div>
        <form action="" className='mt-5'>
            
            <div className="row">
                <div className="col">
                    <input value={name} onChange={e => setName(e.target.value)} type = "text" className='form-control' placeholder='Full Name' />
                </div>
                <div className="col form-group">
                    <select value={score} onChange={e => setScore(e.target.value)} className='form-control form-control-md' >
                        <option value="disabled">Rating</option>
                        <option value="1">1/5</option>
                        <option value="2">2/5</option>
                        <option value="3">3/5</option>
                        <option value="4">4/5</option>
                        <option value="5">5/5</option>
                    </select>
                </div>
                <div className="col">
                    <button onClick = {submitReview}
                    type = "submit" className='btn btn-outline-dark'>Add</button>
                </div>
            </div>
            <div className='mt-3 mb-4'>
                <textarea value={comment} onChange={e => setComment(e.target.value)} className='form-control' placeholder='Comment' rows = '3'/>
            </div>
        </form>
      
    </div>
  )
}

export default AddReview;
