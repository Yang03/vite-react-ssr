
// import React from 'react';
// import { Playlist, Recommend } from './routes';
import { matchRoutes, renderRoutes } from "react-router-config"
import route from './routes'
import { useHistory, useLocation } from 'react-router'
import { Icon, TabBar } from 'zarm'
import { useState } from "react";

const TabIcon = Icon.createFromIconfont('//at.alicdn.com/t/font_1340918_lpsswvb7yv.js');

function App() {
  const history = useHistory()
  const location = useLocation()
  const [current, setCurrent] = useState(location.pathname || '/playlist')

  const change = (itemKey) => {
    history.push(`${itemKey}`)
    setCurrent(itemKey)
  }
  return (
   <div>
     {renderRoutes(route)}
     <TabBar onChange={change} activeKey={current}>
      <TabBar.Item itemKey="/playlist" title="主页" icon={<TabIcon type="home" />}/>
      <TabBar.Item
          itemKey="/recommend"
          title="我的"
          icon={<TabIcon type="user" />}
        />
     </TabBar>
   </div>
  )
}

export default App
