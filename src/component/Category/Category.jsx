import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import get_list_book_by_category from '../../api/category/get_list_book_by_category'
import ComponentBook from '../ComponentBook/ComponentBook'
import Header from '../Home/Header'

const Category = () => {
  const {category_id }= useParams()
  const [data, setData]= useState([])
  useEffect(()=> {
    (async ()=> {
        const result= await get_list_book_by_category(category_id)
        return setData(result)
    })()
  }, [category_id])

  return (
    <>
        <Header searchOn={false} />
        <Box sx={{width: "100%"}}>
            <Grid container padding={2.5} spacing={2}>
                {
                    data?.map((item, key)=> <Grid xs={3} item key={key}>
                        <ComponentBook width={"100%"} {...item} />
                    </Grid>)
                }
            </Grid>
        </Box>
    </>
  )
}

export default Category