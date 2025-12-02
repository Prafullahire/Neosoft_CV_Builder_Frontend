// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Login from './components/Auth/Login';
// import Register from './components/Auth/Register';
// import Dashboard from './components/Dashboard/Dashboard';
// import LayoutSelector from './components/Layouts/LayoutSelector';
// import CVEditor from './components/Editor/CVEditor';
// import PublicCV from './components/Common/PublicCV';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/layouts" element={<LayoutSelector />} />
//           <Route path="/editor" element={<CVEditor />} />
//           <Route path="/editor/:id" element={<CVEditor />} />
//           <Route path="/cv/:id" element={<PublicCV />} />
//           <Route path="/" element={<Navigate to="/login" />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import LayoutSelector from "./components/Layouts/LayoutSelector";
import CVEditor from "./components/Editor/CVEditor";
import PublicCV from "./components/Common/PublicCV";

function App() {
  const basename = process.env.PUBLIC_URL || '/';

  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/layouts" element={<LayoutSelector />} />
        <Route path="/editor" element={<CVEditor />} />
        <Route path="/editor/:id" element={<CVEditor />} />
        <Route path="/cv/:id" element={<PublicCV />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
