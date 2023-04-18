import React from "react"
import 'boxicons'
import './About.css'
import Header from "../Home/Header"
import Footer from "../Footer/Footer"


const About = () => {
    const message ='The development of e-library system websites has been made possible by advancements in technology as well as the widespread use of the internet and the fact that it is appearing more and more in schools in Vietnam is inevitable. So in this project our team would like to introduce a library management system website for schools. This system is a digital platform that allows users to access the resources and services of a library from a computer or mobile device. It is an important tool for modern libraries, as it enables them to reach a wider audience and provide convenient access to their materials and services.'
    return (
        <div className="main-page" style={{width: "100%",fontFamily: "Open Sans"}}>
        <Header/>
        <section className="section-white">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h2 className="section-title">
                            The Team Behind FPT Library
                        </h2>
                        <p className="section-subtitle">{message}</p>
                    </div>
                    <div className="container-big">
                    <div className="container">
                        <div className="team-item">
                            <img src="https://res.cloudinary.com/dsqzrmptp/image/upload/c_scale,w_216/v1679914236/3135715_ibfyqj.png" className="team-image" alt="pic"></img>
                            <h3>ĐỖ LÊ HUY</h3>
                            <div className="team-info"><p>Team Leader</p></div>
                                <p>A Team Leader oversees a group of employees and motivates them to do their job efficiently. They provide daily objectives, develop reward systems for productivity that motivate new hires and seasoned workers alike and communicate any issues with upper management to reach business goals effectively.</p>

                                <ul className="team-icon">
                                    <li><a href="">
                                    <box-icon name='facebook-circle' type='logo' size='md'></box-icon>
                                    </a></li>
                                    <li><a href="">
                                    <box-icon type='logo' name='twitter'size='md'></box-icon>
                                    </a></li>
                                    <li><a href="">
                                    <box-icon name='instagram-alt' type='logo'size='md'></box-icon>
                                    </a></li>
                                    <li><a href="">
                                    <box-icon name='linkedin-square' type='logo'size='md'></box-icon>
                                    </a></li>
                                </ul>
                            
                        </div>
                    </div>

                    <div className="container">
                        <div className="team-item">
                            <img src="https://res.cloudinary.com/dsqzrmptp/image/upload/c_scale,w_216/v1679914236/3135715_ibfyqj.png" className="team-image" alt="pic"></img>
                            <h3>TRẦN ĐÀM DUY ĐẠT</h3>
                            <div className="team-info"><p>Team Member</p></div>
                                <p>A team member is an employee who works in a group or team, like those who work in restaurants, retail, and hospitality. Team members may work in guest services, with food, or with customers. In this position, you may greet customers, clean up after them, or perform other duties related to customer service.</p>

                                <ul className="team-icon">
                                    <li><a href="">
                                    <box-icon name='facebook-circle' type='logo'size='md'></box-icon>
                                    </a></li>
                                    <li><a href="">
                                    <box-icon type='logo' name='twitter'size='md'></box-icon>
                                    </a></li>
                                    <li><a href="">
                                    <box-icon name='instagram-alt' type='logo'size='md'></box-icon>
                                    </a></li>
                                    <li><a href="">
                                    <box-icon name='linkedin-square' type='logo'size='md'></box-icon>
                                    </a></li>
                                </ul>
                            
                        </div>
                    </div>

                    <div className="container">
                        <div className="team-item">
                            <img src="https://res.cloudinary.com/dsqzrmptp/image/upload/c_scale,w_216/v1679914236/3135715_ibfyqj.png" className="team-image" alt="pic"></img>
                            <h3>ĐẶNG NGỌC PHƯƠNG</h3>
                            <div className="team-info"><p>Team Member</p></div>
                                <p>A team member is an employee who works in a group or team, like those who work in restaurants, retail, and hospitality. Team members may work in guest services, with food, or with customers. In this position, you may greet customers, clean up after them, or perform other duties related to customer service.</p>

                                <ul className="team-icon">
                                    <li><a href="">
                                    <box-icon name='facebook-circle' type='logo'size='md'></box-icon>
                                    </a></li>
                                    <li><a href="">
                                    <box-icon type='logo' name='twitter'size='md'></box-icon>
                                    </a></li>
                                    <li><a href="">
                                    <box-icon name='instagram-alt' type='logo'size='md'></box-icon>
                                    </a></li>
                                    <li><a href="">
                                    <box-icon name='linkedin-square' type='logo'size='md'></box-icon>
                                    </a></li>
                                </ul>
                            
                        </div>
                    </div>

                    <div className="container">
                        <div className="team-item">
                            <img src="https://res.cloudinary.com/dsqzrmptp/image/upload/c_scale,w_216/v1679914236/3135715_ibfyqj.png" className="team-image" alt="pic"></img>
                            <h3>HÀ NGỌC LỘC</h3>
                            <div className="team-info"><p>Team Member</p></div>
                                <p>A team member is an employee who works in a group or team, like those who work in restaurants, retail, and hospitality. Team members may work in guest services, with food, or with customers. In this position, you may greet customers, clean up after them, or perform other duties related to customer service.</p>

                                <ul className="team-icon">
                                    <li><a href="">
                                    <box-icon name='facebook-circle' type='logo'size='md'></box-icon>
                                    </a></li>
                                    <li><a href="">
                                    <box-icon type='logo' name='twitter'size='md'></box-icon>
                                    </a></li>
                                    <li><a href="">
                                    <box-icon name='instagram-alt' type='logo'size='md'></box-icon>
                                    </a></li>
                                    <li><a href="">
                                    <box-icon name='linkedin-square' type='logo'size='md'></box-icon>
                                    </a></li>
                                </ul>
                            
                        </div>
                    </div>
                    </div>
                </div>
            </div>

        </section>
        <Footer/>
        </div>
    )
}

export default About;