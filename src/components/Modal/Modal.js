import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import styles from './styles.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { srcModal, altModal } = this.props.infoModal;

    return createPortal(
      <div className={styles.overlay} onClick={this.handleBackdropClick}>
        <div div className={styles.modal}>
          <img src={srcModal} alt={altModal} />
        </div>
      </div>,
      modalRoot
    );
  }
}
