const User = require('../models/User')
const Conversation = require('../models/Conversation')

const resolvers = {
    Query: {
        users(parent, args) {
            return User.find({})
        }
    },
    // Mutation:{
    //     createMessage:(parent,args)=>{
    //         pubsub.publish('MESSAGE_CREATED', { postAdded: args });
    //         check this is remaining
    //         retrieve from database based on name  of conversation and then append the current message to message variable of converstaion object then updateOne
    //         return message.save()
    //     }
    // },
    // Subscription:{
    //     messageCreated:{
    //         // subscribe:()=>pubsub.asyncIterator(['MESSAGE_CREATED'])
    //     }
    // }
};

module.exports = resolvers