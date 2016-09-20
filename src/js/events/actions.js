import axios from 'axios';

const URL = '';


export function loadEvents(params = null) {
	const url = `${URL}/events.json`;
	const request = axios.get(url, { params });

	return {
		type: 'LOAD_EVENTS',
		payload: request,
	};
}

export function loadEvent(id) {
	const url = `${URL}/event.json`;
	const request = axios.get(url);

	return {
		type: 'LOAD_EVENT',
		payload: request,
	};
}
export function loadCities() {
	const url = `${URL}/cities.json`;
	const request = axios.get(url);

	return {
		type: 'LOAD_CITIES',
		payload: request,
	};
}
