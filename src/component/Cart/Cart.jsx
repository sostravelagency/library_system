import React, { useEffect, useState } from 'react'
import {IoIosArrowBack } from "react-icons/io"
import { useNavigate } from 'react-router-dom'
import {AiFillDelete } from "react-icons/ai"
import get_cart from '../../api/get_cart'
// eslint-disable-next-line
// import add_cart from '../../api/add_cart'
import delete_cart from '../../api/delete_cart'
import PendingIcon from '@mui/icons-material/Pending';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import checkout from '../../api/checkout'
import swal from 'sweetalert'
import { Button } from 'antd'

const Cart = () => {
  const navigate= useNavigate()
  const [data, setData]= useState([])
  const [chooseBook, setChooseBook]= useState()
  useEffect(()=> {
    (async ()=> {
      const result= await get_cart()
      return setData(()=> result)
    })()
  }, [])

  return (
    <div style={{width: "100%", padding: 10}}>
      <div onClick={()=> navigate(-1)} style={{display: "flex", alignItems: 'center', gap: 10, cursor: "pointer", paddingBottom: 10, borderBottom: "1px solid #e7e7e7", width: "100%"}}>
        <IoIosArrowBack size={24} />
        <div style={{fontSize: 18, fontWeight: 600}}>Cart</div>
      </div>
      <div style={{margin: "12px 0"}}>
        <div style={{fontSize: 20}}>Cart</div>
        <div style={{margin: "8px 0"}}>You have {data?.length} item in your cart</div>
      </div>
      <div style={{width: "100%", margin: "24px 0"}}>
        {/*  */}
        {
          data?.map((item, key)=> <ComponentCart chooseBook={chooseBook} setChooseBook={setChooseBook} index={parseInt(key) + 1} key={key} {...item} data={data} setData={setData} />)
        }
        <div style={{width: "100%", direction: "rtl", margin: "12px 0"}}>
          <div onClick={()=> {
            if(chooseBook) {
              checkout(chooseBook)
              swal("Notice", "Your request is sent successfully", "success")
              .then(()=> setData(data?.filter(item=> item.book_id !== chooseBook)))
            }
            else {
              swal("Notice", "You need to choose a book")
            }
          }} style={{width: 300, height: 50, borderRadius: 10, background: "#4DE1C1", color: "#fff", cursor: "pointer"}} className={"c-flex-center"}>
            Check out
          </div>
        </div>
      </div>
    </div>
  )
}

export const ComponentCart= (props)=> {
  // eslint-disable-next-line
  const [amount, setAmount]= useState(props.amount)
  const navigate= useNavigate()

  return (
    <div onClick={()=> {
      props?.setChooseBook(props?.book_id)
      
    }}
    // eslint-disable-next-line
     style={{marginBottom: 12, width: "100%", padding: 10, borderRadius: 10, border: (props?.book_id) == (props?.chooseBook) ? "1px solid #2e89ff" : "1px solid #e7e7e7", display: "flex", justifyContent: "space-between", alignItems: 'center', cursor: "pointer"}}>
      <div style={{display: "flex", gap: 16}}>
        <div style={{width: "150px"}} onClick={()=> navigate("/book/"+ props?.book_id)} >
          <img style={{width: "100%", aspectRatio: 2 / 3, borderRadius: 10}} src={props?.cover_photo} alt="" />
        </div>
        <div style={{}}>
          <div style={{fontSize: 18, fontWeight: 600, marginBottom: 12}}>{props?.book_name}</div>
          <div>{props?.author_name}</div>
          {
            props?.is_history=== true && <div>Trạng thái:&nbsp;
              {
                (parseInt(props?.state )=== 1 && parseInt(props?.is_borrow)=== 1) && <div style={{display: "flex", alignItmems: "center", gap: 10}}><strong>Đã duyệt </strong> <CheckIcon style={{color: "#2dc275"}} /></div>
              }
              {
                (parseInt(props?.state )=== 1 && parseInt(props?.is_borrow)=== 0) && <div style={{}}><div style={{fontWeight: 600, marginBottom: 8}}>Xác nhận mượn (hiệu lực trong vòng 3 phút kể từ lúc thông báo) </div> <div>
                  <Button type={"primary"}>Confirm</Button>
                </div></div>
              }
              {
                parseInt(props?.state )=== 0 && <div style={{display: "flex", alignItmems: "center", gap: 10}}> <strong>Đang chờ duyệt</strong> <PendingIcon /> </div>
              }
              {
                parseInt(props?.state )=== 2 && <div style={{display: "flex", alignItmems: "center", gap: 10}}><strong>Bị từ chối </strong><CloseIcon style={{color: "red"}} /> </div>
              }
            </div>
          }
        </div>
      </div>
      <div style={{display: "flex", justifyContent: "center", alignItems: 'center '}}>
        <div style={{padding: 10, fontWeight: 600}}>{amount}</div>
      </div>
      <div onClick={async ()=> {
        // eslint-disable-next-line
        const result= await delete_cart(props?.book_id)
        props?.setData(props?.data?.filter(item=> item?.book_id !== props?.book_id))
      }} title={"Delete"} className={"c-flex-center"} style={{cursor: "pointer"}}>
        <AiFillDelete size={24} />
      </div>
    </div>
  )
}



export default Cart