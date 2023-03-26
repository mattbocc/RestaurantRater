import React, {useContext, useEffect} from 'react'
import RestaurantAPI from '../apis/RestaurantAPI'
import { RestContext } from '../context/RestContext'
import { useNavigate } from "react-router-dom"

const List = (props) => {

  const {restaurants, setRestaurants} = useContext(RestContext)
  //setRestaurants is used to send all restaurants in DB into 'restaurants' array
  let navigate = useNavigate()


  useEffect(  () => {

    const fetch = async () =>{
      try {
        const response = await RestaurantAPI.get("/")
        setRestaurants(response.data.data.restaurant) //explicitly sending all restaurants and their details from DB as an array to restaurants
      } catch (error) {
        console.log(error)
      }
    }

    fetch()

  },[])

  const review = async (id) => {
    navigate(`/${id}`)
  }

  const deleteHandler = async (id) =>{
    try {
      const response = await RestaurantAPI.delete(`/${id}`)
      setRestaurants(restaurants.filter(restaurant =>{
        return restaurant.id !== id
      }))
      console.log(response)
    } catch (error) {
      console.log(error)
    }
    window.location.reload(true)
  }

  return (
    <div className='mx-5'>
      <table className="table table-light table-striped table-hover border">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Location</th>
            <th scope="col">Address</th>
            <th scope="col">Type</th>
            <th scope="col">Price</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>

          </tr>
        </thead>
        <tbody>

          {
            restaurants && restaurants.map((restaurant) => {

              return(
                <tr key = {restaurant.id}>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{restaurant.address}</td>
                  <td>{restaurant.type}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>
                    <button onClick = {() => review(restaurant.id)} className='btn btn-outline-dark'>Reviews</button>
                  </td>
                  <td>
                    <button onClick = {() => deleteHandler(restaurant.id)}className='btn btn-outline-danger'>Delete</button>
                  </td>
                </tr>
              )

            })
          }

        </tbody>
    </table>
    </div>
  )
}

export default List;
