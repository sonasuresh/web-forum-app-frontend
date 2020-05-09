import React from 'react'

import { HashRouter, Route } from 'react-router-dom'

import RootView from './views/RootView'

function App() {
  return (
    <HashRouter>
      <Route path="/" component={RootView}></Route>
    </HashRouter>
  )
}

export default App