import React, {PropTypes} from 'react';
import Radium from 'radium';

export const AtomReaderAnalytics = React.createClass({
	propTypes: {
		atomData: PropTypes.object,
	},

	render: function() {

		return (
			<div className={'atom-reader-header'}>
				
				<h2>Analytics</h2>
				
			</div>
		);
	}
});

export default Radium(AtomReaderAnalytics);
