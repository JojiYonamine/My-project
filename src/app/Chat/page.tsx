"use client"
import { FormEvent, useState } from "react"

const Chat = () => {
    const[message,setMessage] = useState<string>('')
    const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
        console.log({ message })
        e.preventDefault()
    };

    return(
        <div>
            <h1>this is chat</h1>
            <form onSubmit={handleSendMessage}>
                <input value={message} onChange={(e) => setMessage(e.target.value)}/>
                <button type="submit">送信</button>
            </form>
        </div>
    )
}
export default Chat