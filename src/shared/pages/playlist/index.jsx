import { useDispatch, useSelector } from 'react-redux'
import { Cell } from 'zarm'

const PlayList = () => {

  const dispatch = useDispatch()
  const playlist = useSelector((state) => state.playlist)

  React.useEffect(() => {
    console.log('fetch_playlist')
    dispatch({
      type: 'fetch_playlist'
    })
  }, [])

  return (<div>
    {
      playlist?.map((item) => <Cell key={item.id} title={item.name} icon={<img src={item.al.picUrl}  width="48px"/>}>{item.reason}</Cell>)
    }
  </div>)
}

PlayList.loadData = (store) => {
  store.dispatch({
    type: 'fetch_playlist'
  })
}

export default PlayList