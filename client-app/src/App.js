import Login from './pages/LoginPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import ErrorPage from "./pages/ErrorPage";

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
        <Route path="/quiz" element={<Quiz />}/>
        <Route path="/result" element={<Result />}/>
        <Route path="*" element={<ErrorPage />}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
