const formatMongodbTimestamp = (timestamp) => new Date(timestamp).toDateString()

export {
  formatMongodbTimestamp
}
