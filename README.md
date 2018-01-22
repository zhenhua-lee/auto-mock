## auto data mock

features:

- a method to mock data
- build a map from ajx url to js file
- support mock template
- support schema

usage

	//`opt.mockDir`: assign the palce to store the mock files
	var opt = { mockDir: 'test/mock' };
	var mock = require('auto-mock')(opt)
	var server = http.createServer((req, res) => {
		mock(req, res);
	});
	server.listen(3000, () => {
		console.log('server is on...');
	})
	// if localhost:3000/api/user, test/mock/api/user.js will be builded
	// it is quick to mock data

testing
	
	npm start

