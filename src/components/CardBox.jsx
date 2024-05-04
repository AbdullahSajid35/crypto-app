import React, { useState,useLayoutEffect } from 'react'
import { MdArrowDropUp } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";
import Logo from './Logo';


function CardBox({name="BTC",percentage=-10,logo='1'}) {

  return (
    <div className=' flex w-full items-center justify-between bg-[#646464] p-4 rounded-full '>
        <div className='flex items-center gap-2'>
            <Logo logo={logo} dim={64}  width='40px' height='40px' />
            <span className='text-white'>{name}</span>

        </div>
        <div className='flex items-center '>
            {percentage<0 ?  <MdArrowDropDown className='text-[40px]' color='#F85A58' /> : <MdArrowDropUp  className='text-[40px]' color='#87D162'  /> }
            <span  className={`${percentage<0 ? "text-negative" : "text-positive "}`} > %{percentage<0 ? percentage.toFixed(2)*-1 : percentage.toFixed(2)}</span>
        </div>
    </div>
  )
}

export default CardBox