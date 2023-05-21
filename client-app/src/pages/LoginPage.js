import { CardContent, Card, Typography, Switch } from '@mui/material'
import { useState, useEffect } from 'react';
import useForm from '../hooks/useForm';
import { ENDPOINT, createAPIEndpoint } from '../api';
import { useStateContext } from '../hooks/useStateContext';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import CenterContainer from '../container/CenterContainer';

const getLoginModel = () => ({
  name: '',
  email: ''
})

const LoginPage = ({ checked, onChange }) => {
  const [disableButton, setDisableButton] = useState(false)

  const { setContext, resetContext } = useStateContext()
  const { values, setValues, errors, handleInputChange, validateForm } = useForm(getLoginModel)
  const navigate = useNavigate()

  useEffect(() => {
    resetContext()
  }, [])

  const login = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setDisableButton(true)
      createAPIEndpoint(ENDPOINT.participant)
        .post(values)
        .then(res => {
          setContext({ participantId: res.data.participantId })
          navigate('/quiz')
        })
        .catch(err => console.log(err))
    }
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
          <LoginForm
            loginModel={getLoginModel}
            values={values}
            login={login}
            inputChange={handleInputChange}
            errors={errors}
            disableButton={disableButton}
          />
        </CardContent>
      </Card>
    </CenterContainer>
  )
}

export default LoginPage
