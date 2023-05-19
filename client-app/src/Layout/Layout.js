import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import QuizIcon from '@mui/icons-material/Quiz';
import { Outlet, useNavigate } from 'react-router-dom';
import { useStateContext } from '../hooks/useStateContext';

const Layout = () => {
  const { resetContext } = useStateContext()
  const navigate = useNavigate()

  const logout = () => {
   resetContext()
   navigate("/")
  }

  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ width: '60%', m: 'auto' }}>
          <Typography variant='h4' align='center'>
            Quiz Application <QuizIcon />
          </Typography>
          <Button onClick={logout} sx={{flexGrow: 3, ml: '15%'}} >Logout</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Outlet />
      </Container>
    </>
  )
}

export default Layout
