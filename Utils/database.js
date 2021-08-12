import mongoose from 'mongoose';


const connected = {};

async function connect() {
   if(connected.isConnected) {
     console.log('already connected');
     return;
   }
  if(mongoose.connections.length > 0) {
  connected.isConnected = mongoose.connections[0].readyState;
  if(connected.isConnected === 1) {
    console.log('use previous connection');
    return;
  }
    await mongoose.disconnect();
  }
  const database = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log('new connection');
  connected.isConnected = database.connections[0].readyState;
}

async function disconnect() {
  if(connected.isConnected) {
    if(process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connected.isConnected = false;
    } else {
      console.log('not disconnected');
    }
  }
}

function convertDocToObj(doc) {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();
  return doc;
}

const database = { connect, disconnect, convertDocToObj};
export default database;
//module.exports(database);
//module.exports = database;