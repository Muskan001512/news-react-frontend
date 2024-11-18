import React, { useContext } from 'react'
import NoteContext from '../Context/Notes/NoteContext'

const About = () => {

    const a = useContext(NoteContext);
  return (
    <div>
       tjis is about {a.name}
    </div>
  )
}

export default About
