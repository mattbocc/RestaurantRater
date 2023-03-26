import React from 'react'

const StarRating = ({ rating }) => {
  const imgs = []

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      <i class="fa-sharp fa-solid fa-star-half-stroke" style="color: #000000;"></i>
      imgs.push(<i key={i} className="fa-sharp fa-solid fa-star fa-lg" ></i>)
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      imgs.push(<i key={i} className="fa-sharp fa-solid fa-star-half-stroke fa-lg"></i>)
    } else {
      imgs.push(<i key={i} className="fa-sharp fa-regular fa-star fa-lg"></i>)
    }
  }
  return <>{imgs}</>
}

export default StarRating;
