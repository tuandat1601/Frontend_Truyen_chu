import React, { useEffect, useState } from 'react'

import { FiSearch } from 'react-icons/fi'
import { FaUserCircle } from 'react-icons/fa'
import { BsFillCaretDownFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { dataSearch } from '../feature/slice';
import { useDispatch } from 'react-redux';
import Search from '../Page/Search'
export default function Header() {
	const dispatch = useDispatch()
	const userSelected = useSelector((state) => state.context)
	const [open, setOpen] = useState(false);
	const [typeStory, setTypeStory] = useState([])
	const [drop, setDrop] = useState("");
	const [isAuth, setIsAuth] = useState(false);
	const [keyword, setKeyword] = useState('');
	const [results, setResults] = useState([]);
	// const [isLogin, setLogin] = useState(false);
	// const [isLogout, setLogout] = useState(false);
	// const [isRegister, setRegister] = useState(false);
	const handleSearch = async () => {
		try {
			if (keyword.trim() !== "") {
				const response = await axios.get(`/api/search/namestory/?keyword=${keyword.trim()}`);
				setResults(response.data);
				console.log(response.data)
				dispatch(dataSearch(response.data))
			}

		} catch (error) {
			console.error(error);
		}
	};
	const checkUser = (event, parameter) => {
		event.preventDefault();
		if (!isNaN(localStorage.getItem("username"))) {
			window.location.href = '/login'
		}
		else {

			window.location.href = parameter; // Chuyển hướng đến router '/success'

		}
		// console.log(isNaN(localStorage.getItem("username") ))
	}
	const fetchStoriesByGenre = async (e, genreId) => {
		e.preventDefault()
		try {
			const response = await axios.get(`/api/search/typestory/?genre_id=${genreId}`);
			console.log(response.data)
			// Hiển thị danh sách truyện
			setResults(response.data);

			dispatch(dataSearch(response.data))
		} catch (error) {
			console.error(error);
		}
	};

	// const handleGenreSelect = async (e, selectedGenre) => {
	// 	e.preventDefault()
	// 	fetchStoriesByGenre(selectedGenre);
	// };
	const handleLogout = async () => {
		try {
			setIsAuth(false)
			const { data } = await axios.post('api/logout/', {
				refresh_token: localStorage.getItem('refresh_token')
			}, {
				headers: {
					'Content-Type': 'application/json'
				}
			}, { withCredentials: true });
			localStorage.clear();
			axios.defaults.headers.common['Authorization'] = null;
			window.location.href = '/'
		} catch (e) {
			console.log('logout not working')
		}
	}
	useEffect(() => {
		if (localStorage.getItem('access_token') !== null) {
			setIsAuth(true);
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

	}, [isAuth]);
	const handleOpen = (str) => {

		if (drop === str) {

			setDrop("")
			setOpen(false);
		}
		else {
			setDrop(str)
			setOpen(true);
		}


	};
	let nameuser = (localStorage.getItem('username') !== null) ? localStorage.getItem('username').replace(/['"]+/g, '') : ""
	return (
		<div className="home-header">

			<div className="work-header">
				<div className="flex">
					<div className="logo">
						<a href='/' className="logo-text">Truyện chữ</a>

					</div>

					<div className="type-story drop">
						{/* <button onClick={() => handleOpen("type-story")} className=' drop btn btn-typestory '><span>Thể loại</span>
							<BsFillCaretDownFill />
							<div className="toggle-menu">
								{open && drop === "type-story" ? (
									<div className='dropTogle'>
										<ul className="drop-list">

											{typeStory.map((value, index) => (

												<li className="menu-item">
													<Link onClick={fetchStoriesByGenre(value["typename"])} key={index} to='/search'>{value["typename"]}</Link>
												</li>
											))}
										</ul>
									</div>
								) : null}
							</div>
						</button> */}
						<div class="dropdown-center">
							<button class="btn  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
								Thể loại
							</button>
							<ul class="dropdown-menu">
								{typeStory.map((value, index) => (

									<Link  to={`/search/type/${value['id']}`}  className="menu-item" key={index} >{value["typename"]}</Link>

								))}
							</ul>
						</div>
					</div>
				</div>
				<div className="search-story flex ">
					<Link onClick={handleSearch} to='/search' state={{ results: results }} className='btn btn-search'>
						<FiSearch className='search-icon' />
					</Link>
					<input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} className='search-input' />
				</div>

				<div className="write">
					<button onClick={() => handleOpen("write")} className=' drop btn btn-typestory '><span>Viết  </span>
						<BsFillCaretDownFill />
						<div className="toggle-menu">
							{open && drop === "write" ? (
								<div className='dropTogle'>

									<ul className="drop-list">
										<li className="menu-item">
											<span className='btn-link' onClick={(e) => checkUser(e, "/edit")} >Viết truyện mới</span>
										</li>
										<li className="menu-item">
											<span className='btn-link' onClick={(e) => checkUser(e, "/manage")} >Truyện của tôi</span>
										</li>
									</ul>
								</div>
							) : null}
						</div>
					</button>
				</div>
				{isAuth ?
					<div className="user-group">
						<div className="user-btn" onClick={() => handleOpen("user")}>
							<div className="user">

								<FaUserCircle />
								<span className='mx-3'>{nameuser}</span>
							</div>
							<div className="toggle-menu">

								{open && drop === "user" ? (
									<div className='dropTogle'>

										<ul className="drop-list">
											{/* <li className="menu-item">
												<Link to='/writing'>Thông tin</Link>
											</li> */}
											<li className="menu-item">
												<Link to='/'>Thông báo</Link>
											</li>
											<li className="menu-item">
												<Link onClick={handleLogout} className='btn btn-grey m-5px'>Đăng xuất</Link>
											</li>
										</ul>
									</div>
								) : null}
							</div>
						</div>
					</div> :

					<div className="group-button">

						<Link to="/login" className="btn btn-grey m-5px">Đăng nhập</Link>
						<Link to="/register" className="btn btn-orange m-5px" >Đăng ký</Link>
					</div>
				}

			</div>
		</div>
	)
}
