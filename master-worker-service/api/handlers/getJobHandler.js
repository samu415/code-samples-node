module.exports = function (request, h) {
  console.log(
    `Incoming status request for job ${request.params.id}`
  )
  return `Job status for job ${request.params.id} is ...`;  
}