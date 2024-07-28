import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Box, styled } from '@mui/material';
import { FaUser } from "react-icons/fa";
import { BiSolidLock } from "react-icons/bi";
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login, logout } from '../../../redux/authSlice';
import { Popup } from '../containts';

const EmailBox = styled(Box)`
    display: flex;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 16px;
    align-items: center;
    margin: 34px 11px 5px 7px !important;
    padding: 0px 1px 0px 11px;
    outline: ${props => props.active ? '2px solid rgb(163 163 163)' : 'none'};
`;

function Login() {
    const URL = "http://localhost:3000";
    const [activeBox, setActiveBox] = useState(null);
    const emailBoxRef = useRef(null);
    const navigate = useNavigate();
    const [obj, setObj] = useState({ email: '', password: '' });
    const dispatch = useDispatch();

    const [toast, setToast] = useState(false);
    const [alert, setAlert] = useState(false);
    const [error, setError] = useState(false);

    //<--------Tost Timmer
    useEffect(() => {
        const interval = setInterval(() => {
            setToast(false);
        }, 3000);
        return () => clearInterval(interval);
    }, [toast]);

    //<--------handle BropButton---------->
    useEffect(() => {
        dispatch(logout())
        const handleClickOutside = (event) => {
            if (emailBoxRef.current && !emailBoxRef.current.contains(event.target)) {
                setActiveBox(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);

    const handleEmailChange = (event) => {
        setObj({ ...obj, email: event.target.value });
    };

    const handlePasswordChange = (event) => {
        setObj({ ...obj, password: event.target.value });
    };

    //<-----------Handle Login------------->
    const handleLogin = async () => {
        try {
            const result = (await axios.post(`${URL}/auth/login`, obj)).data;
            console.log(result.data)
            dispatch(login({ userData: result.data.user, role:result.data.user.role}));
            setToast(true)
            navigate('/app/dashboard');
            setObj({ email: '', password: '' });
            
        } catch (error) {
            setToast(true);
            setAlert(true);
            setError(true)
            console.log('Login error: ', error);
        }
    };

    return (
        <Container className="justify-content-center align-items-center"
            style={{
                height: 'auto',
                width: '400px',
                marginTop: '10%',
                borderRadius: '10px',
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'
            }}>
            <div style={{ textAlign: 'center', padding: '15px 0px 0px 0px' }}>
                <h1>Welcome!</h1>
            </div>
            {/**<------------Toast-----------> */}
            {toast && (
                <div
                    style={{
                        zIndex: 10,
                        position: "fixed",
                        right: "0px",
                        marginTop: "-9%",
                    }}
                >
                    <Popup
                        setToast={setToast}
                        alert={alert}
                        subMesg = {error ? "Invalid credentials": "Login Successful"}
                        backgroundColor="red" // Pass error message conditionally
                    />
                </div>
            )}
            {/*<------------Form-------------> */}
            <Form style={{ margin: '8% 13px 11px 14px' }} className="justify-content-center align-items-center">
                <Form.Group className="my-3" controlId="formGroupEmail">
                    <EmailBox ref={emailBoxRef} active={activeBox === 1} onClick={() => setActiveBox(1)}>
                        <FaUser style={{ fontSize: '16px', textAlign: 'center', marginRight: '9px' }} />
                        <input
                            type='email'
                            placeholder='Enter email'
                            value={obj.email}
                            onChange={handleEmailChange}
                            style={{
                                border: 'none',
                                height: '41px',
                                width: '95%',
                                borderRadius: '16px',
                                outline: 'none'
                            }}
                        />
                    </EmailBox>
                </Form.Group>
                <Form.Group className="mt-4" controlId="formGroupPassword">
                    <EmailBox active={activeBox === 2} onClick={() => setActiveBox(2)}>
                        <BiSolidLock style={{ fontSize: '20px', textAlign: 'center', marginRight: '9px' }} />
                        <input
                            type='password'
                            placeholder='Enter password'
                            value={obj.password}
                            onChange={handlePasswordChange}
                            style={{
                                border: 'none',
                                height: '41px',
                                width: '95%',
                                borderRadius: '16px',
                                outline: 'none'
                            }}
                        />
                    </EmailBox>
                    <div style={{ display: 'flex', margin: '10px', fontSize: '13px' }}>
                        <Form.Check label="Remember me" />
                        <p style={{ float: 'right', marginLeft: 'auto' }}>Forgot password?</p>
                    </div>
                </Form.Group>
            </Form>

            {/*<---------Footer---------> */}
            <div style={{ padding: '2px 0px 7px 0px' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className='bg-neutral-200 hover:bg-neutral-400' style={{
                        borderRadius: '2rem',
                        width: '140px',
                        height: '46px',
                        border: 'none',
                        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                    }} onClick={handleLogin}>Login</button>
                </div>
                <div className='d-flex justify-content-center mt-3 text-sm'>
                    Don't have an account? &nbsp; <p className='text-sky-500 hover:text-sky-600 hover:font-semibold' onClick={() => navigate('/register')} style={{cursor:'pointer'}}> Create</p>
                </div>
                <div className='text-center text-sm' style={{ padding: '11px 0px' }}>
                    <div className='d-flex justify-content-center mt-2'>
                        <div style={{ display: 'flex' }}>
                            <img className='me-2' src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                                alt="facebook" style={{ height: '23px', margin: '3px' }} />
                            <img className='me-1' src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                                alt="Google" />
                            <img className='me-2' src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Github-desktop-logo-symbol.svg" alt="github" style={{ height: '28px' }} />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Login;
