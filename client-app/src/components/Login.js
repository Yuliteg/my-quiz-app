import { Box, Button, CardContent, TextField, Card, Typography, Switch } from '@mui/material'
import CenterContainer from './helper/CenterContainer';
import { useState } from 'react';

const Login = ({ checked, onChange }) => {
  
  const [value,setValue] = useState({})

  const sharedTextFieldStyles = {
    width: { sm: 250, md: 350 },
    "& .MuiOutlinedInput-root:hover": {
      "& > fieldset": {
        borderColor: "darkgreen",
      },
    },
  };

  return (
    <CenterContainer>
      <Switch 
      checked={checked} 
      onChange={onChange}
      sx={{
         position: 'absolute',
         top: '2%',
         right: '2%',
      }}/>
      <Card sx={{ width: '25rem' }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant='h4' sx={{ my: 3 }}>
            My Quiz
          </Typography>
          <Box sx={{
            '& .MuiTextField-root': {
              m: 1,
              width: '90%'
            }
          }}>
            <form noValidate autoComplete='off'>
              <TextField
                label="Email"
                name="email"
                variant='outlined'
                color="success"
                inputProps={{ style: { fontSize: "18px", height: "1rem" } }}
                sx={sharedTextFieldStyles}
              />
              <TextField
                label="name"
                name="name"
                variant='outlined'
                color="success"
                inputProps={{ style: { fontSize: "18px", height: "1rem" } }}
                sx={sharedTextFieldStyles}
              />
              <Button
                color='success'
                variant='contained'
                type='submit'
                size='lg'
                sx={{ width: '90%', ml: 1, mt: '4%' }}
              >Submit</Button>
            </form>
          </Box>
        </CardContent>
      </Card>
    </CenterContainer>
  )
}

export default Login
