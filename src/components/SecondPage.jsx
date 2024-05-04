import React, { useEffect, useState,useLayoutEffect  } from 'react'
import MainBox from './MainBox'
import axios from "axios";
import {API} from '../utils/api'
function SecondPage() {
  const [bitcoinPercentage, setBitcoinPercentage] = useState(0)
  const [ethereumPercentage, setEthereumPercentage] = useState(0)
  const [bitcoinMonthPercent, setBitcoinMonthPercent] = useState(0)
  const [ethereumMonthPercent, setEthereumMonthPercent] = useState(0)
  const [gainersData, setGainersData] = useState([])
  const [loosersData, setLoosersData] = useState([])
  const [gainersMonthData, setGainersMonthData] = useState([])
  const [loosersMonthData, setLoosersMonthData] = useState([])
  const [data,setData]=useState([])

  const getData=async()=>{
   const res=await axios.get(`${API}/latest`);
   const res_gainers=await axios.get(`${API}/trending/losers-gainer?time=7d&sort=desc&limit=5`)
   const res_loosers=await axios.get(`${API}/trending/losers-gainer?time=7d&sort=asc&limit=5`)
   const res_month_gainers=await axios.get(`${API}/trending/losers-gainer?time=30d&sort=desc&limit=5`)
   const res_month_loosers=await axios.get(`${API}/trending/losers-gainer?time=30d&sort=asc&limit=5`)
   if (res?.data?.status==='success'){
    for(let i=0;i<res?.data?.data.length;i++){
      if(res?.data?.data[i].id==1){
        setBitcoinPercentage(res?.data?.data[i]?.quote?.USD?.percent_change_24h);
        setBitcoinMonthPercent(res?.data?.data[i]?.quote?.USD?.percent_change_30d)
      }
    }

    for(let i=0;i<res?.data?.data.length;i++){
      if (res?.data?.data[i].id==1027){
        setEthereumPercentage(res?.data?.data[i]?.quote?.USD?.percent_change_24h);
        setEthereumMonthPercent(res?.data?.data[i]?.quote?.USD?.percent_change_30d)
      }
    }
    setData(res?.data?.data);
   }

   if (res_gainers?.data?.status==='success'){
     const top_5 = res_gainers?.data?.data;
     const gainers = top_5.map(item => ({
      name: item.symbol,
      percentage: item?.quote?.USD?.percent_change_7d,
      logo: item.id
    }));
    setGainersData(gainers);
   }

   if (res_loosers?.data?.status==='success'){
    const top_5 = res_loosers?.data?.data;
    const loosers = top_5.map(item => ({
     name: item.symbol,
     percentage: item?.quote?.USD?.percent_change_7d,
     logo: item.id
   }));
   setLoosersData(loosers);
  }


  if (res_month_gainers?.data?.status==='success'){
    const top_5 = res_month_gainers?.data?.data;
    const gainers = top_5.map(item => ({
     name: item.symbol,
     percentage: item?.quote?.USD?.percent_change_30d,
     logo: item.id
   }));
   setGainersMonthData(gainers);
  }


  if (res_month_loosers?.data?.status==='success'){
    const top_5 = res_month_loosers?.data?.data;
    const loosers = top_5.map(item => ({
     name: item.symbol,
     percentage: item?.quote?.USD?.percent_change_30d,
     logo: item.id
   }));
   setLoosersMonthData(loosers);
  }
  }
 
 useLayoutEffect(() => {
  
   getData();
  

 },[])


  return (
    <div className='py-2 px-16 flex flex-col gap-3 '>
      <h1 className='text-[44px] text-center font-bold text-white' ><span className='text-orange'>HAFTALIK</span> VE <span className='text-orange'>AYLIK</span> YÜKSELENLER <span className='text-orange'>/</span> DÜŞENLER</h1>
        <div className='flex justify-between gap-16 items-center'>
            <div className='w-[50%]'>
              <MainBox heading={<h1 className='text-white font-bold  text-[24px]'><span className='text-color1'>Bitcoin</span> ve <span className='text-color2'>Ethereum</span> Haftalık Değişim</h1>} list_items={[{name:"BTC",percentage:bitcoinPercentage,logo:1},{name:"ETH",percentage:ethereumPercentage,logo:1027}]} />
            </div>
            <div className='w-[50%]'>
              <MainBox heading={<h1 className='text-white font-bold  text-[24px]'><span className='text-color1'>Bitcoin</span> ve <span className='text-color2'>Ethereum</span> Aylık Değişim</h1>} list_items={[{name:"BTC",percentage:bitcoinMonthPercent,logo:1},{name:"ETH",percentage:ethereumMonthPercent,logo:1027}]} />
            </div>
        </div>

        <div className='flex justify-between gap-16 items-center'>
            <div className='w-[50%]'>
              <MainBox heading={<h1 className='text-white font-bold  text-[24px]'><span className='text-color3'>Yükselen Kripto Paralar</span> Son 1 Hafta</h1>} list_items={gainersData} />
            </div>
            <div className='w-[50%]'>
              <MainBox heading={<h1 className='text-white font-bold  text-[24px]'><span className='text-color4'>Düşen Kripto Paralar</span> Son 1 Hafta</h1>} list_items={loosersData} />
            </div>
        </div>



        <div className='flex justify-between gap-16 items-center'>
            <div className='w-[50%]'>
              <MainBox  heading={<h1  className='text-white font-bold  text-[24px]'><span className='text-color3'>Yükselen Kripto Paralar</span> Son 1 Ay</h1>} list_items={gainersMonthData} />
            </div>
            <div className='w-[50%]'>
              <MainBox heading={<h1  className='text-white font-bold   text-[24px]'><span className='text-color4'>Düşen Kripto Paralar</span> Sonlay</h1>}  list_items={loosersMonthData}/>
            </div>
        </div>
    </div>
  )
}

export default SecondPage