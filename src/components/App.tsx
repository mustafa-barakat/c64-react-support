import React, { useEffect } from 'react'
import useChatStore from '../store/chat.store'
type Props = {
  helpColor?: string
  mainColor?: string
  hoverColor?: string
  backgroundColor?: string
  API_KEY: string
  AccountName?: string
  AccountAgent?: string
}
const FAQ = ({ FAQS }: any) => {
  const [openIndex, setOpenIndex] = React.useState(-1)
  return (
    <div
      className='flex space-y-2 '
      style={{
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          color: '#ffffff',
        }}
      >
        We might be able to answer some of your questions
      </div>
      {FAQS.map((faq: any, index: any) => (
        <div
          key={index}
          onClick={() => setOpenIndex(openIndex == index ? -1 : index)}
          className=' flex-row space-y-2 text-white
          rounded-lg shadow-lg px-4 py-2
          '
          style={{
            cursor: 'pointer',
            width: '100%',
            fontWeight: 'bold',
            backgroundColor: '#063970',
          }}
        >
          {openIndex != index && '+'}
          {openIndex == index && '-'} {faq.question}
          {openIndex == index && (
            <div
              style={{
                fontWeight: 'normal',
              }}
              className=' text-white max-w-xs flex-wrap _fNSKM  break-all'
            >
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
const C64Chat = ({ API_KEY, AccountAgent, AccountName }: Props): React.JSX.Element => {
  const [currentMessage, setCurrentMessage] = React.useState('')
  const [showChat, setShowChat] = React.useState(false)
  const [messagesEndRef, setMessagesEndRef] = React.useState<HTMLDivElement | null>(null)
  const { chats, sendMessage, getChatHistory }: any = useChatStore()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const scrollToBottom = () => {
    messagesEndRef?.scrollIntoView({ behavior: 'smooth' })
  }
  const [showFAQ, setShowFAQ] = React.useState(true)
  useEffect(() => {
    getChatHistory(API_KEY)
  }, [API_KEY, getChatHistory])
  useEffect(() => {
    scrollToBottom()
  }, [chats, scrollToBottom])

  const getTime = (date: string) => {
    // alert(new Date(date).getTime() - new Date().getTime())
    if (new Date().getTime() - new Date(date).getTime() > 10 * 60 * 100) {
      //count in minutes
      return (
        new Date(date)
          .toLocaleTimeString('en-US', {
            hour: 'numeric',
            hour12: true,
            minute: 'numeric',
          })
          .split(' ')[0] +
        ' ' +
        new Date(date)
          .toLocaleTimeString('en-US', {
            hour: 'numeric',
            hour12: true,
            minute: 'numeric',
          })
          .split(' ')[1]
      )
    } else if (Math.floor((new Date().getTime() - new Date(date).getTime()) / 60000) == 0) return 'Just Now'
    return Math.floor((new Date().getTime() - new Date(date).getTime()) / 60000) + ' minutes ago'
  }
  return (
    <div>
      {!showChat && (
        <div className='_fNSKM fixed bottom-4 right-4'>
          <img
            onClick={() => setShowChat(!showChat)}
            src='https://supportify.codpark.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fc64.e24f929e.png&w=48&q=75'
            alt='chat'
            className='max-w-sm
            px-4 py-2 '
          />
        </div>
      )}
      {showChat && (
        <div
          className='max-h-120 _fNSKM fixed bottom-2 right-2 z-500 max-w-xs
            rounded-lg shadow-lg
            '
          style={{
            backgroundColor: '#000000',
            width: '20rem',
          }}
        >
          <div className='rounded-lg  shadow-lg'>
            {/* <!-- Header --> */}
            <div className='flex items-center justify-between px-4 py-2'>
              <div>
                <img
                  onClick={() => setShowChat(!showChat)}
                  src='https://supportify.codpark.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fc64.e24f929e.png&w=48&q=75'
                  alt='chat'
                  className='px-1 py-1 '
                  style={{
                    height: '50px',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
              </div>
              <div>
                <h3
                  className='text-md font-medium'
                  style={{
                    color: '#ffffff',
                  }}
                >
                  {AccountName ? AccountName : 'Support'}
                </h3>
                <p
                  className='text-sm font-light'
                  style={{
                    color: '#ffffff',
                  }}
                >
                  {AccountAgent ? AccountAgent : 'Agent'}
                </p>
              </div>
              <button onClick={() => setShowChat(!showChat)} className='text-gray-400 hover:text-gray-500'>
                <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                  <path
                    fillRule='evenodd'
                    d='M5.293 5.293a1 1 0 0 1 1.414 0L10 8.586l3.293-3.293a1 1 0 1 1 1.414 1.414L11.414 10l3.293 3.293a1 1 0 0 1-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L8.586 10 5.293 6.707a1 1 0 0 1 0-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
            {/* <!-- Messages --> */}
            {!showFAQ && (
              <div>
                <div className='max-h-72 overflow-auto  px-4 py-2 _3t-LV'>
                  <div className='mb-2 text-center text-sm text-gray-500'>June 19th, 2023</div>

                  <div
                    className=' flex  space-y-2'
                    style={{
                      flexDirection: 'column',
                    }}
                  >
                    {chats &&
                      chats.map(
                        (
                          chat: {
                            createdAt: string
                            message:
                              | string
                              | number
                              | boolean
                              | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                              | Iterable<React.ReactNode>
                              | React.ReactPortal
                              | null
                              | undefined
                            dir: string
                          },
                          index: React.Key | null | undefined,
                        ) => (
                          <div
                            key={index}
                            className={` flex ${chat.dir === 'incoming' ? 'items-start' : 'items-end justify-end'}`}
                          >
                            <div
                              className={`rounded-lg ${chat.dir === 'incoming' ? 'bg-yellow-500' : 'bg-blue-500'} p-2`}
                            >
                              <p className={`text-sm ${chat.dir === 'incoming' ? 'text-black' : 'text-white'} `}>
                                {chat.message}
                              </p>
                              <p
                                className={`text-xs font-extralight ${
                                  chat.dir === 'incoming' ? 'text-white' : 'text-white'
                                } `}
                              >
                                {
                                  //if less than 10 minutes
                                  getTime(chat.createdAt)
                                }
                              </p>
                            </div>
                          </div>
                        ),
                      )}
                    <div className='bg-red-500'></div>
                    <div
                      style={{ float: 'left', clear: 'both' }}
                      ref={(el) => {
                        setMessagesEndRef(el)
                      }}
                    ></div>
                  </div>
                </div>
                <div className='px-4 py-2'>
                  <div className='flex items-center'>
                    <input
                      type='text'
                      value={currentMessage}
                      onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                          if (currentMessage) {
                            sendMessage(API_KEY, currentMessage)
                            setCurrentMessage('')
                          }
                        }
                      }}
                      onSubmit={(e) => {
                        e.preventDefault()
                        if (currentMessage) {
                          sendMessage(API_KEY, currentMessage)
                          setCurrentMessage('')
                        }
                      }}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      className=' 
                  rounded-lg
                  px-4 py-2'
                      placeholder='Type your message...'
                      style={{ width: '100%', backgroundColor: 'black', color: 'white' }}
                    />
                    <button
                      onClick={() => {
                        if (currentMessage) {
                          sendMessage(API_KEY, currentMessage)
                          setCurrentMessage('')
                        }
                      }}
                      className='ml-2 rounded-lg px-4 py-2 font-medium '
                      style={{
                        color: '#000000',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}
            {showFAQ && (
              <div className='min-h-72   px-4 py-2 _3t-LV' style={{}}>
                <FAQ
                  FAQS={[
                    {
                      question: 'What is the C64?',
                      answer:
                        'dasdddddd ddddddddddddddddddddd addasdddddddddd dddddddddddddddddaddasdddddddd ddddddddd ddddddddddaddasd dddddddddddddddddd ddddddddad',
                    },
                    {
                      question: 'What is the C64?',
                      answer:
                        'dasdddddd ddddddddddddddddddddd addasdddddddddd dddddddddddddddddaddasdddddddd ddddddddd ddddddddddaddasddd dddddddddddddddd ddddddddad',
                    },
                    {
                      question: 'What is the C64?',
                      answer:
                        'dasdddddd ddddddddddddddddddddd addasdddddddddd dddddddddddddddddaddasdddddddd ddddddddd ddddddddddaddasdddd ddddddddddddddd ddddddddad',
                    },
                  ]}
                />
                <div
                  onClick={() => setShowFAQ(false)}
                  // onClick={() => setOpenIndex(openIndex == index ? -1 : index)}
                  className=' flex-row space-y-2 text-white
          rounded-lg shadow-lg px-4 py-2  
          '
                  style={{
                    cursor: 'pointer',
                    width: '100%',
                    fontWeight: 'bold',
                    marginTop: '1rem',
                    backgroundColor: '#154c79',
                  }}
                >
                  Continue with an agent
                  <div
                    style={{
                      fontWeight: 'normal',
                    }}
                    className=' text-white max-w-xs flex-wrap _fNSKM  break-all'
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
export default C64Chat
