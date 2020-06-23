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
@inject('dbViewStore')
@observer
class GroupAddModal extends Component {
  @observable name = '';

  render() {
    const { classes, onClose, dbViewStore } = this.props;
    const { name } = this;
    return (
      <>
        <div className={classes.modalTitle}>
          <Typography>Add</Typography>
          <Button onClick={onClose}>Close</Button>
        </div>
        <br />
        <Input
          placeholder="Name"
          value={this.name}
          onChange={(ev) => (this.name = ev.target.value)}
        />
        <br />
        <Button
          onClick={async () => {
            await dbViewStore.addGroup({ name });
            onClose();
          }}
        >
          Add!
        </Button>
      </>
    );
  }
}
export { GroupAddModal };
