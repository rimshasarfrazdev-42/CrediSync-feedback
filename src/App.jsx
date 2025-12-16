import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { BrowserRouter } from "react-router-dom";
import { Content } from './layouts/content';

import { useThemeChooser } from './contexts/theme-chooser';
import { publicRoutes } from './routes';
// import your routes array

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Helvetica, Roboto, Arial, sans-serif;
    transition: all 0.50s linear;
  }
`;

function App() {
  const { themeConfig } = useThemeChooser();

  return (
    // <ThemeProvider theme={themeConfig}>
    // <GlobalStyles />
    // <Header />
    <Content>
      <Routes>
        {publicRoutes.map((route) => {
          const Component = route.component;
          return <Route key={route.name} path={route.path} element={<Component />} />;
        })}
      </Routes>
    </Content>
    // <Footer />
    // </ThemeProvider>
  );
}

export default App;
