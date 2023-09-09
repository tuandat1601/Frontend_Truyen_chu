import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

import { Link, useLocation } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export default function WriteStory() {
  const [csrftoken, setCsrftoken] = useState('')
  useEffect(() => {
    if (localStorage.getItem('access_token') === null || !isNaN(localStorage.getItem("username"))) {
      window.location.href = '/login'
    }
    if (idchap && namechap) {

      axios.get(`/api/chapters/${idchap}`)
        .then(response => {
          // Xử lý dữ liệu trả về từ API
          const data = response.data;
          console.log(data);
          setContent(data['content'])
          setNameChap(data['name'])

        })
        .catch(error => {
          // Xử lý lỗi nếu có
          console.error(error);
        });
    }
    setCsrftoken(getCookie('csrftoken'));
    document.title = "Viết Truyện"
  }, [0])

  // const [selectedImage, setSelectedImage] = useState(null);
  // const [users, setUsers] = useState([])
  // const fileInputRef = useRef(null);
  const location = useLocation()
  const { namestory, idStory } = location.state ? location.state : ""
  const { titlestory, idchap, namechap, contentchap } = location.state ? location.state : ""
  
  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedImage(URL.createObjectURL(file));
  // };

  // const [value, setValue] = useState('');
  const [nameChap, setNameChap] = useState('Tên tập truyện');
  const handleNameChap = (e) => {
    setNameChap(e.target.value)
  }

  const [content, setContent] = useState('');

  const handleChange = (event) => {
    setContent(event.target.value);
  };
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const handleFocus = () => {
    setShowPlaceholder(false);
  };
  const handleBlur = () => {
    if (content === '') {
      setContent('Write here');
    }
  };

  const renderContent = () => {
    if (!content) {
      return <p>Write here</p>;
    }

    const paragraphs = content.split('\n');
    return paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>);
  };
  const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  }


  const handleSubmit = (event) => {

    event.preventDefault();
    if (idchap) {
      const chapterDataUpdate = {
        name: nameChap,
        content: content,

      }
      console.log(chapterDataUpdate)
      console.log(idchap)
      
      axios.put(`/api/chapters/${idchap}/update`, chapterDataUpdate
      )
        .then(response => {
          console.log(response.data.message);
          // Xử lý các tác vụ sau khi cập nhật thành công
        })
        .catch(error => {
          console.error(error);
          // Xử lý lỗi nếu có
        });
    }
    else {


      const chapterData = {

        name: nameChap,
        content: content,
        isPublish: false,
        story_id: idStory,
        note: ""
      };
      console.log(chapterData)
      axios
        .post('http://localhost:8000/api/chapters/', chapterData)
        .then((response) => {
          // Xử lý response thành công

          console.log('Chương truyện đã được tạo:', response.data);
        })
        .catch((error) => {
          // Xử lý lỗi
          console.error('Lỗi khi tạo chương truyện:', error);
        });
    }
    setTimeout(()=>{

      window.location.href = '/manage'
    },2500)
  };
  return (
    <div className='writting-page'>
      <div className="edit-header">
        <div className="work-header">
          <div className="flex">
            <Link to="/edit" className='back'>
              <BiArrowBack className='m-5px' />
            </Link>
            <div className="group-title">


              <h4>{namestory ? namestory : !namestory ? titlestory : "Truyện chữ"}</h4>
              {/* <h4>{idStory}</h4> */}
            </div>
          </div>
          <div className="group-button">
            {/* <Link to="/writing" className="btn btn-orange m-5px">Công khai</Link> */}
            <button onClick={handleSubmit} className="btn btn-grey m-5px">Lưu</button>

          </div>
        </div>
      </div>
      <div className="m-header"></div>
      <div className="container">
        <div className="name-chap">
          <input name='namechap' autocomplete="off" value={nameChap} type="text" className='name-chap' onChange={handleNameChap} />
        </div>
        {/* <div className="story-editor" contentEditable="true"
        role="textbox"
        onFocus={handleFocus}
        onInput={handleChange}
        onBlur={handleBlur}
        data-placeholder='write here'
        >
        <p></p>
        
      {renderContent()}
      </div> */}
        <ReactQuill className='qil' theme="snow" value={content} onChange={setContent} />
      </div>

      <div className="container"></div>

    </div>
  )
}
