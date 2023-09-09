import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../UI/Header';
import Footer from '../UI/Footer';

const ChapterPage = () => {
	const { storyId } = useParams();

	const { chapterId } = useParams();
	const [chapter, setChapter] = useState(null);
	const [chapters, setChapters] = useState(null);

	const [nextChapterId, setNextChapterId] = useState(null);
	const [prevChapterId, setPrevChapterId] = useState(null);

	useEffect( () => {
		 fetchChapter();
		
		//  nextpre();
	}, [chapterId]);

	const fetchChapter = async () => {
		try {
			const response = await axios.get(`/api/chapters/${chapterId}`);
			setChapter(response.data);
			axios.get(`/api/stories/${storyId}/chapters/`)
				.then(response => {
					setChapters(response.data);
					const nextChapterIndex =  response.data.findIndex(chapter => chapter.id == chapterId);
			const prevChapterIndex = nextChapterIndex - 1;
		if (prevChapterIndex >= 0) {
			setPrevChapterId(response.data[prevChapterIndex].id);
		}
		else {
			setPrevChapterId(null);
		}
		if (nextChapterIndex + 1 < response.data.length) {
			setNextChapterId(response.data[nextChapterIndex+1].id)
		}
		else {
			setNextChapterId(null)
		}
				})
				.catch(error => {
					console.error(error);
				});
		} catch (error) {
			console.error(error);
		}
	};
	

	// console.log(chapters.findIndex(chapter => chapter.id === chapterId))
	if (!chapter) {
		return <div>Loading...</div>;
	}
	const handleNextClick = () => {
		if (chapter && nextChapterId) {
			// Chuyển hướng đến trang chương truyện tiếp theo
			console.log(nextChapterId)
			window.location.href = `/stories/${storyId}/chapters/${nextChapterId}`;
		}
	};
	const handlePreviousClick = () => {
		if (chapter && prevChapterId) {
			// Chuyển hướng đến trang chương truyện trước đó
			window.location.href = `/stories/${storyId}/chapters/${prevChapterId}`;
		}
	};
	document.title = chapter.name
	return (
		<div className='reading-page'>
			<Header/>
			<div className="m-header"></div>
			<div className="container">
				<div className="chapter-name">

			<h2>{chapter.name}</h2>
				</div>
			<div className="group-button nex-pre">

			<button className='btn' disabled={!prevChapterId} onClick={handlePreviousClick}>Chương trước</button>
			<button  className='btn' disabled={!nextChapterId} onClick={handleNextClick}>Chương sau</button>
			</div >
				<div className="read-container">

			<div dangerouslySetInnerHTML={{ __html: chapter.content }}></div>
				</div>
			</div>
			<Footer/>
		</div>
	);
};

export default ChapterPage;
