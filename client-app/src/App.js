import Login from "./components/Login";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});


function App() {
  const [isLightTheme, setIsLightTheme] = useState(false);

  const toggleTheme = () => {
    setIsLightTheme((prevTheme) => !prevTheme);
  };

  const theme = isLightTheme ? lightTheme : darkTheme;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={(
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Login checked={isLightTheme} onChange={toggleTheme} />
          </ThemeProvider>
        )} />
        <Route />
        <Route />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
