
// import React from 'react';
// import { Playlist, Recommend } from './routes';
import { matchRoutes, renderRoutes } from "react-router-config"
import route from './routes'
import { useHistory, useLocation } from 'react-router'
import { TabBar, Popup } from 'zarm'
import { isValidElement, useState } from "react";

import { createFromIconfontCN } from '@ant-design/icons';

import { Icon } from '@zarm-design/icons';
const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1340918_lpsswvb7yv.js', // 在 iconfont.cn 上生成
});




const TabIcon = Icon.createFromIconfont('//at.alicdn.com/t/font_1340918_lpsswvb7yv.js')

function App() {
  const history = useHistory()
  const location = useLocation()
  const defaultItem = location.pathname === '/' ? '/playlist': location.pathname
  const [current, setCurrent] = useState<string | number | undefined>(defaultItem)

  const change = (itemKey?: string | number) => {
    history.push(`${itemKey}`)
    setCurrent(itemKey)
  }
  
  return (
   <div>
     {renderRoutes(route)}
     <TabBar onChange={change} activeKey={current}>
      <TabBar.Item itemKey="/playlist" title="主页" icon={<MyIcon type="home" />} />
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
