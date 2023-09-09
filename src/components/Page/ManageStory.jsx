import React, { useEffect, useState } from 'react'
import Header from '../UI/Header'
import axios from 'axios';
import { AiOutlineCaretDown } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import eventBus from '../feature/eventBus';
export default function ManageStory() {
  const [liststory, setListStory] = useState([])
  const [userid,setUserId] = useState('')
  useEffect(() => {
    if (localStorage.getItem('access_token') === null || !isNaN(localStorage.getItem("username"))) {
      window.location.href = '/login'
    }
    setUserId(localStorage.getItem("userid"))
    fetchStories(localStorage.getItem("userid"))
   
  }, [])
  const fetchStories = (userid) => {
    console.log(userid)
    // Gọi API để lấy danh sách truyện và cập nhật state
    axios.get(`/api/users/${userid}/stories/`)
    .then(response => {
      // Xử lý dữ liệu trả về từ API
     
      console.log(response.data);
      setListStory(response.data.reverse())
    })
    .catch(error => {
      // Xử lý lỗi nếu có
      console.error(error);
    });
  };
  const deleteStoryAndChapters = async(e,storyId,userId) => {
    e.preventDefault()
    await axios.delete(`/api/stories/${storyId}/delete`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message); // In thông báo thành công từ backend
        // Cập nhật lại danh sách truyện trên frontend nếu cần
        eventBus.publish('storyDeleted'); 
      })
      .catch(error => {
        console.error('Error:', error);
        // Xử lý lỗi nếu có
      });
      fetchStories(userId)
  };

  document.title = "Quản lý truyện"
  return (
    <div className='manage-story'>
      <Header />
      <div className="top"></div>
      <div className="container">
        <div className="header-manage">
          <div className='flex'>
            <h2><strong>Truyện của tôi</strong></h2>
            <Link to='/edit' className='btn btn-orange'>Thêm truyện mới</Link>
          </div>
        </div>
        <div className="panel">
          <div className="work-style"><button><strong>Tất cả truyện</strong></button></div>
          <section className='row story-list'>
            <div className="works-list col-xs-12">
              {liststory ? (<>
                {liststory.map(el => (

                  <div className="work-item">
                    <div className="row-container">
                      <div className="left-container">
                        <div className="story-image">
                          <img src={el.image_url} alt="" />
                        </div>
                        <div className="group-text">
                          <Link className="name-text" to={`/stories/${el.id}`}>{el.title}</Link>
                          <p className="name-text">Thể loại:{el.type}</p>
                          <p className="count-text">{el.chapters.length} Chương</p>


                        </div>
                      </div>
                      <div className="actions-wrapper">
                        <div className="dropdown">
                          <button class="btn btn-orange dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Tất cả chương
                          </button>
                          <div class="dropdown-menu list-story">
                            <div class="story-parts-wrapper">
                              {
                                el.chapters.map((ol, index) => (

                                  <Link to={`/write/${ol.id}`} state={{titlestory:el.title, idchap:ol.id,namechap:ol.title,contentchap:ol.content }}  class="story-part" data-part="1346204163">
                                    <div class="part-title">Chương {index + 1}</div>
                                    
                                    <div class="part-meta">
                                      <span class="publish-state ">
                                        {ol.title}
                                      </span>

                                    </div>
                                  </Link>
                                ))
                              }

                            </div>
                            <li class="newpart-wrapper"><Link to='/writing' state={{ namestory: el.title, idStory: el.id }} class="btn btn-orange on-newpart"><span class="fa fa-plus fa-wp-neutral-5 " aria-hidden="true"></span> Thêm chương</Link></li>
                          </div>
                        </div>
                        {/* state={{ results: results }} */}

                        <Link onClick={(e)=>deleteStoryAndChapters(e,el.id,userid)} className='delete-story' to="/">Xóa</Link>

                      </div>
                    </div>
                  </div>
                ))}

              </>) : null}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
