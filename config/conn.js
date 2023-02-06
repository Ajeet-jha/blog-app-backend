import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
const {
    MONGO_DB_USER_NAME,
    MONGO_DB_USER_PASSWORD,
    MONGO_DB_CLUSTER,
    MONGO_DB_NAME
} = process.env;
console.log({
    MONGO_DB_USER_NAME,
    MONGO_DB_USER_PASSWORD,
    MONGO_DB_CLUSTER,
    MONGO_DB_NAME
});
const URI = `mongodb+srv://${MONGO_DB_USER_NAME}:${MONGO_DB_USER_PASSWORD}@${MONGO_DB_CLUSTER}.xspdxt5.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;

export const dbConnection = () => {
    mongoose.set('strictQuery', true)
    mongoose
        .connect(URI, { useNewUrlParser: true })
        .then(console.log("Mongo connected"))
        .catch(error => console.log(error.message))

}
