import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import NotFound from './router/404';
import Sort from './router/Sort';
import Search from './router/Search';
import EditPatch from './router/EditPatch';
import NewMain from './newRouter/NewMain';
import NewNovel from './newRouter/NewNovel';
import NewCreate from './newRouter/NewCreate';
import NewLogin from './newRouter/NewLogin';
import NewSignup from './newRouter/NewSignup';
import NewNovelInfo from './newRouter/NewNovelInfo';
import NewCreateEdit from './newRouter/NewCreateEdit';
import NewEdit from './newRouter/NewEdit';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <NewMain />,
      },
      {
        path: 'login',
        element: <NewLogin />,
      },
      {
        path: 'signup',
        element: <NewSignup />,
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
        element: <NewCreate />,
      },
      {
        path: 'create/detail',
        element: <NewCreateEdit />,
      },
      {
        path: 'edit',
        element: <NewEdit />,
      },
      {
        path: 'edit/detail',
        element: <EditPatch />,
      },
      {
        path: 'n',
        children:[
          {
            path:':id',
            element: <NewNovelInfo />,
            children: [
              {
                path: ':round',
                element: <NewNovel />,
              },
            ]
          },
          {
            path:':id',
            children: [
              {
                path: 'detail',
                element: <NewNovel />,
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