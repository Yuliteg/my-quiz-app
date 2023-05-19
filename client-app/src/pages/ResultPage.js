import React, { useEffect, useState } from 'react'
import { useStateContext } from '../hooks/useStateContext'
import { ENDPOINT, createAPIEndpoint } from '../api'
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { getFormatedTime } from '../helper'
import { useNavigate } from 'react-router-dom'

const ResultPage = () => {
  const { context, setContext } = useStateContext()
  const [score, setScore] = useState(0)
  const [qnAnswers, setQnAnswers] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    const ids = context.selectedOptions.map(x => x.qnId)
    createAPIEndpoint(ENDPOINT.getAnswers)
      .post(ids)
      .then(res => {
        const qna = context.selectedOptions.map(x => ({
          ...x,
          ...(res.data.find(y => y.qnId === x.qnId))
        }))
        setQnAnswers(qna)
        calculateScore(qna)
      })
      .catch(e => console.log(e))
  }, [])

  const calculateScore = (qna) => {
    let tempScore = qna.reduce((acc, curr) => {
      return curr.answer === curr.selected ? acc + 1 : acc;
    }, 0)
    setScore(tempScore)
  }

  const restartQuiz = () => {
    setContext({
      timeTaken: 0,
      selectedOptions: []
    })
    navigate("/quiz")
  }

  return (
    <Card sx={{ mt: 5, display: 'flex', width: '100%', maxWidth: 640, mx: 'auto' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardContent sx={{ flex: '1 0 auto', textAlign: 'center' }}>
          <Typography variant='h4'>Congratulations!</Typography>
          <Typography variant='h6' sx={{ mt: '5px' }}>YOUR SCORE</Typography>
          <Typography variant='h5' sx={{ fontWeight: 600 }} color="#daa520">
            <Typography variant='span'>
              {score}
            </Typography> / 10
          </Typography>
          <Typography variant='h6' sx={{ mt: '5px' }}>
            Took {getFormatedTime(context.timeTaken) + ' mins'}
          </Typography>

          <Button variant="contained" sx={{ mx: 1, marginTop: '5px' }} size="small" color="success">
            Submit
          </Button>
          <Button
            variant="contained"
            sx={{
              mx: 1,
              marginTop: '5px',
              backgroundColor: "gold",
                '&:hover': {
                backgroundColor: 'darkgoldenrod',
              },
            }}
            size="small"
            onClick={restartQuiz}
          >
            Restart
          </Button>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: "35%", padding: '13px' }}
        image="./prize-removebg-preview.png"
      />

    </Card >
  )
}

export default ResultPage
