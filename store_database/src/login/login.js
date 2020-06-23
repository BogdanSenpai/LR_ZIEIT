import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles, createStyles } from "@material-ui/core";

import { observable } from "mobx";

const styles = createStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

@withStyles(styles)
@inject("userStore")
@observer
class Login extends Component {
  @observable email = "";
  @observable pass = "";
  @observable isSigningIn = false;
  @observable errorMsg = "";

  onSignIn = async () => {
    const { userStore } = this.props;
    try {
      this.isSigningIn = true;
      this.errorMsg = "";
      await userStore.signIn(this.email, this.pass);
    } catch (err) {
      this.errorMsg = err.message;
    } finally {
      this.isSigningIn = false;
    }
  };

  render() {

    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {this.isSigningIn ? (
            "Signing in.."
          ) : (
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={this.email}
                onChange={(ev) => (this.email = ev.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(ev) => (this.pass = ev.target.value)}
                value={this.pass}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.onSignIn}
              >
                Sign In
              </Button>
              {this.errorMsg && (
                <Typography color="error">{this.errorMsg}</Typography>
              )}
            </form>
          )}
        </div>
      </Container>
    );
  }
}

export { Login };
