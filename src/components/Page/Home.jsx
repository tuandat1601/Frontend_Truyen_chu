import React, { useEffect, useState } from 'react'

import { AiFillCloseCircle } from 'react-icons/ai';
import Header from '../UI/Header'
import axios from 'axios'
import Login from '../UI/Login'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../UI/Footer';
export default function Home() {

  const userSelected = useSelector((state) => state.context)
  const dataSearchs = userSelected?.search
  const [close, setClose] = useState(false);
  let arr = Array(dataSearchs)

  console.log(arr)


  const onClose = (e) => {
    setClose(!close)
  }
  document.title = "Trang chủ"
  // console.log('access Token:', localStorage.getItem("access_token"));
  // const [message, setMessage] = useState('');
  //    useEffect(() => {
  //       if(localStorage.getItem('access_token') === null){                   
  //           window.location.href = '/login'
  //       }
  //       else{
  //        (async () => {
  //          try {
  //            const {data} = await axios.get(   
  //                           'http://localhost:8000/home/', {
  //                            headers: {
  //                               'Content-Type': 'application/json'
  //                            }}
  //                          );
  //            setMessage(data.message);
  //         } catch (e) {
  //           console.log('not auth')
  //         }
  //        })()};
  //    }, []);
  return (
    <div className='home-page'>
      <Header />
      <div className="m-header"></div>
      <div className="form-signin mt-5 text-center">
        {/* {!close?
          <div className="modal">
          <div className="flex close">

<AiFillCloseCircle onClick={onClose}/>
          <Login/>
          </div>
        </div>:null
        } */}

      </div>
      
      <div className="container">
        <div className="text-menu">
          <h2>Truyện hot</h2>
        </div>
        <div className="row">
          <div class="col">
            <div className="story-item">
              <div className="img-story">
                <img src="https://truyenchu.vn/uploads/Images/tuc-dien-ly-the-dan-truong-ton-hoang-hau-mang-thai-ta-hai-tu..jpg" alt="" />
              </div>
              <div className="name-story">
                <Link href="">TỨC ĐIÊN LÝ THẾ DÂN, TRƯỞNG TÔN HOÀNG HẬU MANG THAI TA HÀI TỬ</Link>
              </div>
            </div>
          </div>
          <div class="col">
            <div className="story-item">
              <div className="img-story">
                <img src="https://truyenchu.vn/uploads/Images/thon-phe-tinh-khong.jpg" alt="" />
              </div>
              <div className="name-story">
                <Link href="">Thôn phệ tinh không</Link>
              </div>
            </div>
          </div>
          <div class="col">
            <div className="story-item">
              <div className="img-story">
                <img src="https://truyenchu.vn/uploads/Images/nghich-thien-chi-ton.jpg" alt="" />
              </div>
              <div className="name-story">
                <Link href="">Nghịch thiên chí tôn</Link>
              </div>
            </div>
          </div>
          <div class="col">
            <div className="story-item">
              <div className="img-story">
                <img src="https://truyenchu.vn/uploads/Images/co-chan-nhan.jpg" alt="" />
              </div>
              <div className="name-story">
                <Link href="">Cổ chân nhân</Link>
              </div>
            </div>
          </div>
          <div class="col">
            <div className="story-item">
              <div className="img-story">
                <img src="https://truyenchu.vn/uploads/Images/thien-dao-do-thu-quan.png" alt="" />
              </div>
              <div className="name-story">
                <Link href="">Thiên đạo đồ thư quán</Link>
              </div>
            </div>
          </div>

        </div>
        <hr></hr>
        <div className="row">
          <div class="col">
            <div className="story-item">
              <div className="img-story">
                <img src="https://truyenchu.vn/uploads/Images/tuyet-the-vu-than.jpeg" alt="" />
              </div>
              <div className="name-story">
                <Link href="">Tuyệt thế vũ thần</Link>
              </div>
            </div>
          </div>
          <div class="col">
            <div className="story-item">
              <div className="img-story">
                <img src="https://truyenchu.vn/uploads/Images/ngao-the-dan-than.jpg" alt="" />
              </div>
              <div className="name-story">
                <Link href="">Ngạo thế đan thần</Link>
              </div>
            </div>
          </div>
          <div class="col">
            <div className="story-item">
              <div className="img-story">
                <img src="https://truyenchu.vn/uploads/Images/ngao-the-cuu-trong-thien.jpg" alt="" />
              </div>
              <div className="name-story">
                <Link href="">Ngạo thế cửu trọng thiên</Link>
              </div>
            </div>
          </div>
          <div class="col">
            <div className="story-item">
              <div className="img-story">
                <img src="https://static.cdnno.com/poster/ba-vu-1/300.jpg?1650994786" alt="" />
              </div>
              <div className="name-story">
                <Link href="">Bá Vũ</Link>
              </div>
            </div>
          </div>
          <div class="col">
            <div className="story-item">
              <div className="img-story">
                <img src="https://static.cdnno.com/poster/truong-sinh-theo-kim-cang-tu-bat-dau/300.jpg?1625941270" alt="" />
              </div>
              <div className="name-story">
                <Link href="">Đại Càn Trường Sinh</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
      <hr></hr>
      <div className="container">
        <div className="text-menu">
          <h2>Truyện mới cập nhật</h2>
        </div>
        <div className="row">
          <div class="col">
            <div className="story-item">
              <div className="img-story">
                <img src="https://truyenchu.vn/uploads/Images/tuc-dien-ly-the-dan-truong-ton-hoang-hau-mang-thai-ta-hai-tu..jpg" alt="" />
              </div>
              <div className="name-story">
                <Link href="">TỨC ĐIÊN LÝ THẾ DÂN, TRƯỞNG TÔN HOÀNG HẬU MANG THAI TA HÀI TỬ</Link>
              </div>
            </div>
          </div>
          <div class="col">
            <div className="story-item">
              <div className="img-story">
                <img src="https://truyenchu.vn/uploads/Images/tuc-dien-ly-the-dan-truong-ton-hoang-hau-mang-thai-ta-hai-tu..jpg" alt="" />
              </div>
              <div className="name-story">
                <Link href="">TỨC ĐIÊN LÝ THẾ DÂN, TRƯỞNG TÔN HOÀNG HẬU MANG THAI TA HÀI TỬ</Link>
              </div>
            </div>
          </div>
          <div class="col">
            <div className="story-item">
              <div className="img-story">
                <img src="https://truyenchu.vn/uploads/Images/tuc-dien-ly-the-dan-truong-ton-hoang-hau-mang-thai-ta-hai-tu..jpg" alt="" />
              </div>
              <div className="name-story">
                <Link href="">TỨC ĐIÊN LÝ THẾ DÂN, TRƯỞNG TÔN HOÀNG HẬU MANG THAI TA HÀI TỬ</Link>
              </div>
            </div>
          </div>
          <div class="col">
            <div className="story-item">
              <div className="img-story">
                <img src="https://truyenchu.vn/uploads/Images/tuc-dien-ly-the-dan-truong-ton-hoang-hau-mang-thai-ta-hai-tu..jpg" alt="" />
              </div>
              <div className="name-story">
                <Link href="">TỨC ĐIÊN LÝ THẾ DÂN, TRƯỞNG TÔN HOÀNG HẬU MANG THAI TA HÀI TỬ</Link>
              </div>
            </div>
          </div>
          <div class="col">
            <div className="story-item">
              <div className="img-story">
                <img src="https://truyenchu.vn/uploads/Images/tuc-dien-ly-the-dan-truong-ton-hoang-hau-mang-thai-ta-hai-tu..jpg" alt="" />
              </div>
              <div className="name-story">
                <Link href="">TỨC ĐIÊN LÝ THẾ DÂN, TRƯỞNG TÔN HOÀNG HẬU MANG THAI TA HÀI TỬ</Link>
              </div>
            </div>
          </div>

        </div>
        <hr></hr>
        <div className="row">
          <div class="col">
            <div className="story-item">
              <div className="img-story">
                <img src="https://static.cdnno.com/poster/than-hao-hack-chung-khoan-nguoi-de-ta-thua-sao-duoc/300.jpg?1686111227" alt="" />
              </div>
              <div className="name-story">
                <Link href="">TỨC ĐIÊN LÝ THẾ DÂN, TRƯỞNG TÔN HOÀNG HẬU MANG THAI TA HÀI TỬ</Link>
              </div>
            </div>
          </div>
          <div class="col">
            <div className="story-item">
              <div className="img-story">
                <img src="https://truyenchu.vn/uploads/Images/tuc-dien-ly-the-dan-truong-ton-hoang-hau-mang-thai-ta-hai-tu..jpg" alt="" />
              </div>
              <div className="name-story">
                <Link href="">TỨC ĐIÊN LÝ THẾ DÂN, TRƯỞNG TÔN HOÀNG HẬU MANG THAI TA HÀI TỬ</Link>
              </div>
            </div>
          </div>
          <div class="col">
            <div className="story-item">
              <div className="img-story">
                <img src="https://truyenchu.vn/uploads/Images/tuc-dien-ly-the-dan-truong-ton-hoang-hau-mang-thai-ta-hai-tu..jpg" alt="" />
              </div>
              <div className="name-story">
                <Link href="">TỨC ĐIÊN LÝ THẾ DÂN, TRƯỞNG TÔN HOÀNG HẬU MANG THAI TA HÀI TỬ</Link>
              </div>
            </div>
          </div>
          <div class="col">
            <div className="story-item">
              <div className="img-story">
                <img src="https://truyenchu.vn/uploads/Images/tuc-dien-ly-the-dan-truong-ton-hoang-hau-mang-thai-ta-hai-tu..jpg" alt="" />
              </div>
              <div className="name-story">
                <Link href="">TỨC ĐIÊN LÝ THẾ DÂN, TRƯỞNG TÔN HOÀNG HẬU MANG THAI TA HÀI TỬ</Link>
              </div>
            </div>
          </div>
          <div class="col">
            <div className="story-item">
              <div className="img-story">
                <img src="https://truyenchu.vn/uploads/Images/tuc-dien-ly-the-dan-truong-ton-hoang-hau-mang-thai-ta-hai-tu..jpg" alt="" />
              </div>
              <div className="name-story">
                <Link href="">TỨC ĐIÊN LÝ THẾ DÂN, TRƯỞNG TÔN HOÀNG HẬU MANG THAI TA HÀI TỬ</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
     
      <Footer />
    </div>
  )
}
