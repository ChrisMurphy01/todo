// import React from 'react'
// import ReactDOM from 'react-dom'

import App from './components/App/App'

// const wrapper = document.getElementById('app')

// wrapper ? ReactDOM.render(<App />, wrapper) : false

import React from 'react'
import ReactDOM from 'react-dom'
const title = 'React with Webpack and Babel'
ReactDOM.render(<App />, document.getElementById('app'))
module.hot.accept()
