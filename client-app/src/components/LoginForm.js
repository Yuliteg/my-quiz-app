import { Box, TextField, Button } from '@mui/material';

const LoginForm = ({ login, errors, values, inputChange, disableButton }) => {

  const sharedTextFieldStyles = {
    width: { sm: 250, md: 350 },
    "& .MuiOutlinedInput-root:hover": {
      "& > fieldset": {
        borderColor: "darkgreen",
      },
    },
  };

  return (
    <Box
      sx={{
        '& .MuiTextField-root': {
          m: 1,
          width: '90%'
        }
      }}>
      <form noValidate autoComplete='off' onSubmit={login}>
        {Object.keys(values).map((fieldName) => (
          <TextField
            key={fieldName}
            label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
            name={fieldName}
            value={values[fieldName]}
            onChange={inputChange}
            variant='outlined'
            color="success"
            inputProps={{ style: { fontSize: "18px", height: "1rem" } }}
            sx={sharedTextFieldStyles}
            {...(errors[fieldName] && { error: true, helperText: errors[fieldName] })}
          />
        ))}
        <Button
          color='success'
          variant='contained'
          type='submit'
          size='lg'
          sx={{ width: '90%', ml: 1, mt: '4%' }}
          disabled={disableButton}
        >
          Submit
        </Button>
      </form>
    </Box>
  )
}

export default LoginForm
