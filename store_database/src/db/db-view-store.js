import { appdb } from '../api/firebase';
import { observable } from 'mobx';

export class DBViewStore {
  @observable userUid;
  @observable db = {};

  constructor(userUid) {
    this.userUid = userUid;
  }

  destructor = () => {
    appdb.ref(`users/${this.userUid}`).off('value', this.onChangeListener);
  };

  init = () => {
    appdb.ref(`users/${this.userUid}`).on('value', this.onChangeListener);
  };

  onChangeListener = (snap) => {
    const val = snap.val();
    const plainStudents = (val && val.students) || {};
    const plainGroups = (val && val.groups) || [];
    this.db = {
      students: this.dbObjToArray(plainStudents),
      groups: this.dbObjToArray(plainGroups),
    };
  };

  dbObjToArray = (records) => {
    return Object.entries(records).map(([key, val]) => ({ key, ...val }));
  };

  addStudent = async (student) => {
    await appdb.ref(`users/${this.userUid}/students`).push(student)
  };

  addGroup = async (group) => {
    await appdb.ref(`users/${this.userUid}/groups`).push(group)
  };

  deleteStudent = async (key) => {
    await appdb.ref(`users/${this.userUid}/students/${key}`).set(null)
  }

  deleteGroup = async (key) => {
    await appdb.ref(`users/${this.userUid}/groups/${key}`).set(null)
  }
}
