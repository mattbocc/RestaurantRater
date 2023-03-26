import React from 'react'
import StarRating from './StarRating'

const Reviews = ({reviews}) => {
  return (
        <div className='row'>
            {
                reviews.map((review) => {
                    return(
                        <div key = {review.id} className='col-sm-3 mb-3'>
                            <div className='card bg-light'>
                                <div className='card-body'>
                                    <h5 className='card-title'>{review.name}</h5>
                                    <p className='card-text'>{review.comment}</p>
                                    <span> <StarRating rating = {review.score}/> </span>
                                </div>
                            </div>
                        </div>
                    )

                })
            }
        </div>


        
  )
}

export default Reviews;
