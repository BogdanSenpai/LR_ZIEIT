import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {
  Typography,
  withStyles,
  Button,
  Input,
  Select,
  MenuItem,
} from '@material-ui/core';
import { observable } from 'mobx';

@withStyles({
  modalTitle: {
    display: 'flex',
    justifyContent: 'space-between',
  },
})
@inject('dbViewStore')
@observer
class StudentAddModal extends Component {
  @observable name = '';
  @observable groupId = '';

  render() {
    const { classes, onClose, dbViewStore } = this.props;
    const { name, groupId } = this;
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
        <Select
          placeholder="Group"
          value={this.groupId}
          onChange={(ev) => (this.groupId = ev.target.value)}
        >
          {dbViewStore.db.groups.map((g) => (
            <MenuItem value={g.key} key={g.key}>
              {g.name}
            </MenuItem>
          ))}
        </Select>
        <br />
        <Button
          onClick={async () => {
            await dbViewStore.addStudent({ name, groupId });
            onClose();
          }}
        >
          Add!
        </Button>
      </>
    );
  }
}
export { StudentAddModal };
