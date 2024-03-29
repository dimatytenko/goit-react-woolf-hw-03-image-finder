import React, { Component } from 'react';

import styles from './styles.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { Modal } from 'components/Modal';

export class ImageGallery extends Component {
  state = {
    showModal: false,
    srcModal: '',
    altModal: '',
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  openModalByClick = (src, alt) => {
    this.setState({
      srcModal: src,
      altModal: alt,
    });
    this.toggleModal();
  };
  render() {
    const { showModal } = this.state;
    const { photos } = this.props;
    return (
      <div>
        <ul className={styles.gallery}>
          {photos.map(({ id, webformatURL, tags, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              alt={tags}
              onClick={() => {
                this.openModalByClick(largeImageURL, tags);
              }}
            />
          ))}
        </ul>
        {showModal && (
          <Modal infoModal={this.state} onClose={this.toggleModal} />
        )}
      </div>
    );
  }
}
