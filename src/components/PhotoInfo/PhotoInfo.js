import React, { Component } from 'react';

import { fetchPhotos } from 'API/photos-api';
import { ImageGallery } from 'components/ImageGallery';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import styles from './styles.module.css';
import { FETCH_STATUS } from 'constants/common';

import scroll from 'react-scroll';
const scrollToBottom = scroll.animateScroll.scrollToBottom;

export class PhotoInfo extends Component {
  state = {
    photos: [],
    page: 1,
    status: FETCH_STATUS.idle,
    error: null,
    isShowButton: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevValue = prevProps.value;
    const nextValue = this.props.value;
    const nextPage = this.state.page;

    if (prevValue !== nextValue) {
      this.setState({ status: FETCH_STATUS.pending });

      this.updateState();
      this.requestPhotos(nextValue, nextPage);
      scrollToBottom();
    }

    if (prevState.page !== nextPage) {
      this.requestPhotos(nextValue, nextPage);
      scrollToBottom();
    }
  }

  requestPhotos = async (value, page) => {
    try {
      const photos = await fetchPhotos(value, page);
      console.log('photos', photos);
      if (photos.hits.length === 0) {
        throw new Error(`${value} nothing to display`);
      }
      this.setState(prevState => ({
        photos: [...prevState.photos, ...photos.hits],
        status: FETCH_STATUS.resolved,
        isShowButton: photos.hits.length === 12,
      }));
    } catch (error) {
      console.log('error', error);
      this.setState({ error, status: FETCH_STATUS.rejected });
    }
  };

  updateState = () => {
    this.setState({ photos: [], page: 1 });
  };

  handleButtonClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { photos, status, error, isShowButton } = this.state;

    if (status === FETCH_STATUS.idle) {
      return (
        <div className={styles.wrapper}>
          The search result will be displayed here...
        </div>
      );
    }

    if (status === FETCH_STATUS.pending) {
      return (
        <div className={styles.wrapper}>
          <Loader />
        </div>
      );
    }
    if (status === FETCH_STATUS.rejected) {
      return <div className={styles.wrapper}>{error.message}</div>;
    }

    if (status === FETCH_STATUS.resolved) {
      return (
        <>
          <ImageGallery photos={photos} />
          <div className={styles.button}>
            {isShowButton > 0 && (
              <Button
                onClick={this.handleButtonClick}
                isLoading={status === FETCH_STATUS.pending}
              />
            )}
          </div>
        </>
      );
    }
  }
}
