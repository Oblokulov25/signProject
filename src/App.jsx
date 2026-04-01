import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './routes/signIn';
import SignUp from './routes/signUp';
import ForgotPassword from './routes/forgot';
function App() {
  return (
    <Router>
      <Routes>
        {/* Asosiy sahifaga kirganda avtomatik SignIn-ga yuboradi */}
        <Route path="/" element={<Navigate to="/signin" />} />
        
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/forgot' element={<ForgotPassword/>}/>
      </Routes>
    </Router>
  );
}

export default App;