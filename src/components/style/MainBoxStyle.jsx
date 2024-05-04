import React from 'react'

function MainBoxStyle({children}) {
  return (
    <div className='bg-black pb-10 w-full flex flex-col gap-4 items-center rounded-[40px] p-3'>
        {children}
    </div>
  )
}

export default MainBoxStyle