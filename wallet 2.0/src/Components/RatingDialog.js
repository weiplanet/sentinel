import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, Button, DialogTitle } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Rating } from 'material-ui-rating';
import { rateVPNSession } from './../Actions/vpnlist.action';
import { MuiThemeProvider } from 'material-ui/styles';

class RatingDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rateValue: 2
        }
    }

    handleCancel = () => {
        this.props.onClose();
    };

    handleOk = () => {
        rateVPNSession(this.state.rateValue, (err) => {
            if (err) {
                this.props.onClose();
                this.props.snackOpenDialog(err.message);
            } else {
                this.props.onClose();
                this.props.snackOpenDialog('Rated Successfully');
            }
        })
    };

    render() {
        const { ...other } = this.props;
        return (
            <MuiThemeProvider>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    maxWidth="xs"
                    aria-labelledby="confirmation-dialog-title"
                    {...other}
                >
                    <DialogTitle id="confirmation-dialog-title">Rate this session</DialogTitle>
                    <DialogContent>
                        <Rating
                            value={this.state.rateValue}
                            max={5}
                            onChange={(value) => { this.setState({ rateValue: value }) }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCancel} color="primary">
                            Cancel
                </Button>
                        <Button onClick={this.handleOk} color="primary">
                            Submit
                </Button>
                    </DialogActions>
                </Dialog>
            </MuiThemeProvider>
        );
    }
}

RatingDialog.propTypes = {
    onClose: PropTypes.func,
    snackOpenDialog: PropTypes.func
};

function mapStateToProps(state) {
    return {
        lang: state.setLanguage
    }
}

function mapDispatchToActions(dispatch) {
    return bindActionCreators({
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToActions)(RatingDialog);