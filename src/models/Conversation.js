const { model, Schema } = require('mongoose')

const conversationSchema = new Schema({
    group: Boolean,
    name: String,
    users: [Schema.Types.ObjectId],
    messages: [{
        data: String,
    }]
})

module.exports = model('Conversation', conversationSchema)