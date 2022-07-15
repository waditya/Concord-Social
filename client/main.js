const React =require('react');
const { hydrate } =require('react-dom');
const App =require('./App');

hydrate(<App/>, document.getElementById('root'));
