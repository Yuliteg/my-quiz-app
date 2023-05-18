import { Box, Button, CardContent, TextField, Card, Typography, Switch } from '@mui/material'
import CenterContainer from './helper/CenterContainer';
import { useState } from 'react';
import useForm from '../hooks/useForm';
import { ENDPOINT, createAPIEndpoint } from '../api';
import { useStateContext } from '../hooks/useStateContext';

const getLoginModel = () => ({
  name: '',
  email: ''
})

const Login = ({ checked, onChange }) => {
  const {context, setContext} = useStateContext()
  const { values, setValues, errors, handleInputChange, validateForm } = useForm(getLoginModel)

  const [value, setValue] = useState({})

  const sharedTextFieldStyles = {
    width: { sm: 250, md: 350 },
    "& .MuiOutlinedInput-root:hover": {
      "& > fieldset": {
        borderColor: "darkgreen",
      },
    },
  };

  const login = (e) => {
    e.preventDefault()
    if (validateForm())
      createAPIEndpoint(ENDPOINT.participant)
        .post(values)
        .then(res => {
          setContext({participantId: res.data.participantId})
          console.log(context);
        })
        .catch(err => console.log(err))
  }

  return (
    <CenterContainer>
      <Switch
        checked={checked}
        onChange={onChange}
        sx={{
          position: 'absolute',
          top: '2%',
          right: '2%',
        }} />
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
            <form noValidate autoComplete='off' onSubmit={login}>
              <TextField
                label="Name"
                name="name"
                value={values.name}
                onChange={handleInputChange}
                variant='outlined'
                color="success"
                inputProps={{ style: { fontSize: "18px", height: "1rem" } }}
                sx={sharedTextFieldStyles}
                {...(errors.name && { error: true, helperText: errors.name })}
              />
              <TextField
                label="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                variant='outlined'
                color="success"
                inputProps={{ style: { fontSize: "18px", height: "1rem" } }}
                sx={sharedTextFieldStyles}
                {...(errors.email && { error: true, helperText: errors.email })}
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
