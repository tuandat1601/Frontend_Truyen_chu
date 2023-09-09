import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../UI/Header';


const StoryPage = () => {
	const { storyId } = useParams();
	const [story, setStory] = useState(null);
	const [chapters, setChapters] = useState([]);
	
	console.log(storyId)
	useEffect(() => {
		fetchChapters();
		fetchStory();
		
	}, [0]);
	

	const fetchStory = async () => {
		try {
			const response = await axios.get(`/api/story/${storyId}/`);
			setStory(response.data);
			console.log(response.data)
		} catch (error) {
			console.error(error);
		}
	};
	const fetchChapters = async () => {
		try {
			
			await axios.get(`/api/stories/${storyId}/chapters/`)
				.then(response => {
					setChapters(response.data);
				console.log(response.data)
				})
				.catch(error => {
					console.error(error);
				});
		} catch (error) {
			console.error(error);
		}
	}
	

	if (!story) {
		return <div>Loading...</div>;
	}

	return (
		<div className='story-page bg-body-secondary'>
			<Header/>
			<div className="m-header"></div>
			<div className="container">

			{story && (
				<div className='flex'>
					<div className="border-end img-left">

					<img className='border-end img-story-page rounded' src={story.image} alt={story.name} />
					</div>
					<div className="group-text">

					<h2 className='modal-title'>{story.name}</h2>
					<p className='d-inline-block border border-secondary px-3 py-1 text-secondary rounded-3 me-2 mb-2'>Tác giả: {story.author_name}</p>
					<p className='d-inline-block border border-danger px-3 py-1 text-danger rounded-3 me-2 mb-2'>Thể loại:{story.type_name}</p>
					<p className='d-inline-block border border-success px-3 py-1 text-success rounded-3 me-2 mb-2'>Số chương: {chapters.length}</p>
					<Link to={`/edit/${storyId}`} state={{storyname:story.name, descstory:story.description,storyimage:story.image,typestory:story.type_name, idstory :storyId  }} className='btn btn-orange'>Sửa thông tin</Link>
					<div className="card">

					<p className='card-body '>{story.description}</p>
					</div>
					</div>
				</div>
			)}

			<h3 className='modal-title'>Danh sách chương</h3>
			{chapters!==[] ?(<ul className='list-group '>
				{chapters.map((chapter,index) => (
					<li className='list-group-item' key={chapter.id}>
					  <a className='chapter-link' href={`/stories/${storyId}/chapters/${chapter.id}`}>{index+1} {chapter.name}</a>
					</li>
				      ))
			}</ul>):<span>Vẫn chưa có chương mới {chapters.lenth}</span>}
			
			</div>
		
     
		</div>
	);
};

export default StoryPage;
