import { CometChat } from '@cometchat-pro/chat'
import { sendMessage, getMessages } from '../cometChat'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'

const Chat = () => {
  const { receiverID } = useParams()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const handleSendMsg = (e) => {
    e.preventDefault()
    sendMessage(receiverID, message).then((msg) => {
      setMessages((prevState) => [...prevState, msg])
      setMessage('')
      scrollToEnd()
    })
  }

  const handleGetMessages = () => {
    getMessages(receiverID).then((msgs) => {
      setMessages(msgs)
      scrollToEnd()
    })
  }

  const listenForMessage = (listenerID) => {
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: (message) => {
          setMessages((prevState) => [...prevState, message])
          scrollToEnd()
        },
      })
    )
  }

  const scrollToEnd = () => {
    const elmnt = document.getElementById('messages-container')
    elmnt.scrollTop = elmnt.scrollHeight
  }

  useEffect(() => {
    handleGetMessages()
    listenForMessage(receiverID)
  }, [receiverID])

  return (
    <div className="chat">
      <Header />
      <div className="flex justify-center items-center p-10">
        <div className="relative mx-auto w-full">
          <div className="border-0 rounded-lg relative flex flex-col w-full">
            <div className="flex items-start justify-between p-5">
              <h3 className="text-md font-semibold">Chat</h3>
            </div>

            <div
              id="messages-container"
              className="relative p-6 flex-auto h-64 overflow-y-scroll"
              style={{ height: '20rem' }}
            >
              <div className="flex flex-col justify-center items-center">
                {messages.map((msg, i) =>
                  msg?.receiverId?.toLowerCase() != receiverID.toLowerCase() ? (
                    <div
                      key={i}
                      className="flex flex-col justify-center items-start w-full mb-4"
                    >
                      <div className="rounded-lg p-2 bg-green-100">
                        <p>{msg.text}</p>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={i}
                      className="flex flex-col justify-center items-end w-full mb-4"
                    >
                      <div className="rounded-lg p-2 bg-gray-100">
                        <p>{msg.text}</p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <form
              onSubmit={handleSendMsg}
              className="flex flex-row justify-center items-center mt-4 py-4"
            >
              <input
                type="text"
                placeholder="Type Message..."
                className="px-3 py-8 placeholder-blueGray-300 text-blueGray-600 relative 
                            bg-green-100 rounded text-sm border border-blueGray-300 
                            outline-none focus:outline-none focus:ring w-full flex-1 border-0"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
