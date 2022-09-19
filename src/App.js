import React from 'react'
import { Routes, Route} from "react-router-dom";

import Home from './components/pages/Home';
import EditComponant from './components/student/EditComponent';
import View from './components/student/View';

const App = () => {
  return (
  <>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/view/:id' element={<View/>} />
          <Route path='/edit/:id' element={<EditComponant/>} />
      </Routes>
  </> 
  )
}

export default App