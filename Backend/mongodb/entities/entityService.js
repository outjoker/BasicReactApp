const eventEntity = require('./entity');



const createEvent = async (requestBody) => {
  console.info(`------------Creating Record-------------`);
  try {
      const event = eventEntity.createModelForEvent();
      const eventObject = new event({ id: requestBody.email, data: requestBody });
      let eventDocument = await findDbRecordByEmail(requestBody.email)
      if (eventDocument.length === 0) {
          console.log('document not present in the DB')
          const data = await eventObject.save({ runValidators: true })
          console.info(data);
          return data;
      } else {
          console.warn('document is already present in the DB '+JSON.stringify(eventDocument))
          return 'ok';
      }

  }
  catch (ex) {
      console.error(ex);
      throw ex.message;
  }
}

const findDbRecordByEmail = async (email) => {
  /*
  this function is to get the document based on the query
  */
 console.log("------------------getting record detail -----------------------------")
  console.info('inside findDbRecordByEmail function');
  const query = { 'id': email }
  console.log('the query is ' + JSON.stringify(query))
  const eventObject = eventEntity.createModelForEvent();
  return new Promise((resolve, reject) => {
      eventObject.find(query, function (err, queryOutput) {
          if (err) {
              console.error(err);
              return reject(err.message)
          }
          console.log('the document returned is '+JSON.stringify(queryOutput));
          return resolve(queryOutput)
      })
  })
}

module.exports.createEvent = createEvent;
module.exports.findDbRecordByEmail = findDbRecordByEmail;