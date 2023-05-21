import { Box, Card, CardContent, Typography, Button, Alert, CardMedia } from '@mui/material'
import { green } from '@mui/material/colors'
import { getFormatedTime } from '../helper'

const ScoreCard = ({ context, score, submitScore, restartQuiz, showAlert }) => {
  return (
    <Card sx={{ mt: 5, display: 'flex', width: '100%', maxWidth: 640, mx: 'auto' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardContent sx={{ flex: '1 0 auto', textAlign: 'center' }}>
          <Typography variant='h4'>Congratulations!</Typography>
          <Typography variant='h6' sx={{ mt: '5px' }}>YOUR SCORE</Typography>
          <Typography variant='h5' sx={{ fontWeight: 600 }}>
            <Typography variant='span' color={green[500]}>
              {score}
            </Typography> / 10
          </Typography>
          <Typography variant='h6' sx={{ mt: '5px' }}>
            Took {getFormatedTime(context.timeTaken) + ' mins'}
          </Typography>
          <Button variant="contained"
            sx={{ mx: 1, marginTop: '5px' }}
            size="small"
            color="success"
            onClick={submitScore}
          >
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
          {showAlert && (
            <Alert
              severity="success"
              variant="outlined"
              sx={{ width: '60%', m: 'auto', marginTop: '5%' }}
            >
              Score Updated!
            </Alert>
          )}
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{
          width: "45%", padding: '13px',
          objectFit: 'contain',
        }}
        image="./prize-removebg-preview.png"
      />
    </Card>
  )
}

export default ScoreCard
