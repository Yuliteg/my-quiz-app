import React, { useEffect, useState } from 'react'
import { useStateContext } from '../hooks/useStateContext'
import { ENDPOINT, createAPIEndpoint } from '../api'
import { useNavigate } from 'react-router-dom'
import Answer from '../components/Answer'
import ScoreCard from '../components/ScoreCard'

const ResultPage = () => {
  const { context, setContext } = useStateContext()
  const [score, setScore] = useState(0)
  const [qnAnswers, setQnAnswers] = useState([])
  const [showAlert, setShowAlert] = useState(false)

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

  const submitScore = () => {
    if (context && context.participantId) {
      createAPIEndpoint(ENDPOINT.participant)
        .put(context.participantId, {
          participantId: context.participantId,
          score: score,
          timeTaken: context.timeTaken
        })
        .then(res => {
          setShowAlert(true)
          setTimeout(() => {
            setShowAlert(false)
          }, 3000)
        })
        .catch(e => console.log(e))
    } else {
      console.log("Participant ID not avilable");
    }
  }

  return (
    <>
      <ScoreCard
        context={context}
        score={score}
        submitScore={submitScore}
        restartQuiz={restartQuiz}
        showAlert={showAlert}
      />
      <Answer qnAnswers={qnAnswers} />
    </>
  )
}

export default ResultPage
