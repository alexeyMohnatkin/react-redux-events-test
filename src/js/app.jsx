import React from 'react';

import { Grid } from 'react-flexbox-grid';


const App = ({ children }) => {
	return (
		<Grid>
			{children}
		</Grid>
	);
};

App.propTypes = {
	children: React.PropTypes.node,
};

export default App;
