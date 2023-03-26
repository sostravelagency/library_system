import React from 'react'
import { useNavigate } from 'react-router-dom'

const ComponentBook = (item) => {
  const navigate= useNavigate()
  
  return (
    <div style={{padding: 10, width: item.width}}>
      <div onClick={()=> navigate("/book/"+ item.book_id)} style={{cursor: "pointer"}}>
          <img style={{width: "100%", aspectRatio: 2 / 3}} src={item?.cover_photo} alt="" />
          <div className={"b-1-1"} style={{margin: "12px 0", fontWeight: 600, fontSize: 18, maxWidth: "100%"}}>
              {item?.book_name}
          </div>
          <div style={{margin: "4px 0"}}>{item?.author_name}</div>
          <div style={{margin: "4px 0", fontSize: 14}}>Quantity: {item?.book_quantity}</div>
          {/* <div style={{display: "flex", alignItems: 'center'}}>
              <AiFillStar size={18} />
              <AiFillStar size={18} />
              <AiFillStar size={18} />
              <AiFillStar size={18} />
          </div> */}
      </div>
    </div>
  )
}

export default ComponentBook