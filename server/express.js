const express = require("express");
const path = require("path");
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const compress = require("compression");
const cors = require("cors");
const helmet = require("helmet");

const Template = require("./../template");

const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");


// modules for server side rendering
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const MainRouter = require("./../client/MainRouter");

// import { StaticRouter } from "react-router-dom"
const { StaticRouter } = require("react-router-dom");
// const { ServerStyleSheets, ThemeProvider } =require("@material-ui/styles");
const { ServerStyleSheets } = require("styled-components");
const { ThemeProvider } = require("styled-components");
const theme = require('./../client/theme');
//end

//comment out before building for production
const devBundle = require('./devBundle');

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

//comment out before building for production
devBundle.compile(app);

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
// secure apps by setting various HTTP headers
app.use(helmet());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

// mount routes
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', postRoutes);

app.get('*', (req, res) => {
  const sheets = new ServerStyleSheets();
  const context = {};
  const markup = ReactDOMServer.renderToString(
    sheets.collect(
     <StaticRouter location={req.url} context={context}>
      <ThemeProvider theme={theme}>
       <MainRouter />
      </ThemeProvider>
     </StaticRouter>
   )
 )
    if (context.url) {
      return res.redirect(303, context.url)
    }
    const css = sheets.toString()
    res.status(200).send(Template({
      markup: markup,
      css: css
    }));
});

// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error" : err.name + ": " + err.message})
  }else if (err) {
    res.status(400).json({"error" : err.name + ": " + err.message})
    console.log(err)
  }
});

export default app
