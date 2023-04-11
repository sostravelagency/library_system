import React from 'react'
import 'boxicons'
import './Footer.css'

const Footer = () => {
  return (
    <div className='content_footer'>
      <div className='header_area'>
        <div className='header_area-div'>
          <p>FPT UNIVERSITY LIBRARY </p>
          <div className='desc_area'>
            <ul className='a'>
              <p><box-icon name='map' ></box-icon> Phòng 105, Toà nhà Beta, Đai học FPT, Khu đô thị FPT City, Ngũ Hành Sơn, Đà Nẵng</p>
              <p><box-icon name='envelope' ></box-icon>  thuvienfudn@fpt.fe.edu</p>
              <p><box-icon name='phone' ></box-icon>  0987 123 321</p>
              <p><box-icon name='time-five' ></box-icon>  Mở cửa: 08:00 - 17:00 Mỗi ngày </p>
            </ul>
          </div>
        </div>
        <div className='header_area-div'>
          <p>CONNECT</p>
          <div className='icon_media'>
            <a href='https://www.facebook.com/' target='_blank'><box-icon name='facebook-circle' type='logo' size='lg' ></box-icon></a>
            <a href='https://twitter.com/' target='_blank'><box-icon type='logo' name='twitter' size='lg'></box-icon></a>
            <a href='https://https://www.instagram.com/' target='_blank'><box-icon name='instagram-alt' type='logo' size='lg'></box-icon></a>
            <a href='https://www.linkedin.com/' target='_blank'><box-icon name='linkedin-square' type='logo' size='lg'></box-icon></a>
          </div>
        </div>
      </div>
      <div>
        <div className='download_icon'>
          <a href='https://play.google.com/store/apps' target='_blank'><img src='https://res.cloudinary.com/dsqzrmptp/image/upload/v1679243112/512x512_mvvo9c.png' style={{ width: "30%", height: "30%", objectFit: "contain" }} alt=''></img></a>
          <a href='https://www.apple.com/app-store/' target='_blank'><img src='https://res.cloudinary.com/dsqzrmptp/image/upload/v1679243152/512x512_ma4n78.png' style={{ width: "30%", height: "30%", objectFit: "contain" }} alt=''></img></a>
          <div className='copyright'>
            <box-icon name='copyright' ></box-icon>
            <p>{new Date().getFullYear()} FPT University Library.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer