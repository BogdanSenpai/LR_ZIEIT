import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Typography, withStyles, Button, Input } from '@material-ui/core';
import { observable } from 'mobx';

@withStyles({
  modalTitle: {
    display: 'flex',
    justifyContent: 'space-between',
  },
})
@inject('userStore')
@observer
class NewUserModal extends Component {
  @observable email = '';
  @observable password = '';

  render() {
    const { classes, onClose, userStore } = this.props;
    return (
      <>
        <div className={classes.modalTitle}>
          <Typography>Create new user & DB</Typography>
          <Button onClick={onClose}>Close</Button>
        </div>
        <br />
        <Input
          placeholder="Email"
          value={this.email}
          onChange={(ev) => (this.email = ev.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={this.password}
          onChange={(ev) => (this.password = ev.target.value)}
        />
        <br />
        <Button
          onClick={async () => {
            await userStore.createNewUser(this.email, this.password);
            onClose();
          }}
        >
          Create!
        </Button>
      </>
    );
  }
}
export { NewUserModal };
