import React, {useState, useEffect} from 'react';
import fire from '../../../../firebase';
import classes from './login.css';

const Login = ({history}) => {
    const[user, setUser] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[emailError, setEmailError] = useState('');
    const[passwordError, setPasswordError] = useState('');
    const[hasAccount, setHasAccount] = useState(true);

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    }

    const  clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    }

    const handleLogin = async () => {
        clearErrors();
        const result = 
            await fire
                .auth()
                .signInWithEmailAndPassword(email, password)
                .catch(err => {
                    switch(err.code) {
                        case "auth/invalid-email":
                        case "auth/user-disabled":
                        case "auth/user-not-found":
                            setEmailError(err.message);
                            break;
                        case "auth/wrong-password":
                            setPasswordError(err.message);
                            break;
                        
                    }
                });
        const user = await result.user.getIdTokenResult();
        localStorage.setItem('token', user.token);
        history.push('/home');
    };

    const handleSignup = () => {
        clearErrors();
        fire
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(err => {
                switch(err.code) {
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.message);
                        break;
                    case "auth/weak-password":
                        setPasswordError(err.message);
                        break;
                    
                }
            });
    };

    const handleLogout = () => {
        fire.auth().signOut();
    }

    const authListener = () => {
        fire.auth().onAuthStateChanged(user => {
            if(user) {
                clearInputs();
                setUser(user);
            }
            else {
                setUser("");
            }
        })
    }

    useEffect(() => {
        authListener();
    }, [])

    return (
        <div className={classes.login}>
            <div className={classes.loginContainer}>
                <label>Username</label>
                <input 
                    type="text" 
                    autoFocus
                    required 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                />
                <p className={classes.errorMsg}>{emailError}</p>
                <label>Password</label>
                <input 
                    type="password" 
                    required 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                />
                <p className={classes.errorMsg}>{passwordError}</p>
                <div className={classes.btnContainer}>
                    {hasAccount ? (
                        <div>
                            <button 
                            className={classes.button}
                            onClick={handleLogin}>Sign In</button>
                            <p>
                                Don't have an account ? 
                                <span onClick={() => setHasAccount(!hasAccount)}>
                                    Sign Up
                                </span>
                            </p>
                        </div>
                    ) : (
                        <div>
                                <button 
                                className={classes.button} 
                                onClick={handleSignup}>Sign Up</button>
                                <p>
                                    Have an account ? 
                                    <span onClick={() => setHasAccount(!hasAccount)}>
                                        Sign In
                                    </span>
                                </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;

