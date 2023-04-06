import React from "react";
import "./WidgetTop.css"
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import BookIcon from '@mui/icons-material/Book';
import get_dashboard from "../../../../api/manage/get_dashboard";
import { useEffect, useState } from "react";

const WidgetTop = ({type}) => {

    const amount = 100;
    const diff = 20;

    let wg;

    const [data, setData]= useState({})

    useEffect(()=> {
        (async ()=> {
          const result= await get_dashboard()
          return setData(result)
        })()
      }, [])

    switch(type){
        case "user":
            wg={
                title:"USERS",
                number: data?.numUser?.toString() ?? 0,
                link:"See all user",
                icon: <box-icon type='solid' name='user-circle'></box-icon>,
            };
            break;
        case "book":
            wg={
                title:"BOOKS",
                number: data?.numBook?.toString(),
                link:"See all book",
                icon: <box-icon type='solid' name='book'></box-icon>,
            };
            break;
        case "order":
            wg={
                title:"ORDERS",
                number: data?.numOrder?.toString(),
                link:"See all order",
                icon: <box-icon name='cart' type='solid' ></box-icon>,
            };
            break;
        case "news":
            wg={
                title:"NEWS",
                number: data?.numNews?.toString(),
                link:"See all news",
                icon: <box-icon name='news' ></box-icon>,
            };
            break;
            default:
            break;
    }

    return(
        <div className="WidgetTop">
            <div className="left"> 
                <span className="title">{wg.title}</span>
                <span className="counter">{wg.number}</span>
                <span className="link">{wg.link}</span>
            </div>
            <div className="right"> 
                <div className="percentage positive">
                    {diff} % <ArrowDropUpIcon/>
                </div>    
            <div className="icon">{wg.icon}</div>
            </div>
        </div>
    )
}

export default WidgetTop
