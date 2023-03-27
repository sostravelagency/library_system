import React from "react"
import 'boxicons'
import './About.css'
import Header from "../Home/Header"
import Footer from "../Footer/Footer"


const About = () => {
    const message ='Chủ tịch FPT Software Hoàng Nam Tiến xuất hiện tại sân vận động của Khu Liên hợp thể thao quốc gia từ sớm và hào hứng tham gia các hoạt động trong Hội thao. Anh còn góp mặt trong màn diễu hành của FPT Software và tham gia trò vật tay ở hạng cân 90 kg với một học sinh lớp 10 trường THPT FPT.'
    return (
        <div className="main-page" style={{width: "100%"}}>
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
                                <p>Ông Hoàng Nam Tiến sinh năm 1969, tốt nghiệp ngành Công nghệ Thông tin Đại học Bách khoa Hà Nội. Gia nhập FPT từ năm 1993, đến năm 2011, ông Tiến giữ vị trí Chủ tịch của FPT Software. Trong 8 năm, FPT Software đạt tốc độ tăng trưởng trung bình trên 30%, trở thành một trong 500 công ty phần mềm lớn nhất trên thế giới.</p>

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