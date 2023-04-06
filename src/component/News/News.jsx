import React, { useEffect, useState } from 'react'
import get_list_blog from '../../api/admin/get_list_blog'
import ErrorFallback from '../Error/Error'
import Header from '../Home/Header'
import Loading from '../Loading/Loading'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Image } from 'antd'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const News = () => {
  const [data, setData]= useState([])
  const [loading, setLoading]= useState(true)
  const [error, setError]= useState()
  const navigate= useNavigate()

  useEffect(()=> {
    (async ()=> {
      try {
        const result= await get_list_blog()
        return setData(result)
      } catch (error) {
        setError(error)
      }
      finally {
        setLoading(false)
      }
    })()
  }, [])
  if(loading=== true) {
    return <Loading />
  }
  if(error) {
    return <ErrorFallback error={error} />
  }
  return (
    <>
      <Header />
      <div style={{padding: 20, width: "100%", position: "relative"}}>
        {
          data?.map((item, key)=> <List key={key}>
            <ListItem onClick={()=> navigate("/news/"+ item?.id)}>
              <ListItemButton>
                <Image style={{width: 200, aspectRatio: 3 / 2, background: "#e7e7e7", borderRadius: 10}} src={item?.image} alt={""}  />
                <ListItemText style={{marginLeft: 10}}>
                  {item?.title?.length > 0 ? item?.title : "Không có tiêu đề"}
                </ListItemText>
                <ListItemText>
                  <div style={{overflow: "hidden", textOverflow: "ellipsis"}} dangerouslySetInnerHTML={{__html: item?.content}}></div>
                </ListItemText>
                <ListItemText>
                  Đã tạo: {moment(item?.time_created).format("DD/MM/YYYY HH:mm:ss")}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>)
        }
      </div>
    </>
  )
}

export default News