module.exports = function (request, h) {
  console.log(`Incoming job request. Payload:`);
  console.log(request.payload);
  return 'Added Job.';
}