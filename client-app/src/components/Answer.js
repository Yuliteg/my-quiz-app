import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, CardMedia, List, ListItem } from '@mui/material';
import React, { useState } from 'react'
import { URL } from '../api';
import { letterForQuestion } from '../helper';
import ExpandedCircleDown from '@mui/icons-material/ExpandCircleDown'
import { red, green, grey } from '@mui/material/colors'

const Answer = ({ qnAnswers }) => {
  console.log(qnAnswers);
  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleCorrectOrNot = (qna, index) => {
    if ([qna.answer, qna.selected].includes(index + 1)) {
        return { sx: { color: qna.answer == (index + 1) ? green[500] : red[500] } }
    }
} 

  return (
    <Box sx={{ mt: 5, width: '100%', maxWidth: 640, mx: 'auto' }}>
      {
        qnAnswers.map((item, index) => (
          <Accordion
            disableGutters
            key={index}
            expanded={expanded === index}
            onChange={handleChange(index)}
          >
            <AccordionSummary
              expandIcon={<ExpandedCircleDown
                sx={{ color: item.answer === item.selected ? green[500] : red[500] }}
              />}
            >
              <Typography sx={{ width: '90%', flexShrink: 0, mt: '3%', mb: '2%' }}>
                {item.qnInWordps}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{backgroundColor: grey[900]}}>
              {item.imageUrl && (
                <CardMedia
                  component="img"
                  image={URL + 'images/' + item.imageUrl}
                  sx={{ m: '10px auto', width: '100%' }}
                />
              )}
              <List>
                {item.options.map((option, indexOpt) => (
                  <ListItem key={indexOpt}>
                    <Typography {...handleCorrectOrNot(item, indexOpt)}>
                      <b>
                        {letterForQuestion(indexOpt)}
                      </b>{option}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))
      }
    </Box>
  )
}

export default Answer
