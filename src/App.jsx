import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Import from './Import.jsx';
import Display from './Display.jsx';
import { useContext } from 'react';
import { MainContext } from './MainContext.jsx';
import MainProvider from './MainContext.jsx';
import Modal from './components/sections/Modal.jsx';
function App() {

   


   return (
      <MainProvider>
         <div>
            <Router>
               <Routes>
                  <Route path = "/" element = {<Import />}/>
                  <Route path = "/display" element = {<Display />}/>
                  <Route path = "/modal" element = {<Modal />}/> 
                  {/* DELETE ABOVE PATH AFTER BUILDING MODAL */}

               </Routes>
            </Router>
         </div>
         
      </MainProvider>
   )
}

export default App
