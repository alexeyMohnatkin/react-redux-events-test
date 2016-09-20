import React from 'react';
import { Route, IndexRoute } from 'react-router';

import events from './events';
import App from './app';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={events.components.EventsList} />
		<Route path="events/:id" component={events.components.EventDetail} />
	</Route>
);
