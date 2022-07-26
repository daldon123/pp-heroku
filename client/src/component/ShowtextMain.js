import React from 'react'
import  styled  from 'styled-components';

const Maintext = styled.div`
    width: 55%;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 2px solid black;
    margin-top: 20px;
`

const ShowtextMain = ({con,asd}) => {

  const content = con.replace('<figure class="image"><img></figure>',`<figure class="image"><img src="https://hong-popol.herokuapp.com/${asd}" alt="pic"/></figure>`)

  return (
    <>
      <Maintext dangerouslySetInnerHTML={ {__html: content } }>
      </Maintext>
    </>

  )
}

export default ShowtextMain