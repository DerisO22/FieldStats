import { useState, useEffect } from 'react'
import './App.css'

let App = () => {
  const [data, setData] = useState<{ message: string | null}>({ message: null });

  useEffect(() => {
    fetch(`${window.location.protocol}//${window.location.hostname}:3001/api/data`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error("Error fetching data: ", error))
  }, [])

  return (
    <>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
    </>
  )
}

export default App;