import database from "./database";

const getError = (err) =>
err.response && err.response.data && err.response.data.message
    ? err.response.data.message
    : err.message;

    const onError = async (e, req, res, next) => {
      await database.disconnect();
      res.status(500).send({ message: e.toString()});
    }
    export {getError, onError};