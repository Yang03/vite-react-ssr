import { useDispatch } from 'react-redux'

const playList = () => {

  const dispatch = useDispatch()

  React.useEffect(() => {
    console.log('fetch_playlist')
    dispatch({
      type: 'fetch_playlist'
    })
  }, [])

  return (<div>paylist</div>)
}

playList.loadData = (store) => {
  store.dispatch({
    type: 'fetch_playlist'
  })
}

export default playList