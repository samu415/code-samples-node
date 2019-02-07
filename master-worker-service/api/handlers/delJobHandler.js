module.exports = function (request, h) {
  console.log(
    `Incoming job delete request for job ${request.params.id}`
  );
  return `Deleted Job ${request.params.id}.`;
}