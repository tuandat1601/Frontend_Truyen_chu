import React from 'react'
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import Editpage from '../Page/Editpage';
import WriteStory from '../Page/WriteStory';
import Home from '../Page/Home';
import ManageStory from '../Page/ManageStory';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';

import SentEmail from './SentEmail';
import ResetPasswordPage from './ResetPasswordPage';
import StoryPage from '../Page/StoryPage';
import ChapterPage from '../Page/ChapterPage';
import Search from '../Page/Search';

export default function Router() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Home />
			//   errorElement: <ErrorPage />,
		},
		{
			path: "/manage",
			element: <ManageStory />
			//   errorElement: <ErrorPage />,
		},
		{
			path: "/edit",
			element: <Editpage />
			//   errorElement: <ErrorPage />,
		},
		{
			path: "/edit/:storyId",
			element: <Editpage />
			//   errorElement: <ErrorPage />,
		},
		{
			path: "/reset-password/:uidb64/:token",
			element: <ResetPasswordPage />
			//   errorElement: <ErrorPage />,
		},
		{
			path: "/sentemail",
			element: <SentEmail />
			//   errorElement: <ErrorPage />,
		},
		{
			path: "/writing",

			element: <WriteStory />
			//   errorElement: <ErrorPage />,
		},
		{
			path: "/write/:chapterId",

			element: <WriteStory />
			//   errorElement: <ErrorPage />,
		},
		{
			path: "/login",

			element: <Login />
			//   errorElement: <ErrorPage />,
		},
		{
			path: "/register",

			element: <Register />
			//   errorElement: <ErrorPage />,
		},
		{
			path: "/stories/:storyId",

			element: <StoryPage />
			//   errorElement: <ErrorPage />,
		},
		{
			path: "/search",

			element: <Search />
			//   errorElement: <ErrorPage />,
		},
		{
			path: "/search/type/:typeId",

			element: <Search />
			//   errorElement: <ErrorPage />,
		},
		{
			path: "/stories/:storyId/chapters/:chapterId",

			element: <ChapterPage />
			//   errorElement: <ErrorPage />,
		}
		// ,{
		//   path: "/logout",

		//   element: <Logout/>
		// //   errorElement: <ErrorPage />,
		// }

	]);
	return (
		<RouterProvider router={router}></RouterProvider>
	)
}
