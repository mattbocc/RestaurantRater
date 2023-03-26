//rafce
import React, { useState } from 'react'
import RestaurantAPI from '../apis/RestaurantAPI'


const AddRest = () => {


  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [address, setAddress] = useState("")
  const [type, setType] = useState("")
  const [price, setPrice] = useState("")

  const submit = async (e) => {
    e.preventDefault() //stops the page from refreshing

    try {
      const response = await RestaurantAPI.post("/", {
        name: name,
        location: location,
        address: address,
        type: type,
        price_range: price
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }

    window.location.reload(true)


  }

  return (
    <div className='mb-4'>
      <form action="">
        <div className="row px-5">
            <div className="col ms-5">
                <input value = {name} onChange = {(e) => setName(e.target.value)} type = "text" className='form-control' placeholder='Name' />
            </div>
            <div className="col">
                <input value = {location} onChange = {(e) => setLocation(e.target.value)} type="text" className='form-control' placeholder='Location'/>
            </div>
            <div className="col">
                <input value = {address} onChange = {(e) => setAddress(e.target.value)}type="text" className='form-control' placeholder='Address'/>
            </div>
            <div className="col">
                <input value = {type} onChange = {(e) => setType(e.target.value)} type="text" className='form-control' placeholder='Type (eg. restaurant, bar)'/>
            </div>
            <div className="col-1">
                <select value = {price} onChange = {(e) => setPrice(e.target.value)} className='form-control form-control-md'>
                    <option value="disabled">Price</option>
                    <option value="1">$</option>
                    <option value="2">$$</option>
                    <option value="3">$$$</option>
                    <option value="4">$$$$</option>
                    <option value="5">$$$$$</option>
                </select>
            </div>
            <div className="col">
              <button onClick = {submit} type = "submit" className='btn btn-outline-dark ms-2'>Add</button>
            </div>
        </div>
      </form>
    </div>
  )
}

export default AddRest;
