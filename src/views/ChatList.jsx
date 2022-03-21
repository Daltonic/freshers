import Header from '../components/Header'
import { getConversations } from '../cometChat'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'

const ChatList = () => {
  const [customers, setCustomers] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    getConversations().then((conversation) => {
      console.log(conversation)
      setCustomers(conversation)
      setLoaded(true)
    })
  }, [])

  return (
    <div className="chatList">
      <Header />
      <div className="flex justify-center items-center p-10">
        <div className="relative mx-auto w-full">
          <div className="border-0 rounded-lg relative flex flex-col w-full">
            <div className="flex items-start justify-between my-4">
              <h3 className="text-md font-semibold">Recent Chats</h3>
            </div>
            {loaded
              ? customers.map((customer, i) => (
                  <Conversation
                    key={i}
                    currentUser={auth.currentUser.uid.toLowerCase()}
                    owner={customer.lastMessage.receiverId.toLowerCase()}
                    conversation={customer.lastMessage}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  )
}

const Conversation = ({ conversation, currentUser, owner }) => {
  const possessor = (key) => {
    return currentUser == owner
      ? conversation.sender[key]
      : conversation.receiver[key]
  }

  const timeAgo = (date) => {
    let seconds = Math.floor((new Date() - date) / 1000)
    let interval = seconds / 31536000

    if (interval > 1) {
      return Math.floor(interval) + 'yr'
    }
    interval = seconds / 2592000
    if (interval > 1) {
      return Math.floor(interval) + 'mo'
    }
    interval = seconds / 86400
    if (interval > 1) {
      return Math.floor(interval) + 'd'
    }
    interval = seconds / 3600
    if (interval > 1) {
      return Math.floor(interval) + 'h'
    }
    interval = seconds / 60
    if (interval > 1) {
      return Math.floor(interval) + 'm'
    }
    return Math.floor(seconds) + 's'
  }

  return (
    <Link
      to={'/chat/' + possessor('uid')}
      className="flex flex-row justify-between items-center 
            mb-2 py-2 px-4 bg-gray-100 rounded-lg cursor-pointer"
    >
      <div className="">
        <h4 className="text-sm font-semibold">{possessor('name')}</h4>
        <p className="text-sm text-gray-500">{conversation.text}</p>
      </div>
      <span className="text-sm">
        {timeAgo(new Date(Number(conversation.sentAt) * 1000).getTime())}
      </span>
    </Link>
  )
}

export default ChatList
