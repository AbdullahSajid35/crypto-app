import React from 'react'
import { useState ,useLayoutEffect} from 'react'
import { MdArrowDropUp } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";
import MainBoxStyle from './style/MainBoxStyle'
import PieChartComponent from './PiChart'
import ClockMeter from './ClockMeter'
import axios from "axios";
import {API} from '../utils/api'
import MainBox from './MainBox'
import Logo from './Logo';
import EuroRate from './EuroRate';


function FirstPage() {
  const [trendingData, setTrendingData] = useState([]);
  const [gainersDayData, setGainersDayData] = useState([]);
  const [loosersDayData, setLoosersDayData] = useState([]);
  const [bitcoinData, setBitcoinData] = useState({price:0,percent:0});
  const [ethereumData, setEthereumData] = useState({price:0,percent:0});
  const [globalData, setGlobalData] = useState({marketCap:0,marketCapPercent:0,volume:0,volume_percent:0})
  const getData=async()=>{
    const res=await axios.get(`${API}/trending/latest`);
    const res_bit_ether=await axios.get(`${API}/latest`);
    const res_gainers=await axios.get(`${API}/trending/losers-gainer?time=24h&sort=desc&limit=5`)
    const res_loosers=await axios.get(`${API}/trending/losers-gainer?time=24h&sort=asc&limit=5`)
    const res_global=await axios.get(`${API}/market-cap`)


    if (res_global?.data?.status==='success'){
      const data={
        marketCap:(res_global?.data?.data?.quote?.USD?.total_market_cap/1e12).toFixed(2),
        marketCapPercent:res_global?.data?.data?.quote?.USD?.total_market_cap_yesterday_percentage_change.toFixed(2),
        volume:(res_global?.data?.data?.quote?.USD?.total_volume_24h/1e9).toFixed(2),
        volume_percent:res_global?.data?.data?.quote?.USD?.total_volume_24h_yesterday_percentage_change.toFixed(2)
      }
      setGlobalData(data)


    }


    if (res_bit_ether?.data?.status==='success'){
      
      const bitcoinData = res_bit_ether?.data?.data.find(item => item.id === 1);

      if (bitcoinData) {
        const { price, percent_change_24h: percent } = bitcoinData?.quote?.USD ?? {};
        setBitcoinData({ price, percent });
      }



      const ethereumDataItem = res_bit_ether?.data?.data.find(item => item.id === 1027);

      if (ethereumDataItem) {
        const { price, percent_change_24h: percent } = ethereumDataItem?.quote?.USD ?? {};
        setEthereumData({ price, percent });
      }


    if (res?.data?.status==='success'){
      const arr = res?.data?.data.slice(0,6);
      const data=arr.map(item=>({
        logo:item.id,
        name:item.symbol,
      }))
      setTrendingData(data)
    }

  }


    if (res_gainers?.data?.status==='success'){
      const top_5 = res_gainers?.data?.data;
      const gainers = top_5.map(item => ({
       name: item.symbol,
       percentage: item?.quote?.USD?.percent_change_24h,
       logo: item.id
     }));
     setGainersDayData(gainers);
    }
 
    if (res_loosers?.data?.status==='success'){
     const top_5 = res_loosers?.data?.data;
     const loosers = top_5.map(item => ({
      name: item.symbol,
      percentage: item?.quote?.USD?.percent_change_24h,
      logo: item.id
    }));
    setLoosersDayData(loosers);
   }
    
  }

  useLayoutEffect(() => {
  
    getData();
   
  },[])


  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

 
  return (
    <div className='py-2 text-center px-16 flex items-center flex-col gap-3 text-white'>
      <h1 className='text-[44px] text-center font-bold text-white' ><span className='text-orange'>KRİPTO</span> PİYASASINDA GÜNCEL <span className='text-orange'>TABLO</span></h1>
      <MainBoxStyle>
        <div className='flex items-center gap-10 w-full p-3 '>
          <div className='w-[50%] flex items-center flex-col '>
            <h1 className='text-special font-bold  text-[24px] '>PİYASA HAKİMİYETİ</h1>
            <PieChartComponent/>
          </div>
          <div className='w-[50%] flex flex-col  items-center gap-3'>
            <div className='flex  bg-[#4C4C4C] rounded-[40px] p-3  items-center gap-10'>
              <div className='flex items-center flex-col '>
                <Logo/>
                <h1 className='text-special font-bold  text-[20px]'>Bitcoin</h1>
                <h1 className='font-bold text-[24px]'>${numberWithCommas(bitcoinData.price.toFixed(2).toLocaleString())}</h1>
                <div className='flex items-center font-bold mt-[-10px] text-[18px] '>
                    {bitcoinData.percent<0 ?  <MdArrowDropDown className='text-[40px]' color='#F85A58' /> : <MdArrowDropUp  className='text-[40px]' color='#87D162'  /> }
                    <span  className={`${bitcoinData.percent<0 ? "text-negative" : "text-positive "}`} > %{bitcoinData.percent<0 ? bitcoinData.percent.toFixed(2)*-1 : bitcoinData.percent.toFixed(2)}</span>
                </div>
              </div>
              <div className='flex  items-center  flex-col '>
                <Logo logo='1027'  />
                <h1 className='text-special font-bold  text-[20px]'>Ethereum</h1>
                <h1 className='font-bold text-[24px]'>${numberWithCommas(ethereumData.price.toFixed(2).toLocaleString('en-US'))}</h1>
                <div className='flex items-center font-bold mt-[-10px]  text-[18px]'>
                    {ethereumData.percent<0 ?  <MdArrowDropDown className='text-[40px]' color='#F85A58' /> : <MdArrowDropUp  className='text-[40px]' color='#87D162'  /> }
                    <span  className={`${ethereumData.percent<0 ? "text-negative" : "text-positive "}`} > %{ethereumData.percent<0 ? ethereumData.percent.toFixed(2)*-1 : ethereumData.percent.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className='flex bg-[#4C4C4C] rounded-[50px] py-1 px-14  items-center flex-col '>
              <h1 className='text-special font-bold   text-[20px]'>MARKET CAP</h1>
              <h1 className='font-bold text-[20px]'>{globalData.marketCap} TRIİLYON$</h1>
              <div className='flex items-center font-bold  mt-[-10px]  text-[18px]'>
                    {globalData.marketCapPercent<0 ?  <MdArrowDropDown className='text-[40px]' color='#F85A58' /> : <MdArrowDropUp  className='text-[40px]' color='#87D162'  /> }
                    <span  className={`${globalData.marketCapPercent<0 ? "text-negative" : "text-positive "}`} > %{globalData.marketCapPercent<0 ? globalData.marketCapPercent*-1 : globalData.marketCapPercent}</span>
              </div>
            </div>
            <div className='flex bg-[#4C4C4C] rounded-[50px] py-1 px-8 flex-col  items-center'>
              <h1 className='text-special font-bold   text-[20px]'>24 SAATLİK İŞLEM HACMİ</h1>
              <h1 className='font-bold text-[20px]'>{globalData.volume} MİLYAR$</h1>
              <div className='flex items-center font-bold mt-[-10px]  text-[18px]'>
                    {globalData.volume_percent<0 ?  <MdArrowDropDown className='text-[40px]' color='#F85A58' /> : <MdArrowDropUp  className='text-[40px]' color='#87D162'  /> }
                    <span  className={`${globalData.volume_percent<0 ? "text-negative" : "text-positive "}`} > %{globalData.volume_percent<0 ? globalData.volume_percent*-1 : globalData.volume_percent}</span>
              </div>
            </div>
          </div>
        </div>
      </MainBoxStyle>
      <div className='flex w-full items-center gap-10'>
          <div className='w-[50%] flex flex-col gap-4 items-center'>
            
            <MainBoxStyle>
              <div className='flex flex-col gap-2 w-full items-center'>
                <h1 className='text-special text-[20px]  font-bold '>KORKU VE AÇGÖZLÜLÜK ENDEKSİ</h1>
                <ClockMeter/>
                <h1 className='text-special text-[20px]  font-bold '>AÇGÖZLÜLÜK</h1>
              </div>
            </MainBoxStyle>
          </div>

          <div className='w-[50%]'>
            <MainBoxStyle>
              <div className='flex flex-col gap-3 w-full items-center'>
                <h1 className='text-special font-bold text-[24px]'>Trend Kripto Paralar 24H</h1>
                <div className='flex flex-wrap justify-between gap-4 w-full'>
                  {
                    trendingData.map((item,idx)=>(
                      <div key={idx} className='flex justify-between items-center bg-[#666666] rounded-full p-3 w-[45%]' >
                        <Logo logo={item.logo} width='40px' height='40px' dim={64} />
                        <span>{item.name}</span>
                     </div>
                    ))
                  }
                </div>
              </div>
            </MainBoxStyle>
          </div>
      </div>
      <div >
        <div className='bg-black w-full flex flex-col gap-4 items-center rounded-[40px] px-8 py-3'>
          <h1 className='font-bold text-[22px]'><span className='text-orange'>$ </span><EuroRate/><span className='text-[#8F8F8F]'>€</span></h1>
        </div>
      </div>
      <div className='flex justify-between w-full gap-16 items-center'>
            <div className='w-[50%]'>
              <MainBox  heading={<h1  className='text-special font-bold  text-[24px]'>Yükselen Kripto Paralar 24H</h1>} list_items={gainersDayData} />
            </div>
            <div className='w-[50%]'>
              <MainBox heading={<h1  className='text-special font-bold   text-[24px]'>Düşen Kripto Paralar 24H</h1>}  list_items={loosersDayData}/>
            </div>
        </div>
    </div>
  )
}

export default FirstPage