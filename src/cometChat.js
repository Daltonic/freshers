import { CometChat } from '@cometchat-pro/chat'

const CONSTANTS = {
  APP_ID: '2054917edda37b00',
  REGION: 'us',
  Auth_Key: '04034e9e043d6b14516d3c39fa64a8b19f794fb8',
}

const initCometChat = async () => {
  try {
    const appID = CONSTANTS.APP_ID
    const region = CONSTANTS.REGION

    const appSetting = await new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .build()

    await CometChat.init(appID, appSetting).then(() =>
      console.log('Initialization completed successfully')
    )
  } catch (error) {
    console.log(error)
  }
}

const loginWithCometChat = async (UID) => {
  try {
    const authKey = CONSTANTS.Auth_Key
    await CometChat.login(UID, authKey).then((user) =>
      console.log('Login Successful:', { user })
    )
  } catch (error) {
    console.log(error)
  }
}

const signInWithCometChat = async (UID, name) => {
  try {
    let authKey = CONSTANTS.Auth_Key
    const user = new CometChat.User(UID)
    user.setName(name)

    await CometChat.createUser(user, authKey).then((user) =>
      console.log('user created', user)
    )
  } catch (error) {
    console.log(error)
  }
}

const logOutWithCometChat = async () => {
  try {
    await CometChat.logout().then(() => console.log('Logged Out Successfully'))
  } catch (error) {
    console.log(error)
  }
}

const getMessages = async (UID) => {
  try {
    const limit = 30
    const messagesRequest = await new CometChat.MessagesRequestBuilder()
      .setUID(UID)
      .setLimit(limit)
      .build()

    return await messagesRequest.fetchPrevious().then((messages) => messages)
  } catch (error) {
    console.log(error)
  }
}

const sendMessage = async (receiverID, messageText) => {
  try {
    const receiverType = CometChat.RECEIVER_TYPE.USER
    const textMessage = await new CometChat.TextMessage(
      receiverID,
      messageText,
      receiverType
    )

    return await CometChat.sendMessage(textMessage).then((message) => message)
  } catch (error) {
    console.log(error)
  }
}

const getConversations = async () => {
  try {
    const limit = 30
    const conversationsRequest = new CometChat.ConversationsRequestBuilder()
      .setLimit(limit)
      .build()

    return await conversationsRequest
      .fetchNext()
      .then((conversationList) => conversationList)
  } catch (error) {
    console.log(error)
  }
}

export {
  initCometChat,
  loginWithCometChat,
  signInWithCometChat,
  logOutWithCometChat,
  getMessages,
  sendMessage,
  getConversations,
}
