import React, { Component } from 'react';
import { connect } from 'react-redux';

import CircularProgress from 'material-ui/CircularProgress';
import Chip from 'material-ui/Chip';

const styles = {
	chip: {
		margin: 4,
	},
	wrapper: {
		display: 'flex',
		flexWrap: 'wrap',
	},
};

export class EventTags extends Component {

	static propTypes = {
		tags: React.PropTypes.shape(
			React.PropTypes.shape({
				id: React.PropTypes.number,
				title: React.PropTypes.string,
			}).isRequired
		),
	}

	props: {
		tags: null,
		itemTags: null
	}

	renderList() {
		const itemTags = this.props.itemTags;
		const tags = this.props.tags;
		return itemTags.map((id) => {
			return (
				<Chip style={styles.chip} key={id}>{ tags[id].title }</Chip>
			);
		});
	}

	render() {
		const { tags } = this.props;

		if (!tags) {
			return <CircularProgress />;
		}
		return (
			<div style={styles.wrapper}>{this.renderList()}</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		tags: state.events.tags,
	};
}

export default connect(mapStateToProps)(EventTags);
