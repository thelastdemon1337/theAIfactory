// actions.js
import axios from 'axios'
import * as Constant from './utils/constants'

export function HelloWorldAction(props) {
  return {
    label: 'Send Newsletter ',
    onHandle: () => {
      try {
        if (!props.published) {
            alert('Please publish the newsletter first.')
            return
          }
        const response = axios.post(
          Constant.apiGateway + '/newsletter/send-newsletter',
          {
            subject: props.published?.subject,
            body: props.published?.body,
          },
          Constant.config,
        )
        console.log(response)
        alert('The Newsletter was sent.')
      } catch (error) {
        console.log(error)
      }
      
    },
  }
}
