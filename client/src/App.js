import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme, HStack,
} from '@chakra-ui/react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import Nav from './components/Nav';
import Game from './pages/Game';
import AdminPanel from './pages/AdminPanel';
import { API } from './api';

// [{
//   type: 'poker',
//   games: [{ name: 'poker classic', link: 'https' }, { name: 'poker classic2', link: 'https' }],
// }, { type: 'chess', games: [{ name: 'poker classic', link: 'https' }, { name: 'poker classic', link: 'https' }] }];

function App() {
  const [currentId, setCurrentId] = React.useState([]);
  const [listGames, setListGames] = React.useState([]);
  const [isAuth, setIsAuth] = React.useState(!!localStorage.getItem('igaming'));
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [currentLink, setCurrentLink] = React.useState('');

  React.useEffect(() => {
    localStorage.setItem('chakra-ui-color-mode', 'dark');
  }, []);

  React.useEffect(() => {
    API.profile.adminstatus()
      .then((res) => {
        setIsAdmin(res.data['is_admin']);
      })
      .catch(() => {})
  }, [isAuth])

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign='center' fontSize='xl'>
        <Grid minH='100vh'>
          <HStack zIndex={50} overflowY={'hidden'} spacing={0}>
            <BrowserRouter>
              <Routes>
                <Route path='/login' element={isAuth
                  ? <Navigate to='/' />
                  : <Login setIsAuth={setIsAuth} />
                } />
                <Route path='/register' element={isAuth
                  ? <Navigate to='/' />
                  : <Login setIsAuth={setIsAuth} isRegistration={true} />
                } />
                <Route path={'/'} element={isAuth ? <Main setCurrentId={setCurrentId} setCurrentLink={setCurrentLink} /> : <Navigate to='/login' />} />
                <Route path={'/admin/panel'} element={isAuth ? <AdminPanel setListNavGames={setListGames} /> : <Navigate to='/login' />} />
                <Route path={'/game/:name'}
                       element={isAuth ? <Game currentId={currentId} currentLink={currentLink} /> : <Navigate to='/login' />} />
                <Route path={'/*'} element={isAuth ? <Navigate to='/' /> : <Navigate to='/login' />} />
              </Routes>
              {isAuth && <Nav setCurrentId={setCurrentId} listGames={listGames} setListGames={setListGames} setIsAuth={setIsAuth} isAdmin={isAdmin} setCurrentLink={setCurrentLink} />}
            </BrowserRouter>
          </HStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
