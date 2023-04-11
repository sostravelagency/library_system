import React from "react";
import "./WidgetTop.css"
import { Link } from 'react-router-dom';
import get_dashboard from "../../../../api/manage/get_dashboard";
import { useEffect, useState } from "react";

const WidgetTop = ({type}) => {

    let wg;

    const [data, setData]= useState({})

    useEffect(()=> {
        (async ()=> {
            try {
                const result = await get_dashboard();
                if (result) {
                    setData(result);
                }
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])
    
    switch(type){
        case "user":
            wg={
                title:"USERS",
                number: data?.numUser?.toString() ?? "0",
                link:<Link to ="/admin/users">See all user</Link>,
                icon: <box-icon type='solid' name='user-circle'></box-icon>,
            };
            break;
        case "book":
            wg={
                title:"BOOKS",
                number: data?.numBook?.toString(),
                link:<Link to ="/admin/books">See all book</Link>,
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
                link:<Link to ="/admin/news">See all news</Link>,
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
                </div>    
            <div className="icon">{wg.icon}</div>
            </div>
        </div>
    )
}

export default WidgetTop
