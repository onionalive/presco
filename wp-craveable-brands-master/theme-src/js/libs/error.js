export const errorHandler = (err) => {
	console.log('An error occurred.');
	console.log(err);
	console.log(err.response);
};