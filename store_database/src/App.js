import React from 'react';
import './api/firebase';
import { Provider } from 'mobx-react';
import { UserStore } from './db/user-store'
import { Root } from './root/root';

function App() {
  return (
    <Provider userStore={new UserStore()}>
      <Root />
    </Provider>
  );
}

export default App;
