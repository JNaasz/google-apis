const BASE_SERVER_URL = 'http://localhost:2000'; // local server
// const BASE_SERVER_URL = 'http://192.168.69.174:2000/'; // remote server

const endpoints = {
		sheets: `${BASE_SERVER_URL}/sheet-data`,
		calendar: `${BASE_SERVER_URL}/calendar-events`,
}

export default endpoints;