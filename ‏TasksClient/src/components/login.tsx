import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Grid, Link } from '@material-ui/core';
import { user } from '../types/user';

import * as AuthApi from '../services/UserService';
import { useHistory } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            color: theme.palette.secondary.main
        },
    }, paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export const Login = () => {


    const [user, setUser] = useState<user>({ email: '', password: '', role: '' });

    const classes = useStyles();
    const history = useHistory();


    const login = () => {
        AuthApi.login(user)
            .then(({ data }) => {
                sessionStorage.setItem("accessToken", data.accessToken);
                history.push("/tasks");
            }).catch((err) => {
                console.log(err)
            });
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            className="home-container">
            <Grid item xs={6} className={classes.root}>
                <h1>Welcome to propit!</h1>
                <h4>please login to start manage your tasks</h4>
            </Grid>
            <Grid item xs={6}>
                <div className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={user.email}
                        onChange={e => setUser({ ...user, email: e.target.value })} />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={user.password}
                        onChange={e => setUser({ ...user, password: e.target.value })}
                    />
                    <Button
                        onClick={login}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Sign In
          </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid >

    );
}