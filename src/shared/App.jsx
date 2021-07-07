
// import React from 'react';
// import { Playlist, Recommend } from './routes';
import { Route, Switch } from 'react-router-dom';
import { matchRoutes, renderRoutes } from "react-router-config"
import route from './routes'


function App() {
  return (
   <div>
     {renderRoutes(route)}
   </div>
  )
}

export default App
