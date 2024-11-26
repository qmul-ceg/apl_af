import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Import from './Import.jsx';
import Display from './Display.jsx';
import { useContext } from 'react';
import { MainContext } from './MainContext.jsx';
import MainProvider from './MainContext.jsx';

function App() {

   


   return (
      <MainProvider>
         <div>
            <Router>
               <Routes>
                  <Route path = "/" element = {<Import />}/>
                  <Route path = "/display" element = {<Display />}/>
               </Routes>
            </Router>
         </div>
         
      </MainProvider>
   )
}

export default App
