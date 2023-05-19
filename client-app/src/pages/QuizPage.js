import React, { useEffect, useState } from 'react'
import { useStateContext } from '../hooks/useStateContext'
import { ENDPOINT, URL, createAPIEndpoint } from '../api'
import { Card, CardContent, List, ListItemButton, Typography, CardHeader, LinearProgress, Box, CardMedia } from '@mui/material';
import { getFormatedTime } from '../helper';
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0)
  const [timeTaken, setTimeTaken] = useState(0);

  const { context, setContext } = useStateContext()

  const navigate = useNavigate()

  const progressColor = 'rgba(76, 175, 80, 0.2)';
  const darkerProgressColor = 'rgba(76, 175, 80, 0.9)';

  useEffect(() => {
    setContext({
      timeTaken: 0,
      selectedOptions: []
    })
    let timer = setInterval(() => {
      setTimeTaken(prev => prev + 1);
    }, 1000);

    createAPIEndpoint(ENDPOINT.question)
      .fetch()
      .then(res => {
        setQuestions(res.data)
      })
      .catch(e => console.log(e))

    return () => {
      clearInterval(timer);
    }
  }, [])

  if (questions.length <= 0) {
    return null;
  }

  const updateAnswer = (qnId, optionIndx) => {
    const temp = [...context.selectedOptions]

    temp.push({
      qnId,
      selected: optionIndx
    })
    if (questionIndex < 9) {
      setContext({ selectedOptions: [...temp] })
      setQuestionIndex(questionIndex + 1)

    } else {
      setContext({
        selectedOptions: [...temp],
        timeTaken
      })
      navigate("/result")
    }
  }

  return (
    <Card
      sx={{
        maxWidth: '80%', mx: 'auto', mt: 6,
        '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' }
      }}
    >
      <CardHeader
        title={'Question ' + (questionIndex + 1) + ' of 10'}
        action={<Typography>{getFormatedTime(timeTaken)}</Typography>}
      />
      <Box>
        <LinearProgress
          variant='determinate'
          color='primary'
          value={(questionIndex + 1) * 100 / 10}
          sx={{
            backgroundColor: progressColor,
            '& .MuiLinearProgress-bar': {
              backgroundColor: darkerProgressColor,
            },
          }}
        />
      </Box>
      {questions[questionIndex].imageUrl !== null && (
        <CardMedia
          component="img"
          image={URL + 'images/' + questions[questionIndex].imageUrl}
          sx={{
            maxHeight: '300px',
            objectFit: 'cover',
            objectPosition: 'center !important',
          }}
        />
      )}
      <CardContent>
        <Typography variant='h6'>
          {questions[questionIndex].qnInWordps}
        </Typography>
        <List>
          {questions[questionIndex].options.map((item, index) => (
            <ListItemButton key={index} onClick={() => updateAnswer(questions[questionIndex].qnId, index)}>
              <div>
                {String.fromCharCode(65 + index) + ". "}<b>{item}</b>
              </div>
            </ListItemButton>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default QuizPage
