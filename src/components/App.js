import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './styles.module.css';

import { Searchbar } from 'components/Searchbar';
import { PhotoInfo } from 'components/PhotoInfo';

export class App extends Component {
  state = {
    searchValue: '',
  };

  onSubmit = ({ inputValue }) => {
    this.setState({ searchValue: inputValue });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        <main>
          <div className={styles.container}>
            <PhotoInfo value={this.state.searchValue} />
          </div>
        </main>
        <ToastContainer />
      </>
    );
  }
}
