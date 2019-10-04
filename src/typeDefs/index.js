const { gql } = require("apollo-server-express")

const typeDefs = gql`
type User{
    id:ID
    username: String
    password: String
    name: String
    phoneNo: Int
}
type Conversation {
    id:ID
    group: Boolean
    name: String
    users: [ID],
    messages: [MessageType]
}
type MessageType{
    data: String
}

type Query{
    users:[User]
    chat:Conversation
}

type Mutation{
    createGroup(group:Boolean,name:String,users:[ID]):Conversation
    createMessage(data:String,name:String):MessageType
}

type Subscription{
    messageCreated:MessageType
}

`;

module.exports = typeDefs