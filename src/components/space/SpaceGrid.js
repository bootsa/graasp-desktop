import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Set } from 'immutable';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import Button from '@material-ui/core/Button/Button';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router';
import Typography from '@material-ui/core/Typography/Typography';
import Grid from '@material-ui/core/Grid/Grid';
import MediaCard from '../common/MediaCard';
import { clearSpace } from '../../actions';
import DefaultThumbnail from '../../data/graasp.jpg';

class SpaceGrid extends Component {
  static styles = {
    leftIcon: {
      marginRight: '0.5rem',
    },
  };

  static propTypes = {
    folder: PropTypes.string.isRequired,
    classes: PropTypes.shape({
      leftIcon: PropTypes.string.isRequired,
    }).isRequired,
    spaces: PropTypes.instanceOf(Set).isRequired,
    history: PropTypes.shape({ length: PropTypes.number.isRequired })
      .isRequired,
    dispatchClearSpace: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { dispatchClearSpace } = this.props;
    dispatchClearSpace();
  }

  // show the local background image if exists, otherwise fetch
  // the image from url if provided if not provided then pass
  // the default background image
  generateThumbnail = ({ image }) => {
    const { folder } = this.props;
    const {
      backgroundUrl,
      thumbnailUrl,
      backgroundAsset,
      thumbnailAsset,
    } = image;

    // prioritise assets
    if (thumbnailAsset) {
      return `file://${folder}/${thumbnailAsset}`;
    }
    if (backgroundAsset) {
      return `file://${folder}/${backgroundAsset}`;
    }

    // fallback on urls
    if (thumbnailUrl) {
      return thumbnailUrl;
    }
    if (backgroundUrl) {
      return backgroundUrl;
    }

    // if nothing present return default image
    return DefaultThumbnail;
  };

  render() {
    const { spaces, classes, history } = this.props;

    const MediaCards = spaces.map(space => {
      const { id, name, image = {}, text } = space;
      const { replace } = history;
      const ViewButton = (
        <Button
          variant="contained"
          size="large"
          color="primary"
          id={Number(id)}
          onClick={() => replace(`/space/${id}`)}
        >
          <RemoveRedEyeIcon className={classes.leftIcon} />
          View
        </Button>
      );
      return (
        <Grid key={id} item>
          <MediaCard
            key={id}
            name={name}
            image={this.generateThumbnail({ image })}
            text={text}
            button={ViewButton}
          />
        </Grid>
      );
    });
    if (MediaCards.length === 0) {
      return (
        <Typography variant="h5" color="inherit">
          No spaces available.
        </Typography>
      );
    }
    return (
      <Grid container spacing={16}>
        {MediaCards}
      </Grid>
    );
  }
}

const mapStateToProps = ({ User }) => ({
  folder: User.getIn(['current', 'folder']),
});

const mapDispatchToProps = {
  dispatchClearSpace: clearSpace,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpaceGrid);

export default withRouter(withStyles(SpaceGrid.styles)(ConnectedComponent));
