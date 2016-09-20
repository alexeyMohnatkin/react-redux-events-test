import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { Row, Col } from 'react-flexbox-grid/lib';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import CircularProgress from 'material-ui/CircularProgress';

import { loadEvents } from '../actions';
import EventTags from './EventTags';
import EventsFilter from './EventsFilter';

class EventsList extends Component {

	static propTypes = {
		loadEvents: React.PropTypes.func,
		cities: React.PropTypes.shape(
			React.PropTypes.shape({
				id: React.PropTypes.number,
				name: React.PropTypes.string,
			}).isRequired
		),
		events: React.PropTypes.shape(
			React.PropTypes.shape({
				id: React.PropTypes.number,
				name: React.PropTypes.string,
				city: React.PropTypes.number,
				dateStart: React.PropTypes.string,
				dateEnd: React.PropTypes.string,
				desc: React.PropTypes.string,
				tags: React.PropTypes.shape,
			}).isRequired
		),
		tags: React.PropTypes.shape(
			React.PropTypes.shape({
				id: React.PropTypes.number,
				title: React.PropTypes.string,
			}).isRequired
		),
	}

	constructor(props) {
		super(props);
		this.state = { open: false };
	}

	componentWillMount() {
		this.props.loadEvents();
	}

	handleToggle = () => {
		this.setState({ open: !this.state.open });
	}

	renderItem(item) {
		const dateStart = (new Date(item.dateStart)).toLocaleString();
		const dateEnd = (new Date(item.dateStart)).toLocaleString();
		return (
			<Col xs={12} sm={6} md={4} key={item.id} className="events__item">
				<Card className="event-card">
					<CardHeader title={item.name} subtitle={this.props.cities[item.city].name} />
					<CardText className="event-card__text">
						{item.desc}
						<EventTags itemTags={item.tags} />
						<br />
						Start: {dateStart}<br />
						End: {dateEnd}
					</CardText>
					<CardActions>
						<Link to={`/events/${item.id}`}>
							<FlatButton label="View" primary />
						</Link>
					</CardActions>
				</Card>
			</Col>
		);
	}
	renderList() {
		return Object.keys(this.props.events).map((id) => {
			return this.renderItem(this.props.events[id]);
		});
	}

	render() {
		const { cities, events, tags } = this.props;
		if (!cities || !events || !tags) {
			return <CircularProgress />;
		}
		return (
			<div>
				<IconButton
					onTouchTap={this.handleToggle}
					tooltip="Filter"
				>
					<ContentFilter />
				</IconButton>
				<Drawer
					docked={false}
					width={320}
					open={this.state.open}
					onRequestChange={(open) => { this.setState({ open }); }}
				>
					<EventsFilter />
				</Drawer>
				<Row className="events">
					{this.renderList()}
				</Row>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		events: state.events.list,
		cities: state.events.cities,
		tags: state.events.tags,
	};
}

export default connect(mapStateToProps, { loadEvents })(EventsList);
