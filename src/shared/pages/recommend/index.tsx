

import { useDispatch, useSelector } from 'react-redux'
import { Cell } from 'zarm'
import { Store } from 'redux'

const Recommend = () => {

  const dispatch = useDispatch()

  const recommend = useSelector((state: any) => state.recommend)

  React.useEffect(() => {
    dispatch({
      type: 'fetch_recommend'
    })
  }, [])

  return (<div>
    {
      recommend?.map((item: any) => <Cell key={item?.song?.id} title={item?.song?.name} icon={<img src={item?.song?.al?.picUrl}  width="48px"/>} description={item?.song?.ar?.[0]?.name}></Cell>)
    }
  </div>)
}

Recommend.loadData = (store: Store, params?: any
  ) => {
  store.dispatch({
    type: 'fetch_recommend'
  })
}

export default Recommend