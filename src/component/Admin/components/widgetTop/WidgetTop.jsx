import React from "react";
import "./WidgetTop.css"
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import BookIcon from '@mui/icons-material/Book';

const WidgetTop = ({type}) => {
    let data;

    //temporary
    const amount = 100;
    const diff = 20;

    switch(type){
        case "user":
            data={
                title:"USERS",
                isMoney:false,
                link:"See all user",
                icon: <box-icon type='solid' name='user-circle'></box-icon>,
            };
            break;
        case "book":
            data={
                title:"BOOKS",
                isMoney:false,
                link:"See all book",
                icon: <box-icon type='solid' name='book'></box-icon>,
            };
            break;
        case "order":
            data={
                title:"ORDERS",
                isMoney:false,
                link:"See all order",
                icon: <box-icon name='cart' type='solid' ></box-icon>,
            };
            break;
        case "news":
            data={
                title:"NEWS",
                isMoney:false,
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
                <span className="title">{data.title}</span>
                <span className="counter">{data.isMoney && "$"} {amount}</span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right"> 
                <div className="percentage positive">
                    {diff} % <ArrowDropUpIcon/>
                </div>    
            <div className="icon">{data.icon}</div>
            </div>
        </div>
    )
}

export default WidgetTop
