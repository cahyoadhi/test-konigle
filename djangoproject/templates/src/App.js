import EmailList from './components/EmailList';
import { useState, useEffect } from "react";
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/GlobalStyle";
import { lightTheme, darkTheme } from "./components/Themes"


function App() {
  const [theme, setTheme] = useState('light');
  const themeToggler = () => {
    if(theme === 'light'){
      setTheme('dark');
      localStorage.setItem('prefersDarkMode', 'dark');
    }else { setTheme('light');
      localStorage.setItem('prefersDarkMode', 'light');
  }
  }

  useEffect(() => {
    const prefersDarkMode = localStorage.getItem('prefersDarkMode');
    setTheme(prefersDarkMode);

}, []);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles/>
      <div className="Container">
        <div className="App">
          <div className="Navbar">
            <h1>UNITY</h1>
            <div className='theme'>
              <label className="toggle-theme" htmlFor="checkbox">
              <input
                  type="checkbox"
                  id="checkbox"
                  onClick={themeToggler}
                />
              <div className='icon-wrapp'>
              <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24.05 46.55 17.3 40H8v-9.3L1.3 24 8 17.3V8h9.3l6.75-6.7L30.7 8H40v9.3l6.7 6.7-6.7 6.7V40h-9.3Zm0-9.55q5.4 0 9.175-3.8Q37 29.4 37 23.95q0-5.4-3.775-9.175Q29.45 11 24.05 11q-5.45 0-9.25 3.775T11 23.95q0 5.45 3.8 9.25t9.25 3.8Zm0-3q-4.2 0-7.125-2.925T14 23.95q0-4.15 2.925-7.05Q19.85 14 24.05 14q4.15 0 7.05 2.9 2.9 2.9 2.9 7.05 0 4.2-2.9 7.125T24.05 34Z"/></svg>
              </div>
              </label>

            </div>  
          </div>          
        </div>

        <EmailList/>
      </div>
    </ThemeProvider>
  );
}

export default App;
