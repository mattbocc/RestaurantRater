import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import RestaurantAPI from '../apis/RestaurantAPI'
import { RestContext } from '../context/RestContext'
import StarRating from '../components/StarRating'
import Reviews from '../components/Reviews'
import AddReview from '../components/AddReview'

  const Details = () => {
  const {id} = useParams()
  const {restReview, setRestReview} = useContext(RestContext)
  let navigate = useNavigate()
  
  const backToHome = async () => {
    navigate(`/`)
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await RestaurantAPI.get(`/${id}`)
        console.log(response)
        setRestReview(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetch()
  }, [])

  return (    
    <div className='container'> 
    {restReview && (
        <>
          <h1 className='font-weight-light display-3 text-center mb-4 mt-2'>{restReview.restaurant.name}</h1>
          <div className='text-center'>
            <h3><StarRating rating = {restReview.score}/>({restReview.score})</h3>
          </div>
            <div className='mt-4'>
              <Reviews reviews = {restReview.reviews}/>
            </div>   
            <AddReview/>
          <div className='text-center'>
            <button onClick = {() => backToHome()} className='btn btn-outline-dark'>Back</button>
          </div>
        </>
          
        )}        
    </div>
  )
}

export default Details;
