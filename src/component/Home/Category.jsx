import React, {useState , useEffect} from 'react'
import get_category from '../../api/get_category'
import { useNavigate } from 'react-router-dom'

const Category = () => {
  const [data, setData]= useState([])
  useEffect(()=> {
    (async ()=> {
        const result= await get_category()
        return setData(result)
    })()
  }, [])
  const navigate= useNavigate()

  return (
    <div style={{width: "100%", backgroundImage: "url(https://res.cloudinary.com/cockbook/image/upload/v1676981245/single/image_2_vybzcj.png)", filter: "grayscale(100%)"}}>
        <div style={{margin: "12px 0", fontSize: 20, fontWeight: 600, textAlign: "center"}}>What interest you ?</div>
        <div className="c-flex-center" style={{width: "100%", padding: 10, gap: 50}}>
            <div>
                <div style={{textAlign: 'center', margin: "12px 0"}}>Fiction books</div>
                <div style={{width: 300, flexWrap: "wrap", gap: 20}} className={"c-flex-center"}>
                    {
                        data?.slice(0, 4)?.map((item, key)=> <div onClick={()=> navigate("/category/"+ item?.id)} key={key} style={{padding: "10px 30px", borderRadius: 80, border: "1px solid #000", width: 130}}>{item?.category_name}</div>)
                    }
                </div>
            </div>
            <div>
                <div style={{textAlign: 'center', margin: "12px 0"}}>Non fiction books</div>
                <div style={{width: 300, flexWrap: "wrap", gap: 20}} className={"c-flex-center"}>
                    {
                        data?.slice(4, 8)?.map((item, key)=> <div onClick={()=> navigate("/category/"+ item?.id)} key={key} style={{padding: "10px 30px", borderRadius: 80, border: "1px solid #000", width: 130}}>{item?.category_name}</div>)
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Category