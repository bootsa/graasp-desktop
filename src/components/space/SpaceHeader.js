import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar/AppBar';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { withStyles } from '@material-ui/core';
import Styles from '../../Styles';
import { deleteSpace, exportSpace, saveSpace } from '../../actions/space';

class SpaceHeader extends Component {
  static propTypes = {
    space: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    classes: PropTypes.shape({ appBar: PropTypes.string.isRequired })
      .isRequired,
    openDrawer: PropTypes.bool.isRequired,
    handleDrawerOpen: PropTypes.func.isRequired,
    dispatchExportSpace: PropTypes.func.isRequired,
    dispatchDeleteSpace: PropTypes.func.isRequired,
    dispatchSaveSpace: PropTypes.func.isRequired,
  };

  handleExport = () => {
    const { space, dispatchExportSpace } = this.props;
    const { id, name } = space;
    dispatchExportSpace(id, name);
  };

  handleDelete = () => {
    const {
      space: { id },
      dispatchDeleteSpace,
    } = this.props;
    dispatchDeleteSpace({ id });
  };

  handleSave = () => {
    const { space, dispatchSaveSpace } = this.props;
    dispatchSaveSpace({ space });
  };

  renderSaveButton() {
    const { space, classes } = this.props;
    const { saved, offlineSupport } = space;
    if (!saved && offlineSupport) {
      return (
        <IconButton
          className={classes.button}
          color="inherit"
          onClick={this.handleSave}
        >
          <SaveIcon />
        </IconButton>
      );
    }
    return null;
  }

  renderExportButton() {
    const { space, classes } = this.props;
    const { saved } = space;
    if (saved) {
      return (
        <IconButton
          color="inherit"
          onClick={this.handleExport}
          className={classes.button}
        >
          <UnarchiveIcon className={classes.rightIcon} />
        </IconButton>
      );
    }
    return null;
  }

  renderDeleteButton() {
    const { space, classes } = this.props;
    const { saved } = space;
    if (saved) {
      return (
        <IconButton
          color="inherit"
          onClick={this.handleDelete}
          className={classes.button}
        >
          <DeleteIcon className={classes.rightIcon} />
        </IconButton>
      );
    }
    return null;
  }

  render() {
    const {
      openDrawer,
      classes,
      space: { name },
      handleDrawerOpen,
    } = this.props;
    return (
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}
      >
        <Toolbar disableGutters={!openDrawer}>
          <IconButton
            color="inherit"
            aria-label="Open Drawer"
            onClick={handleDrawerOpen}
            className={classNames(
              classes.menuButton,
              openDrawer && classes.hide
            )}
          >
            <MenuIcon />
          </IconButton>
          {name}
          <span style={{ position: 'absolute', right: 20 }}>
            {this.renderDeleteButton()}
            {this.renderExportButton()}
            {this.renderSaveButton()}
          </span>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = ({ Space }) => ({
  space: Space.get('current')
    .get('content')
    .toJS(),
});

const mapDispatchToProps = {
  dispatchExportSpace: exportSpace,
  dispatchDeleteSpace: deleteSpace,
  dispatchSaveSpace: saveSpace,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpaceHeader);

const StyledComponent = withStyles(Styles, { withTheme: true })(
  ConnectedComponent
);

export default StyledComponent;
