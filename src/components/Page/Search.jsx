import React, { useEffect, useState } from 'react'
import Header from '../UI/Header'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
export default function Search() {
	
	const { typeId } = useParams();
	
	const [types,setTypes] = useState([]);
	const userSelected = useSelector((state) => state.context)
	const dataSearchs = userSelected?.search
	console.log(dataSearchs)
	useEffect(()=>{
		if(typeId){
			console.log(typeId)
			fetchStoriesByGenre(typeId)
		}
		// handleSearch()
	},[typeId])
	const fetchStoriesByGenre = async ( genreId) => {
		
		try {
			const response = await axios.get(`/api/search/typestory/?genre_id=${genreId}`);
			console.log(response.data)
			setTypes(response.data)
			// Hiển thị danh sách truyện
			
		} catch (error) {
			console.error(error);
		}
	};
	document.title="Tìm kiếm"
  return (
    <div className='home-page'>
	<Header/>
	<div className="m-header"></div>
	{typeId?(<>
		<div className="container">
      
              {types.map(el=>(
                <div key={el['id']} className="row">
              <div className="col bg-success p-2 text-dark bg-opacity-10">
                <div className="story-item  story-search">
                <div className="flex">

                <div className="img-story img-search">
                  <img className='rounded' src={el['image_url']} alt={el['image_url']} />
                </div>
                <div className="group-text media-body">

                <div className="name-story">
                 
                  <Link className='modal-title' to={`/stories/${el['id']}`}>{el['title']}</Link>
                </div>
                <p className='author-text modal-title' >{el['author_username']}</p>
                <p className='desc-text' >{el['desc']}</p>
                </div>
                </div>
              </div>
              </div>
          </div>
              ))}




        </div>
	</>):<>
	{dataSearchs? (
        <div className="container">
              {dataSearchs.map(el=>(
                <div key={el['id']} className="row">
              <div className="col">
                <div className="story-item story-search">
                <div className="flex">

                <div className="img-story img-search">
                  <img src={el['image_url']} alt={el['image_url']} />
                </div>
                <div className="group-text">

                <div className="name-story">
                 
                  <Link to={`/stories/${el['id']}`}>{el['title']}</Link>
                </div>
                <p className='author-text' >{el['author_username']}</p>
                <p className='desc-text' >{el['desc']}</p>
                </div>
                </div>
              </div>
              </div>
          </div>
              ))}




        </div>
      ):<h4>Không tìm thấy truyện</h4>}
    </>}
    </div>
  )
}
