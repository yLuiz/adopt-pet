import styles from './Message.module.css';
import { useState, useEffect } from 'react';
import bus from '../../utils/bus';

export default function Message() {
  const [visibility, setVisibility] = useState(false);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {

    bus.addListener('flash', ({ message, type }) => {
      setVisibility(true);
      setMessage(message);
      setType(type);

      setTimeout(() => {
        setVisibility(false)
      }, 3000)
    })
    
  }, []);

  return visibility && (
    <div className={`${styles.message} ${styles[type]}`}>
      { message }
    </div>
  )
}