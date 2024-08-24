import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Console, Dashboard, Analytics, Report, Mould, Performance, Config, Login, TAC, RegisterCom } from './Components/pages';
import { useSelector } from 'react-redux';
import Filters from './Components/pages/Filters';
import MiniDashboard from './Components/pages/MiniDashboard/MiniDashboard';
import PageNotFound from './Components/pages/PageNotFond';
import Setting from './Components/pages/Settings/Setting';
import Pages from './Pages';
import Operator from './Components/pages/OperatorOption/Operator';



function App() {
  const [isOpen, setIsOpen] = useState((window.innerHeight<=600)? false: true);
  const loginstate = useSelector((state) => state.auth.status);

  const toggleSidebar = () => {
    if (window.innerWidth > 480) {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setIsOpen(false);
      }
    };

    // Check screen width when component mounts
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tac" element={<TAC />} />
       
          <Route
            path="/app"
            element={<Pages isOpen={isOpen} toggle={toggleSidebar} />}
          >
            {/* <Route path="dashboard" element={<Test />} /> */}
            <Route
              path="dashboard"
              element={<Dashboard isOpen={isOpen} toggle={toggleSidebar} />}
            />
            <Route
              path="register"
              element={<RegisterCom isOpen={isOpen} toggle={toggleSidebar} />}
            />
            <Route
              path="report"
              element={<Report isOpen={isOpen} toggle={toggleSidebar} />}
            />
            <Route
              path="config"
              element={<Config isOpen={isOpen} toggle={toggleSidebar} />}
            />
            <Route
              path="filters"
              element={<Filters isOpen={isOpen} toggle={toggleSidebar} />}
            />
            <Route
              path="miniDash"
              element={<MiniDashboard isOpen={isOpen} toggle={toggleSidebar} />}
            />
            <Route
              path="setting"
              element={<Setting isOpen={isOpen} toggle={toggleSidebar} />}
            />
            <Route
              path="Operator"
              element={<Operator/>}
            />
            <Route path="console" element={<Console />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="mould" element={<Mould />} />
            <Route path="performance" element={<Performance />} />
          </Route>
       
        <Route path="*" element={<PageNotFound />} />
      </Routes>
     
    </BrowserRouter>
  );
}

export default App;
