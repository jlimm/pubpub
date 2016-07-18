import React, {PropTypes} from 'react';
import Radium from 'radium';
import AtomEditorDetails from './AtomEditorDetails';
import AtomEditorSaveVersion from './AtomEditorSaveVersion';

let styles = {};

export const AtomEditorModals = React.createClass({
	propTypes: {
		atomEditData: PropTypes.object,
		mode: PropTypes.string,
		isLoading: PropTypes.bool,
		closeModalHandler: PropTypes.func,
		handleVersionSave: PropTypes.func,
		updateDetailsHandler: PropTypes.func,
	},

	componentDidMount() {
		document.addEventListener('keydown', this.closeOnEscape);
	},
	componentWillUnmount() {
		document.removeEventListener('keydown', this.closeOnEscape);
	},

	closeOnEscape: function(evt) {
		let isEscape = false;
		if ('key' in evt) { 
			isEscape = evt.key === 'Escape';
		} else { 
			isEscape = evt.keyCode === 27; 
		}

		if (isEscape) {
			this.props.closeModalHandler();
		}
	},

	render: function() {
		return (
			<div style={[styles.container, this.props.mode && styles.containerActive]}>
				<div style={styles.splash} onClick={this.props.closeModalHandler}></div>
				<div style={[styles.modalContent, this.props.mode && styles.modalContentActive]}>
					{(()=>{
						switch (this.props.mode) {
						case 'saveVersion':
							return <AtomEditorSaveVersion handleVersionSave={this.props.handleVersionSave} isLoading={this.props.isLoading}/>;
						case 'details':
							return <AtomEditorDetails atomEditData={this.props.atomEditData} updateDetailsHandler={this.props.updateDetailsHandler} isLoading={this.props.isLoading}/>;
						default:
							return null;
						}
					})()}
				</div>
			</div>
		);
	}
});

export default Radium(AtomEditorModals);

styles = {
	container: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100vw',
		height: '100vh',
		backgroundColor: 'rgba(0,0,0,0.6)',
		zIndex: 2,
		opacity: 0,
		pointerEvents: 'none',
		transition: '.1s linear opacity',
		
	},
	containerActive: {
		opacity: 1,
		pointerEvents: 'auto',
	},
	splash: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100vw',
		height: '100vh',
		zIndex: 3,
	},
	modalContent: {
		position: 'fixed',
		zIndex: 4,
		padding: '2em',
		width: 'calc(80vw - 4em)',
		maxHeight: 'calc(70vh - 4em)',
		top: '15vh',
		left: '10vw',
		backgroundColor: 'white',
		overflow: 'hidden',
		overflowY: 'scroll',
		boxShadow: '0px 0px 3px rgba(0,0,0,0.7)',
		transform: 'scale(0.8)',
		transition: '.1s ease-in-out transform',
		borderRadius: '2px',
		'@media screen and (min-resolution: 3dppx), screen and (max-width: 767px)': {
			width: 'calc(98vw - 2em)',
			height: 'calc(98vh - 2em)',
			top: '1vh',
			left: '1vw',
			padding: '1em',
		},
	},
	modalContentActive: {
		transform: 'scale(1.0)',
	},
};
