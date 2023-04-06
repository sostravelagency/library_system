import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import detail_new from '../../api/detail_new'
import Header from '../Home/Header'
import { Image } from 'antd'
import moment from "moment"

const DetailNew = () => {
  const [data, setData]= useState()
  const {new_id }= useParams()
  useEffect(()=> {
    (async ()=> {
        const result= await detail_new(new_id)
        return setData(result)
    })()
  }, [new_id])
  return (
    <>
        <Header />
        <div style={{width: "100%", padding: 20}}>
            <div style={{margin: "12px 0", fontWeight: 600, fontSize: 24}}>
                {data?.title}
            </div>
            <Image src={data?.image} style={{width: 40, height: 40, borderRadius: 10}} />
            <div></div>
            <br />
            <div></div>
            <div>Đã tạo lúc: {moment(data?.time_created).format("DD-MM-YYYY HH:mm:ss")}</div>
            <br />
            <div style={{overflow: "hidden", textOverflow: "ellipsis"}} dangerouslySetInnerHTML={{__html: data?.content}}></div>
        </div>
    </>
  )
}

export default DetailNew