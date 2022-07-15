const React = require('react');
const MainRouter = require('./MainRouter');
const { BrowserRouter } = require('react-router-dom');
const { ThemeProvider } = require('@material-ui/styles');
const theme = require('./theme');
const { hot } = require('react-hot-loader');

const App = () => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])
  return (
  <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainRouter/>
      </ThemeProvider>
  </BrowserRouter>
)}

export default hot(module)(App);
