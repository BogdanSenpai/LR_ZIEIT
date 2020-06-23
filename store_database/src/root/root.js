import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { DBView } from '../db/db-view';
import { Login } from '../login/login';
import {
  AppBar,
  Toolbar,
  Button,
  withStyles,
  Card,
  Modal,
} from '@material-ui/core';
import { observable } from 'mobx';
import { NewUserModal } from './new-user-modal';

@inject('userStore')
@withStyles({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  main: {
    padding: 30,
  },
  btn: {
    color: '#fff',
    margin: '0 10px 0 0'
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  controls: {
    display: 'flex',
  },
  modalRoot: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInner: {
    padding: 20,
    minWidth: 300,
    minHeight: 400,
    display: 'flex',
    flexDirection: 'column',
  },
})
@observer
class Root extends Component {
  @observable newUserOpen = false;

  onToogleNewUser = () => {
    this.newUserOpen = !this.newUserOpen;
  };

  render() {
    const { userStore, classes } = this.props;
    if (userStore.isUserLoading) {
      return 'Loading..';
    }
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <div>
              {userStore.user
                ? `Logged in as ${userStore.user.email}`
                : 'Log in'}
            </div>
            <div>
              {userStore.user && (
                <div className={classes.controls}>
                  <Button className={classes.btn} onClick={this.onToogleNewUser}>
                    Create new user & DB
                  </Button>
                  <Button className={classes.btn} onClick={userStore.logOut}>
                    Log Out
                  </Button>
                </div>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <main className={classes.main}>
          {userStore.user ? <DBView /> : <Login />}
        </main>
        <Modal open={this.newUserOpen} onClose={() => this.onToogleNewUser()}>
          <div className={classes.modalRoot}>
            <Card className={classes.modalInner}>
              <NewUserModal onClose={this.onToogleNewUser} />
            </Card>
          </div>
        </Modal>
      </div>
    );
  }
}

export { Root };
