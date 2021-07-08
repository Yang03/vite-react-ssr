import { useDispatch, useSelector } from 'react-redux'
import { Cell } from 'zarm'

const Recommend = () => {

  const dispatch = useDispatch()

  const recommend = useSelector((state) => state.recommend)

  React.useEffect(() => {
    dispatch({
      type: 'fetch_recommend'
    })
  }, [])

  return (<div>
    {
      recommend?.map((item) => <Cell key={item?.song?.id} title={item?.song?.name} icon={<img src={item?.song?.al?.picUrl}  width="48px"/>} description={item?.song?.ar?.[0]?.name}></Cell>)
    }
  </div>)
}

Recommend.loadData = (store) => {
  store.dispatch({
    type: 'fetch_recommend'
  })
}

export default Recommend