# C64 Chat Support Component

This is a React component for implementing a chat support feature on a website. The component is designed to be easy to use and customizable.

## Installation

To use this component, you need to have React installed in your project. You can install the component using npm or yarn:

```
npm i c64-react-support --save
```

or

```
yarn add c64-react-support --save
```

Once installed, you can import the component in your React code:

```javascript
import C64Chat from 'c64-react-support'
import 'c64-react-support/dist/index.css'
```

## Usage

The `C64Chat` component takes several props that you can use to customize its behavior:

- `title`: The title of the chat window.
- `subtitle`: The subtitle of the chat window.
- `agentName`: The name of the chat agent.
- `avatar`: The URL of the chat agent's avatar.
- `chatHistory`: An array of chat messages to be displayed when the chat window is opened.
- `onSendMessage`: A callback function that will be called when the user sends a message.
- `onClose`: A callback function that will be called when the chat window is closed.

Here is an example of how to use the component:

```javascript
import React, { useState } from 'react'
import C64Chat from 'react-chat-support-component'
import 'react-chat-support-component/dist/index.css'

function App() {
  const [chatHistory, setChatHistory] = useState([])

  const handleSendMessage = (message) => {
    setChatHistory([...chatHistory, { message, isAgent: false }])
    // Send the message to your chat support backend here
  }

  return (
    <div>
      <h1>Welcome to my website</h1>
      <C64Chat
        title='Chat Support'
        subtitle='Please enter your message below'
        agentName='Agent Smith'
        avatar='https://example.com/avatar.png'
        chatHistory={chatHistory}
        onSendMessage={handleSendMessage}
      />
    </div>
  )
}

export default App
```

## Customization

You can customize the appearance of the chat window by modifying the CSS styles. The component comes with default styles that you can override by importing the CSS file and adding your own styles. Here is an example:

```css
/* Override the background color of the chat window */
.c64-chat-window {
  background-color: #f2f2f2;
}

/* Override the font size of the chat messages */
.c64-chat-message {
  font-size: 14px;
}

/* Override the color of the chat agent's messages */
.c64-chat-message.agent {
  color: #ff0000;
}
```

## License

This component is licensed under the MIT License.
