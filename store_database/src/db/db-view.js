import React, { Component } from 'react';
import { Provider, inject, observer } from 'mobx-react';
import { DBViewStore } from './db-view-store';
import {
  Tab,
  Tabs,
  withStyles,
  Table,
  TableSortLabel,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Input,
  Button,
  Typography,
  Modal,
  Card,
} from '@material-ui/core';
import { observable, computed } from 'mobx';
import { StudentAddModal } from '../root/student-add-modal';
import { GroupAddModal } from '../root/group-add-modal';
import { createObjectCsvStringifier } from 'csv-writer';

const tabs = Object.freeze({
  students: 0,
  groups: 1,
});
@inject('userStore')
@withStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  dbWrap: {
    flex: 1,
  },
  controls: {
    display: 'flex',
    margin: '10px 0',
    justifyContent: 'space-between',
  },
  innerConrols: {
    display: 'flex',
  },
  btn: {
    margin: '0 5px 0 0',
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
class DBView extends Component {
  @observable tab = tabs.students;
  @observable sortType;
  @observable sortingField;
  @observable search = '';
  @observable modal;

  constructor(p) {
    super(p);
    this.dbViewStore = new DBViewStore(this.props.userStore.user.uid);
    this.dbViewStore.init();
  }

  @computed
  get isStudentsTab() {
    return this.tab === tabs.students;
  }

  @computed
  get currentRows() {
    const realdb = this.dbViewStore.db[
      this.isStudentsTab ? 'students' : 'groups'
    ];
    if (!realdb) {
      return realdb;
    }

    let rows = [...realdb];
    if (this.search) {
      rows = rows.filter((obj) =>
        Object.values(obj)
          .map((val) => String(val).toLowerCase())
          .some((val) => val.includes(this.search.toLowerCase()))
      );
    }
    if (this.sortType) {
      rows = rows.sort((a, b) => {
        return a[this.sortingField].localeCompare(b[this.sortingField]);
      });
      if (this.sortType === 'desc') {
        return rows.reverse();
      }
      return rows;
    }
    return rows;
  }

  @computed
  get tableColumns() {
    if (this.isStudentsTab) {
      return [
        {
          id: 'key',
          label: 'Key',
        },
        {
          id: 'name',
          label: 'Name',
        },
        {
          id: 'groupId',
          label: 'Group Id',
        },
      ];
    }

    return [
      {
        id: 'key',
        label: 'Key',
      },
      {
        id: 'name',
        label: 'Name',
      },
    ];
  }

  componentWillUnmount() {
    this.dbViewStore.destructor();
  }

  onTabChange = (_, tab) => {
    this.sortType = undefined;
    this.sortingField = undefined;
    this.search = '';
    this.tab = tab;
  };

  onSortApply = (sortingField) => {
    this.sortType = this.sortType === 'desc' ? 'asc' : 'desc';
    this.sortingField = sortingField;
  };

  onToggleModal = (modal) => {
    this.modal = modal;
  };

  createReport = () => {
    const csvStringifier = createObjectCsvStringifier({
      header: this.isStudentsTab
        ? [
            { id: 'key', title: 'Key' },
            { id: 'name', title: 'Name' },
            { id: 'groupId', title: 'Group id' },
          ]
        : [
            { id: 'key', title: 'Key' },
            { id: 'name', title: 'Name' },
          ],
    });
    const csvContent =
      csvStringifier.getHeaderString() +
      csvStringifier.stringifyRecords(this.currentRows);
    const mimeType = 'text/csv;encoding:utf-8;';
    const blob = new Blob([csvContent], { type: mimeType });
    const objUrl = URL.createObjectURL(blob, { type: mimeType });
    const fileName = `${this.isStudentsTab ? 'Students' : 'Groups'} report ${Date.now()}.csv`
    const a = document.createElement('a')
    a.setAttribute('download', fileName)
    a.href = objUrl
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  };

  render() {
    const { classes } = this.props;
    if (!this.currentRows) return 'Loading..';

    return (
      <Provider dbViewStore={this.dbViewStore}>
        <div className={classes.root}>
          <Tabs value={this.tab} onChange={this.onTabChange}>
            <Tab label="Students" />
            <Tab label="Groups" />
          </Tabs>
          <div className={classes.controls}>
            <div className={classes.innerConrols}>
              <Button
                className={classes.btn}
                variant="outlined"
                onClick={() =>
                  this.onToggleModal(this.isStudentsTab ? 'students' : 'groups')
                }
              >
                Add
              </Button>
              <Button
                className={classes.btn}
                variant="outlined"
                onClick={this.createReport}
              >
                Report
              </Button>
            </div>
            <div>
              <Input
                placeholder="Search"
                type="search"
                value={this.search}
                onChange={(ev) => (this.search = ev.target.value)}
              />
            </div>
          </div>
          {!this.currentRows.length ? (
            <Typography>Nothing was found..</Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  {this.tableColumns.map((column) => (
                    <TableCell
                      key={column.id}
                      sortDirection={
                        this.sortingField === column.id ? this.sortType : false
                      }
                    >
                      <TableSortLabel
                        active={this.sortingField === column.id}
                        direction={
                          this.sortingField === column.id
                            ? this.sortType
                            : 'asc'
                        }
                        onClick={() => this.onSortApply(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.currentRows.map((row) => (
                  <TableRow key={row.key}>
                    {this.tableColumns.map((column) => (
                      <TableCell key={column.id}>{row[column.id]}</TableCell>
                    ))}
                    <TableCell>
                      <Button
                        onClick={() => {
                          if (this.isStudentsTab) {
                            this.dbViewStore.deleteStudent(row.key);
                          }
                          this.dbViewStore.deleteGroup(row.key);
                        }}
                        variant="outlined"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <Modal open={!!this.modal} onClose={() => this.onToggleModal()}>
            <div className={classes.modalRoot}>
              <Card className={classes.modalInner}>
                {this.modal === 'students' ? (
                  <StudentAddModal onClose={() => this.onToggleModal()} />
                ) : (
                  <GroupAddModal onClose={() => this.onToggleModal()} />
                )}
              </Card>
            </div>
          </Modal>
        </div>
      </Provider>
    );
  }
}

export { DBView };
