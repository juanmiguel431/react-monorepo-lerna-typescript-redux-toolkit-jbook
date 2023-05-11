import React from 'react';

interface IconButtonProps {
  icon: string
  onClick: () => void
}
const IconButton: React.FC<IconButtonProps> = ({ icon, onClick }) => {
  return (
    <button className='button is-primary is-small' onClick={onClick}>
          <span className='icon'>
            <i className={icon}></i>
          </span>
    </button>
  )
}
export default IconButton
