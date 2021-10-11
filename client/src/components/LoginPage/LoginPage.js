import React, { useState } from 'react';
import {
    Checkbox,
    Grid,
    TextField,
    FormControlLabel,
    Paper,
    Button
} from '@material-ui/core';
import './LoginPage.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';




const LoginPage = () => {
    const history = useHistory();
    const [checked, setChecked] = React.useState(true);
    const [regiterToggle, setRegiterToggle] = useState(true);
    const [signUp, setSignUp] = useState({
        username: "",
        email: "",
        password: "",

    })
    const [signIn, setSignIn] = useState({
        email: "",
        password: "",
    })

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };


    const handleToggle = () => {
        setRegiterToggle(!regiterToggle);
    }

    const handleRegiter = (e) => {

        console.log(signUp)

        e.preventDefault();
        const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        const result = pattern.test(signUp.email);




        if (signUp.email === "" || signUp.password === "" || signUp.username === "") {
            toast("All Feilds are Required")
        }
        else if (!result) {
            toast("Email Id is Incorrect");
        }
        else {
            const payload = {
                username: signUp.username,
                email: signUp.email,
                password: signUp.password,

            }

            Axios.post('https://assignmentcheck.herokuapp.com/api/registerUser', payload)
                .then(data => {
                    console.log(data);

                    toast("User Registerd Successfully!");
                    setRegiterToggle(!regiterToggle)
                    setSignUp({
                        email: "",
                        password: "",
                        confirmPassword: ""
                    })

                })
                .catch(err => {
                    toast.error(err.response.data.message);
                })

        }
    }
    const handleLogin = (e) => {
        console.log(signIn);
        e.preventDefault();
        const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        const result = pattern.test(signIn.email);


        if (signIn.email === "" || signIn.password === "") {
            toast("All Feilds are Required");

        }
        else if (!result) {
            toast("Email id is Incorrect");

        } else {
            const payload = {
                email: signIn.email,
                password: signIn.password
            }
            Axios.post('https://assignmentcheck.herokuapp.com/api/loginUser', payload)
                .then(res => {
                    localStorage.setItem("token", res.data);
                    console.log(localStorage.getItem("token"));
                    setSignIn({
                        email: "",
                        password: ""
                    })

                    history.push('/home');
                    // history.go(0)
                }).catch(err => {
                    console.log(err)
                    toast.error(err.response.data.message);

                })
        }
    }

    const handleSignInChange = (e) => {
        setSignIn({ ...signIn, [e.target.name]: e.target.value });
    }

    const handleSignUpChange = (e) => {
        setSignUp({ ...signUp, [e.target.name]: e.target.value });


    }

    return (
        <div className="login_page">
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            {
                regiterToggle ? (
                    <Paper className="login_container">
                        <Grid
                            container
                            spacing={3}
                            direction={'column'}
                            justify={'center'}
                            alignItems={'center'}
                        >

                            <h2>Login</h2>
                            <Grid item xs={12}>
                                <TextField name="email" value={signIn.email} autoFocus onChange={handleSignInChange} className="inputFeild" variant="outlined" label="Email"></TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField name="password" value={signIn.password} onChange={handleSignInChange} className="inputFeild" variant="outlined" label="Password" type={'password'}></TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={handleChange}
                                            label={'Keep me logged in'}
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    }
                                    label="Keep me logged in"
                                />
                            </Grid>
                            <div className="loginSignup_button">
                                <Button onClick={handleLogin} className="button" variant="contained" fullWidth> Login </Button>
                                <Button onClick={handleToggle} className="button" variant="contained" fullWidth> Register </Button>
                            </div>

                        </Grid>
                    </Paper>

                ) : (
                    <Paper className="login_container">
                        <Grid
                            container
                            spacing={3}
                            direction={'column'}
                            justify={'center'}
                            alignItems={'center'}
                        >
                            <h2>Register</h2>
                            <Grid item xs={12}>
                                <TextField name="username" value={signUp.username} autoFocus onChange={handleSignUpChange} className="inputFeild" variant="outlined" label="Username"></TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField name="email" value={signUp.email} onChange={handleSignUpChange} className="inputFeild" variant="outlined" label="Email" type={'email'}></TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField name="password" value={signUp.password} onChange={handleSignUpChange} className="inputFeild" variant="outlined" label="Password" type={'password'}></TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={handleChange}
                                            label={'Keep me logged in'}
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    }
                                    label="Keep me logged in"
                                />
                            </Grid>
                            <div className="loginSignup_button">
                                <Button onClick={handleToggle} className="button" variant="contained" fullWidth> Login </Button>
                                <Button onClick={handleRegiter} className="button" variant="contained" fullWidth> Register </Button>
                            </div>

                        </Grid>
                    </Paper>
                )
            }
        </div>
    );
};
export default LoginPage;
