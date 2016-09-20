import { normalize, Schema, arrayOf } from 'normalizr';

const citySchema = new Schema('cities');
const tagSchema = new Schema('tags');
const eventsSchema = new Schema('list');
const itemSchema = new Schema('item');
eventsSchema.define({
	city: citySchema,
	tags: arrayOf(tagSchema),
});

itemSchema.define({
	tags: arrayOf(tagSchema),
});


const INITIAL_STATE = {
	list: null,
	item: null,
	cities: null,
	tags: null,
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'LOAD_EVENTS': {
			const events = normalize(action.payload.data, arrayOf(eventsSchema));

			return {
				...state,
				list: events.entities.list,
				cities: events.entities.cities,
				tags: events.entities.tags,
			};
		}

		case 'LOAD_EVENT': {
			const event = normalize(action.payload.data, itemSchema);

			return {
				...state,
				item: event.entities.item[event.result],
				eventTags: event.entities.tags,
			};
		}

		default: {
			return state;
		}
	}
}
