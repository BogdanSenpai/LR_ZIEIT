import { observable } from 'mobx';
import firebase from 'firebase';

export class UserStore {
  @observable user;
  @observable isUserLoading = true;

  constructor() {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = (user) => {
    this.user = user && {
      email: user.email,
      uid: user.uid,
    };
    this.isUserLoading = false;
  };

  signIn = async (email, pass) => {
    const res = await firebase.auth().signInWithEmailAndPassword(email, pass);
    this.user = {
      email: res.user.email,
      uid: res.user.uid,
    };
  };

  logOut = async () => {
    await firebase.auth().signOut();
  };

  createNewUser = async (email, pass) =>{
    await firebase.auth().createUserWithEmailAndPassword(email, pass)
  }
}
