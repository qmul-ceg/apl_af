
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Import from './Import.jsx';
import Display from './Display.jsx';

function App() {


   return (
      <>
         <div>
            <Router>
               <Routes>
                  <Route path = "/" element = {<Import />}/>
                  <Route path = "/display" element = {<Display />}/>
               </Routes>
            </Router>
         </div>
         
      </>
   )
}

export default App
