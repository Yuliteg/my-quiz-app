import Login from './pages/LoginPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Quiz from "./pages/QuizPage";
import Result from "./pages/ResultPage";
import ErrorPage from "./pages/ErrorPage";
import Layout from './Layout/Layout';
import PrivateRoute from './routes/PrivateRoute';

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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Login checked={isLightTheme} onChange={toggleTheme} />} />

          <Route element={<PrivateRoute />}>       
               <Route path="/" element={<Layout />}>
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
          </Route>
          </Route>


          <Route path="*" element={<ErrorPage />} />

        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
