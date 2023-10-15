import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Main from './router/Main';
import NotFound from './router/404';
import Login from './router/Login';
import Signup from './router/Signup';
import Sort from './router/Sort';
import Search from './router/Search';
import Create from './router/Create';
import Edit from './router/Edit';
import NovelInfo from './router/NovelInfo';
import Novel from './router/Novel';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Main />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'sort',
        element: <Sort />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'create',
        element: <Create />,
      },
      {
        path: 'edit',
        element: <Edit />,
      },
      {
        path: 'n',
        children:[
          {
            path:':id',
            element: <NovelInfo />,
            children: [
              {
                path: ':round',
                element: <Novel />,
              },
            ]
          },
          {
            path:':id',
            children: [
              {
                path: 'detail',
                element: <Novel />,
              },
            ]
          }
        ]
        
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;