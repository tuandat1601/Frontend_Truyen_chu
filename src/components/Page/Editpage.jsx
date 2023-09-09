import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { BsImageFill } from 'react-icons/bs'
import { Link, useLocation } from 'react-router-dom'


export default function Editpage() {
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [idStory, setIdStory] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('Không');
  const [selectedImage, setSelectedImage] = useState(null);

  const [typeStory, setTypeStory] = useState([])
  const handleImageChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    setSelectedImage(file)
    // setSelectedImage(URL.createObjectURL(file));
    // console.log(URL.createObjectURL(file))
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if(storyname){
      const formDataUpdate = new FormData();
      formDataUpdate.append('name', title);
      formDataUpdate.append('description', description);
      formDataUpdate.append('type', genre);
      const updateStory={
        name:title,
        description:description,
        type:genre
      }
      for (const value of formDataUpdate.values()) {
        console.log(value);
      }
      
      axios.put(`/api/story/${idstory}/update/`, updateStory)
        .then((response) => {
          // Xử lý response thành công
          console.log(response.data);
        })
        .catch((error) => {
          // Xử lý error
          console.error(error);
        });
    }
    else{

    
  
    const formData = new FormData();

    formData.append('name', title === '' ? "Truyện chữ" : title);
    formData.append('description', description === '' ? "Mô tả" : description);
    formData.append('isPublish', false);
    formData.append('type', genre);
    formData.append('author_id', localStorage.getItem("userid"));
    formData.append('note', "");
    formData.append('image', selectedImage);

    // console.log(title, description, genre,localStorage.getItem("userid"));
    try {
      for (const value of formData.values()) {
        console.log(value);
      }
      
      const datastory = await axios.post('/api/story/create/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      },);
      console.log(datastory['data']['id'])

      setIdStory(datastory['data']['id'])
      window.location.href = "/manage"
      // Bài đăng truyện đã được tạo thành công
      // Thực hiện các hành động cần thiết (hiển thị thông báo, chuyển hướng, vv.)
    } catch (error) {
      // Xử lý lỗi nếu có
      alert("Lỗi đăng")
    }
  }
  };
  const handleBlur = () => {
    // TODO: Xử lý logic khi trường nhập liệu mất trạng thái tập trung

  };
  const location = useLocation()
  const { storyname,descstory, storyimage, typestory,idstory } = location.state ? location.state : ""
console.log(idstory)
  useEffect(() => {
    if (localStorage.getItem('access_token') === null || !isNaN(localStorage.getItem("username"))) {
      window.location.href = '/login'
    }
    if(storyname){
      setTitle(storyname)
      setDescription(descstory)
      setGenre(typestory)
    }
    const fetchData = async () => {
      try {
        const datas = axios.get('http://localhost:8000/api/story/typestory/')

        datas.then(result => {
          // Lấy [[PromiseResult]]

          setTypeStory(result['data'])

        }).catch(error => {
          console.error(error);
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [0])
  document.title = "Tạo truyện"
  return (
    <div className='edit-page'>
      <div className="m-header"></div>
      <div className="edit-header">
        <div className="work-header">
          <div className="flex">
            {/* <Link to="/" className='back'>
              <BiArrowBack className='m-5px' />
            </Link> */}
            <div className="group-title">

              <p className="small-text">Thêm thông tin truyện</p>
              <h4>Truyện chữ</h4>
            </div>
          </div>
          <div className="group-button">
            {/* <Link to="/" className="btn btn-grey m-5px">Cancel</Link> */}
            <Link to="/writing" state={{ namestory: title, idStory: idStory }} className="btn btn-orange m-5px">Skip</Link>
          </div>
        </div>
      </div>
      <div className="m-header"></div>
      <div className="container">
        <div className="flex">

          <div className=" col col-4">
            <div className="image-placeholder" onClick={() => fileInputRef.current.click()}>
              <div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  
                  ref={fileInputRef}

                />
              </div>
              {selectedImage ? <img className='img-story' src={URL.createObjectURL(selectedImage)} alt="Selected" />
                : storyimage?<>
                <img className='image-placeholder' src={"http://localhost:8000"+storyimage} alt="" />
                </>:
                <div className="image-hover" >
                  <div>
                    <BsImageFill className='image-cover-icon' />

                    <p >Add a cover</p>
                  </div>
                </div>}
            </div>
          </div>
          <div className="col col-8 create-info">
            <form className="form" onSubmit={handleSubmit}  >

              <div className="name-form">

                <h4>Chi tiết truyện</h4>
              </div>
              <div className="form-edit">

                <div className="form-control">
                  <label htmlFor="">Tên truyện</label>
                  <input required type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} name='title' />
                </div>
                <div className="form-control">
                  <label htmlFor="">Mô tả</label>
                  <textarea required id="description" value={description} onChange={(e) => setDescription(e.target.value)} typeof='text' name="description" aria-multiline="true"></textarea>
                </div>


                <div className="form-control">
                  <label htmlFor="">Thể loại</label>
                  <select name="loai" id="loai" onChange={(e) => setGenre(e.target.value)}>
                    <option value="-1">Chọn thể loại</option>
                    {typeStory.map((value, index) => (
                      <option key={index} value={value["id"]}>{value["typename"]}</option>
                    ))}
                  </select>

                </div>
                <button className='btn btn-orange'>Gửi lên</button>
              </div>
            </form>
          </div>
        </div>
      </div>


    </div>
  )
}
