import { Box, Divider, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import get_list_book_by_category from '../../api/category/get_list_book_by_category'
import ComponentBook from '../ComponentBook/ComponentBook'
import Header from '../Home/Header'
import Footer from '../Footer/Footer'
import Breadcrumb from '../BreadCrumb/BreadCrumb'
import get_detail_category from '../../api/get_detail_category'

const Category = () => {
  const {category_id }= useParams()
  const [data, setData]= useState([])
  const [dataCategory, setDataCategory]= useState()
  useEffect(()=> {
    (async ()=> {
        const result= await get_list_book_by_category(category_id)
        return setData(result)
    })()
    
  }, [category_id])
  useEffect(()=> {
    (async ()=> {
      const result= await get_detail_category(category_id)
      return setDataCategory(result?.[0])
  })()
  }, [category_id])

  return (
    <div style={{ fontFamily: 'Open Sans' }}>
        <Header searchOn={false} />
        <Box sx={{width: "100%", padding: 1.25, marginLeft: 20,}}>         
            <div style={{margin: "12px 0", fontWeight: 600, fontSize: 20}}>{dataCategory?.category_name}</div>
            <div style={{margin: "8px 0", fontSize: 16, maxWidth:"50%"}}>{dataCategory?.category_description?.split("\n")?.map((item, key)=> <div style={{margin: "8px 0"}} key={key}>{item}</div>)}</div>
            <div style={{margin: "12px 0", fontWeight: 600, fontSize: 20, textTransform: "uppercase"}}>Most read with tags "{dataCategory?.category_name}"</div>
            <Divider />
            <Grid container padding={2.5} spacing={2}>
                {
                    data?.map((item, key)=> <Grid xs={2} item key={key}>
                        <ComponentBook {...item} />
                    </Grid>)
                }
            </Grid>
        </Box>
        <Footer/>
    </div>
  )
}

export default Category