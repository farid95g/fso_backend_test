const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('CONNECTING TO', url)

mongoose.connect(url)
    .then(() => {
        console.log('CONNECTED TO MONGODB')
    })
    .catch(error => {
        console.log('ERROR IN CONNECTION TO MONGODB:', error.message)
    })

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true
    },
    important: Boolean
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)