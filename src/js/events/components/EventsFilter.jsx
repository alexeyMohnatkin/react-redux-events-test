import React, { Component } from 'react';
import { connect } from 'react-redux';

import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import CircularProgress from 'material-ui/CircularProgress';

import { loadEvents } from '../actions';

export class EventsFilter extends Component {

	static propTypes = {
		cities: React.PropTypes.shape(
			React.PropTypes.shape({
				id: React.PropTypes.number,
				name: React.PropTypes.string,
			}).isRequired
		),
		tags: React.PropTypes.shape(
			React.PropTypes.shape({
				id: React.PropTypes.number,
				title: React.PropTypes.string,
			}).isRequired
		),
		loadEvents: React.PropTypes.func,
	}

	constructor(props) {
		super(props);

		this.state = {
			city: null,
			dateStart: null,
			timeStart: null,
			dateTimeStart: null,
			dateEnd: null,
			timeEnd: null,
			dateTimeEnd: null,
			tags: [],
		};
	}


	onCityChange(city) {
		this.setState({ city: city.value });
	}
	onDateStartChange(event, dateTime) {
		const time = this.state.timeStart;
		if (!time) {
			this.setState({ dateTimeStart: dateTime.toString() });
		} else {
			this.setState({
				dateTimeStart: new Date(
					dateTime.getFullYear(),
					dateTime.getMonth(),
					dateTime.getDate() - 1,
					time.getHours(),
					time.getMinutes()
				).toString(),
			});
		}
		this.setState({ dateStart: dateTime });
	}
	onTimeStartChange(event, dateTime) {
		const date = this.state.dateStart;
		if (!date) {
			this.setState({ dateTimeStart: dateTime.toString() });
		} else {
			this.setState({
				dateTimeStart: new Date(
					date.getFullYear(),
					date.getMonth(),
					date.getDate() - 1,
					dateTime.getHours(),
					dateTime.getMinutes()
				).toString(),
			});
		}
		this.setState({ timeStart: dateTime });
	}
	onDateEndChange(event, dateTime) {
		const time = this.state.timeEnd;
		if (!time) {
			this.setState({ dateTimeEnd: dateTime.toString() });
		} else {
			this.setState({
				dateTimeEnd: new Date(
					dateTime.getFullYear(),
					dateTime.getMonth(),
					dateTime.getDate() - 1,
					time.getHours(),
					time.getMinutes()
				).toString(),
			});
		}
		this.setState({ dateEnd: dateTime });
	}
	onTimeEndChange(event, dateTime) {
		const date = this.state.dateEnd;
		if (!date) {
			this.setState({ dateTimeEnd: dateTime.toString() });
		} else {
			this.setState({
				dateTimeEnd: new Date(
					date.getFullYear(),
					date.getMonth(),
					date.getDate() - 1,
					dateTime.getHours(),
					dateTime.getMinutes()
				).toString(),
			});
		}
		this.setState({ timeEnd: dateTime });
	}


	setTag(event) {
		let tags = this.state.tags;
		const id = event.target.value;
		const selected = tags.indexOf(id) !== -1;
		if (!selected) {
			tags = [...tags, id];
		} else {
			tags.splice(tags.indexOf(id), 1);
		}

		this.setState({ tags });
	}

	sendFilter() {
		this.props.loadEvents({
			city: this.state.city,
			dateStart: this.state.dateTimeStart,
			dateEnd: this.state.dateTimeEnd,
			tags: this.state.tags,
		});
	}

	renderTagsList() {
		const tags = this.props.tags;
		return Object.keys(tags).map((id) => {
			return (
				<ListItem
					key={id}
					primaryText={tags[id].title}
					leftCheckbox={
						<Checkbox
							value={id}
							checked={this.state.tags.indexOf(id) !== -1}
							onClick={::this.setTag}
						/>
					}
				/>
			);
		});
	}

	render() {
		const { cities, tags } = this.props;
		if (!cities || !tags) {
			return <CircularProgress />;
		}

		const dataSource = Object.keys(cities).map((key) => {
			return {
				value: key,
				text: cities[key].name,
			};
		});

		return (
			<div className="filter">
				<AutoComplete
					onNewRequest={::this.onCityChange}
					hintText="Type here"
					dataSource={dataSource}
					floatingLabelText="City"
					openOnFocus
					filter={AutoComplete.fuzzyFilter}
					fullWidth
				/>
				<Subheader>Tags</Subheader>

				<List className="tags-list">
					{this.renderTagsList()}
				</List>

				<DatePicker
					floatingLabelText="Date start"
					value={this.state.dateStart}
					onChange={::this.onDateStartChange}
					autoOk
				/>
				<TimePicker
					floatingLabelText="Time start"
					value={this.state.timeStart}
					onChange={::this.onTimeStartChange}
					autoOk
				/>

				<DatePicker
					floatingLabelText="Date end"
					value={this.state.dateEnd}
					onChange={::this.onDateEndChange}
					autoOk
				/>
				<TimePicker
					floatingLabelText="Time end"
					value={this.state.timeEnd}
					onChange={::this.onTimeEndChange}
					autoOk
				/>
				<br />
				<RaisedButton label="Filter" primary onTouchTap={::this.sendFilter} />
				<br />
				<br />
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		cities: state.events.cities,
		tags: state.events.tags,
	};
}

export default connect(mapStateToProps, { loadEvents })(EventsFilter);
