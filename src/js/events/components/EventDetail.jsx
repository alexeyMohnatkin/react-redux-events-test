import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import { loadEvent } from '../actions';
import EventTags from './EventTags';

class EventDetail extends Component {

	static propTypes = {
		id: React.PropTypes.number,
		loadCities: React.PropTypes.func,
		loadEvent: React.PropTypes.func,
		params: React.PropTypes.shape({
			id: React.PropTypes.string,
		}),
	}

	componentWillMount() {
		this.props.loadEvent(this.props.params.id);
	}

	props: {
		id: null,
		item: null,
		tags: null,
	}

	render() {
		const { item, tags } = this.props;
		if (!item || !tags) {
			return <CircularProgress />;
		}
		const dateStart = (new Date(item.dateStart)).toLocaleString();
		const dateEnd = (new Date(item.dateStart)).toLocaleString();
		return (
			<div>
				<Link to={"/"}>
					<RaisedButton label="Back" primary />
				</Link>
				<br />
				<br />
				<Card className="event__card">
					<CardHeader title={item.name} subtitle={item.city.name} />
					<CardText>
						{item.desc}
						<EventTags itemTags={item.tags} />
						<br />
						Start: {dateStart}<br />
						End: {dateEnd}
					</CardText>
				</Card>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		item: state.events.item,
		tags: state.events.eventTags,
	};
}

export default connect(mapStateToProps, { loadEvent })(EventDetail);
