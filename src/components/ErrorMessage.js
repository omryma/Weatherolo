import React from 'react'
import { useHistory } from 'react-router-dom'

const ErrorMessage = () => {
  const history = useHistory()
  return (
    <Message
      onDismiss={() => history.push('/')}
      header="Something Went Wrong"
      content="Please try again. If the problem persists, contact omrymauer@gmail.com"
    >
      <p>
        Please try again. If the problem persists, please
        <a href="mailto:omrymauer@gmail.com">contact us</a>
      </p>
    </Message>
  )
}
export default ErrorMessage
