import { useDispatch, useSelector } from 'react-redux'
import { Store } from 'redux';
import { Cell } from 'zarm'

const PlayList = () => {

  const dispatch = useDispatch()
  const playlist = useSelector((state: any) => state?.playlist)

  React.useEffect(() => {
    dispatch({
      type: 'fetch_playlist'
    })
  }, [])

  return (<div>
    {
      playlist?.map((item: any) => <Cell key={item.id} title={item.name} icon={<img src={item.al.picUrl}  width="48px"/>}>{item.reason}</Cell>)
    }
  </div>)
}

PlayList.loadData = (store: Store, params?: any) => {
  store.dispatch({
    type: 'fetch_playlist'
  })
}

export default PlayList