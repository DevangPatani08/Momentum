import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layouts/Layout.jsx';
import AuthLayout from './components/Layouts/AuthLayout.jsx';
import Home from './pages/Home.jsx';
import Contact from './pages/Contact.jsx';
import Tasks from './pages/Tasks.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import PageNotFound from './pages/PageNotFound.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout><Home /></Layout>} />
        <Route path='/contact' element={<Layout><Contact /></Layout>} />
        <Route path='/login' element={<AuthLayout><Login /></AuthLayout>} />
        <Route path='/register' element={<AuthLayout><Register /></AuthLayout>} />
        <Route path='/tasks' element={<Layout><Tasks /></Layout>} />
        <Route path='/*' element={<AuthLayout><PageNotFound /></AuthLayout>} />
      </Routes>
    </Router>
  );
};

export default App;
