import {PulseIcon,CellTowerIcon,MapPinIcon,WifiHighIcon,LightningIcon,BroadcastIcon} from '@phosphor-icons/react';
import Users from './assets/activeusers.gif';
import Uptime from './assets/networkuptime.gif';
import Transfer from './assets/datatransfer.gif';
import Speed from './assets/speed.gif';
import { useEffect, useState } from 'react';
import { AreaChart,  XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend, Area, ComposedChart, Bar, Line} from 'recharts';
function LastUpdate({paused}){
    const [time,setTime]=useState(new Date());
    useEffect(()=>{
        if(paused) return;
        const timer=setInterval(()=>{
            setTime(new Date());
        },1000); 
        return () => clearInterval(timer);
    },[paused]);
    const hours=(time.getHours());
    const min=time.getMinutes();
    const sec=time.getSeconds();
    const ampm=hours>=12?'PM':'AM';
    const newHours=hours%12 || 12;
    const formatHours=newHours<10?`0${newHours}`:newHours;
    const formatMin=min<10?`0${min}`:min;
    const formatSec=sec<10?`0${sec}`:sec;
    
    return(
        <div>
            <p className='text-[#555555] text-xs font-normal tracking-wide ml-2 whitespace-nowrap '>Last Updated: {formatHours}:{formatMin}:{formatSec} {ampm}</p>
        </div>
    );
}
function Cities({cityName,setCity}){
    const names=['All Cities' , 'Islamabad' , 'Lahore' , 'Peshawar' , 'Multan' , 'Karachi' , 'Quetta'];
    function handleClick(name){
        setCity(name);
    }
    return(
        <div>
            <div className='ml-16 flex items-center gap-4 border border-[#D1D5DB] rounded-lg text-[#1F2937] text-xs font-medium shadow-xs cursor-pointer max-[1270px]:ml-8 max-[1220px]:ml-2 max-[790px]:hidden'>
            <p onClick={() => handleClick("All Cities")} className={`ml-2 ${cityName === "All Cities" ? "bg-[#E0F2FE] text-[#0369A1]" : "hover:bg-[#EFEFEF]"} px-3 py-1.5 whitespace-nowrap`}>All Cities</p>
            <p onClick={() => handleClick("Islamabad")} className={`ml-2  ${cityName === "Islamabad" ? "bg-[#E0F2FE] text-[#0369A1]" : "hover:bg-[#EFEFEF]"} px-3 py-1.5`}>Islamabad</p>
            <p onClick={() => handleClick("Karachi")} className={`ml-2  ${cityName === "Karachi" ? "bg-[#E0F2FE] text-[#0369A1]" : "hover:bg-[#EFEFEF]"} px-3 py-1.5`}>Karachi</p>
            <p onClick={() => handleClick("Lahore")} className={`ml-2  ${cityName === "Lahore" ? "bg-[#E0F2FE] text-[#0369A1]" : "hover:bg-[#EFEFEF]"} px-3 py-1.5`}>Lahore</p>
            <p onClick={() => handleClick("Peshawar")} className={`ml-2  ${cityName === "Peshawar" ? "bg-[#E0F2FE] text-[#0369A1]" : "hover:bg-[#EFEFEF]"} px-3 py-1.5`}>Peshawar</p>
            <p onClick={() => handleClick("Quetta")} className={`ml-2  ${cityName === "Questta" ? "bg-[#E0F2FE] text-[#0369A1]" : "hover:bg-[#EFEFEF]"} px-3 py-1.5`}>Quetta</p>
            <p onClick={() => handleClick("Multan")} className={`ml-2  ${cityName === "Multan" ? "bg-[#E0F2FE] text-[#0369A1]" : "hover:bg-[#EFEFEF]"} px-3 py-1.5`}>Multan</p>
            </div>
            <div>
                <select value={cityName} onChange={(e) => setCity(e.target.value)} className='hidden max-[790px]:block border border-[#D1D5DB] rounded-lg text-xs px-3 py-1.5'>
                    {names.map(name =>(
                        <option key={name} value={name}>{name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}
function Stream({paused,setPaused}){
    function handleClick(){
        setPaused(!paused);
    }
    return(
        <div className='ml-8 px-3 py-1 bg-white border border-[#374151] rounded-lg text-[#111827] text-sm font-medium hover:bg-slate-50 transition-colors whitespace-nowrap'>
            <button className=' cursor-pointer' onClick={handleClick}>{paused?'Resume':'Pause'} Stream</button>
        </div>
    );
}
function Header({paused,setPaused,cityName,setCity}){
    return(
        <div className='flex sticky top-0 z-50 p-2 w-full bg-[#F8FAFC] shadow-sm relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-gradient-to-r after:from-[#A3E1E8] after:via-[#BEE3CB] after:to-[#ECC6AA] max-[1220px]:flex-col'>
            <div className='flex items-center justify-between gap-4'>
                <div className='flex'>
                <PulseIcon size={32} className='ml-2 text-[#38BDF8] justify-center shrink-0'/>
                <p className='ml-2 tracking-tight font-bold text-lg text-[#0F172A] justify-center max-[1115px]:flex max-[1115px]:justify-between'>NetPulse</p>
                </div>
                <p className='ml-16 bg-[#EFEFEF] text-[#42AD62] text-xs font-semibold p-2 rounded-lg whitespace-nowrap max-[435px]:ml-2 max-[395px]:hidden'>● LIVE</p>
                <LastUpdate paused={paused}/>
            </div>
            <div className='flex items-center justify-between max-[1220px]:mt-4 max-[1220px]:border-t max-[1220px]:border-slate-300 max-[1220px]:pt-4'>
                <Cities cityName={cityName} setCity={setCity}/>
                <Stream paused={paused} setPaused={setPaused}/>
            </div>
        </div>
    );
}
function KPICards({Image,Figure,Title,symbol,percent}){
    return(
        <div className='w-65 bg-white p-2 rounded-2xl shadow-lg border border-gray-100 max-[1075px]:w-full'>
            <div className='flex flex-row'>
                {Image}
                <div className='ml-2 flex flex-col'>
                    <p className='text-2xl font-semibold text-slate-900'>{Figure}</p>
                    <p className='text-xs font-medium text-slate-500'>{Title}</p>
                </div>
                {symbol && percent && (<div className={`flex flex-row ml-auto self-start ${symbol=="↑"?"bg-[#E6F7FF] text-[#0D9488] p-1 text-xs rounded-lg":"bg-[#FFF3E8] text-[#D97706] p-1 text-xs  rounded-lg"}`}>
                    <p>{symbol}{percent}</p>
                </div>)}
            </div>
        </div>
    );
}
function Overview({paused}){
    const [activeusers,setActiveUsers]=useState(29000000);
    const activeusersStart=29000000;
    const [uptime,setUpTime]=useState(97.4);
    const uptimeStart=97.4;
    const [transfer,setTransfer]=useState(75);
    const transferStart=75;
    const [speed,setSpeed]=useState(0.012);
    const speedStart=0.012;
    useEffect(()=>{
        if(paused){
            return;
        }
        const id=setInterval(()=>{
            setActiveUsers(prev => prev + (Math.random()*100000-50000));
            const change=Math.random()*0.1-0.05;
            setUpTime(prev => Math.min(100,Math.max(0,prev+change)));
            setTransfer(prev => prev + (Math.random()*0.2+0.2));
            setSpeed(prev => Math.max(0 , prev + (Math.random()*0.001-0.0005)));
        },1500);
        return () => clearInterval(id);
    },[paused]);
    const activeChange=((Math.abs(activeusers-activeusersStart)/activeusersStart)*100);
    const activeUp=activeusers > activeusersStart;
    const uptimeChange=((Math.abs(uptime-uptimeStart)/uptimeStart)*100);
    const uptimeUp=uptime > uptimeStart;
    const speedChange=((Math.abs(speed-speedStart)/speedStart)*100);
    const speedUp=speed > speedStart;
    return(
        <div className='flex flex-row mt-8 justify-evenly max-[1075px]:grid max-[1075px]:grid-cols-2 max-[1075px]:gap-4 max-[1075px]:items-center  max-[1075px]:px-6 max-[575px]:flex max-[575px]:flex-col'>
            <KPICards Image={<img src={Users}/>} Figure={Number(Math.round(activeusers)).toLocaleString()} Title="Active Users" symbol={activeUp?"↑":"↓"} percent={activeChange.toFixed(1)+"%"}/>
            <KPICards Image={<img src={Uptime}/>} Figure={uptime.toFixed(1)+"%"} Title="Network Uptime" symbol={uptimeUp?"↑":"↓"} percent={uptimeChange.toFixed(1)+"%"}/>
            <KPICards Image={<img src={Transfer} className='w-15 h-15'/>} Figure={Math.round(transfer)+" TB"} Title="Data Transfer Today"/>
            <KPICards Image={<img src={Speed} className='w-12 h-12 mt-0.5'/>} Figure={speed.toFixed(3)+"%"} Title="Packet Loss Rate" symbol={speedUp?"↑":"↓"} percent={speedChange.toFixed(1)+"%"}/>
        </div>
    );
}
function NetworkTraffic({paused}){
    const [data,setData]=useState([{time:new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true}),upload: 5, download: 3, voip: 1.5}]);
    useEffect(()=>{
        if(paused){
            return;
        }
        const id=setInterval(()=>{
            setData(prev=>{
                const last=prev[prev.length-1]; 
                const newPoint={
                time:new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true}),
                upload: Math.min(8, Math.max(0, last.upload + (Math.random()-0.5))),
                download: Math.min(8, Math.max(0, last.download + (Math.random()-0.5))),
                voip: Math.min(8, Math.max(0, last.voip + (Math.random()-0.5)))
            };     
            return [...prev,newPoint].slice(-20);
            });
        },3000);
        return () => clearInterval(id);
    },[paused]);
    return(
        <div className='bg-white p-2 rounded-2xl shadow-lg border border-gray-100 w-full mb-4'>
            <h2 className='text-lg font-semibold text-slate-900 tracking-tight ml-2 mt-2'>Live Network Traffic</h2>
            <h4 className='ml-2 text-sm'>60s Sliding Window</h4>
            <ResponsiveContainer width="100%" aspect={1.5}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="uploadGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#38BDF8" stopOpacity={0.35}/>
                            <stop offset="100%" stopColor="#38BDF8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="downloadGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#F59E0B" stopOpacity={0.35}/>
                            <stop offset="100%" stopColor="#F59E0B" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="voipGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#22C55E" stopOpacity={0.35}/>
                            <stop offset="100%" stopColor="#22C55E" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="#E5E7EB"/>
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize:12, fill:"#64748B"}}/>
                    <YAxis domain={[0,8]} ticks={[0,2,4,6,8]} axisLine={false} tickLine={false} tick={{fontSize:12, fill:"#64748B"}} label={{value:"GB/s", angle:-90}}/>
                    <Tooltip formatter={(value) => Number(value).toFixed(2)}/>
                    <Legend verticalAlign="top" align="right" iconType="circle" height={50}   iconSize={window.innerWidth <= 400 ? 5 : 8} formatter={(value)=>(<span className='text-xs text-slate-600 max-[400px]:text-[9px] max-[400px]:mb-2'>{value}</span>)}/>
                    <Area dataKey="upload" type="monotone" name="Upload Traffic" stroke="#38BDF8" strokeWidth={2} fill="url(#uploadGrad)" dot={{r:3, fill:"#38BDF8", strokeWidth:0}}/>
                    <Area dataKey="download" type="monotone" name="Download Traffic" stroke="#F59E0B" strokeWidth={2} fill="url(#downloadGrad)" dot={{r:3, fill:"#F59E0B" ,strokeWidth:0}}/>
                    <Area dataKey="voip" type="monotone" name="VOIP/Media" stroke="#22C55E" strokeWidth={2} fill="url(#voipGrad)" dot={{r:3, fill:"#22C55E" ,strokeWidth:0}}/>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
function CityTraffic({paused,cityName}){
    const [cityData,setCityData]=useState([
        {city:"Islamabad" , short:"ISL" , fourG:143 , fiveG:90 , fiber:126},
        {city:"Karachi" , short:"KHI" , fourG:167 , fiveG:110 , fiber:78},
        {city:"Lahore" , short:"LHR" , fourG:127 , fiveG:91 , fiber:134},
        {city:"Peshawar" , short:"PEW" , fourG:113 , fiveG:98 , fiber:111},
        {city:"Quetta" , short:"QTA" , fourG:187 , fiveG:134 , fiber:123},
        {city:"Multan" , short:"MUX" , fourG:98 , fiveG:191 , fiber:100},
    ]);
    useEffect(()=>{
        if(paused){
            return;
        }
        const id=setInterval(()=>{
            setCityData(prev=>prev.map(c=>{
                const fourG= Math.min(200, Math.max(0,c.fourG + (Math.random()*10-5)));
                const fiveG= Math.min(200, Math.max(0,c.fiveG + (Math.random()*14-7)));
                const fiber= Math.min(200, Math.max(0,c.fiber + (Math.random()*6-3)));
                return { ...c, fourG, fiveG, fiber, avg: Number(((fourG + fiveG + fiber)/3).toFixed(2))};
            }))
        },5000);
        return () => clearInterval(id);
    },[paused]);
    const visibleCities=cityData.filter((e)=>{
        return e.city === cityName || cityName === "All Cities";
    });
    return(
        <div className='bg-white p-2 rounded-2xl shadow-lg border border-gray-100 w-full mb-4'>
            <h2 className='text-lg font-semibold text-slate-900 tracking-tight ml-2 mt-2'>Traffic By City</h2>
            <h4 className='ml-2 text-sm'>Current 5 Seconds</h4>
            <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={visibleCities} barCategoryGap="20%">
                    <CartesianGrid vertical={false} stroke="#E5E7EB"/>
                    <XAxis interval={0} dataKey="short" axisLine={false} tickLine={false} tick={{fontSize:12, fill:"#64748B"}}/>
                    <YAxis domain={[0,200]} axisLine={false} tickLine={false} tick={{fontSize:12, fill:"#64748B"}}/>
                    <Tooltip formatter={(value) => Number(value).toFixed(2)}/>
                    <Legend verticalAlign="top" align="right" iconType="circle" height={50} formatter={(value)=>(<span className='text-xs text-slate-600'>{value}</span>)}/>
                    <Bar dataKey="fourG" name="4G"  fill="#A3E1E8" radius={[4,4,0,0]}/>
                    <Bar dataKey="fiveG" name="5G"  fill="#0D9488" radius={[4,4,0,0]}/>
                    <Bar dataKey="fiber" name="Fiber"  fill="#0369A1" radius={[4,4,0,0]}/>
                    <Line type="monotone" dataKey="avg" name="Average" stroke="#475569" strokeWidth={2}/>
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}
function FirstPortion({paused,cityName}){
    return(
        <div className='grid grid-cols-2 gap-4 mt-8 w-full justify-evenly px-5 max-[950px]:flex max-[950px]:flex-col'>
            <NetworkTraffic paused={paused}/>
            <CityTraffic paused={paused} cityName={cityName}/>
        </div>
    );
}
function NetworkEvents({paused,cityName}){
    const sampleEvents=[
        {city:'Lahore' , type: 'Alert', message: 'Packet loss in Lahore' },
        {city:'Karachi' , type: 'Warning', message: 'High traffic in Karachi' },
        {city:'Islamabad' , type: 'Info', message: 'ISB-047 reconnected' },
        {city:'Islamabad' , type: 'Warning', message: 'Traffic exceeded in Islamabad' },
        {city:'Lahore' , type: 'Info', message: 'LHR-021 connection restored' },
        {city:'Quetta' , type: 'Alert', message: 'Signal drop in Quetta' },
        {city:'Karachi' , type: 'Info', message: 'KHI-032 maintenance completed' },
        {city:'Peshawar' , type: 'Alert', message: 'Connection lost in Peshawar' },
        {city:'Multan' , type: 'Warning', message: 'Unusual traffic spike in Multan' },
        {city:'Quetta' , type: 'Info', message: 'QTA-014 successfully reconnected' },
        {city:'Karachi' , type: 'Alert', message: 'Packet loss in Karachi' },
        {city:'Quetta' , type: 'Warning', message: 'Signal weakening in Quetta' },
        {city:'Islamabad' , type: 'Alert', message: 'Router failure in Islamabad' },
        {city:'Peshawar' , type: 'Info', message: 'Connection activated in Peshawar' }
    ];
    const [events, setEvents] = useState([]);
    useEffect(()=>{
        if(paused){
            return;
        }
        const id=setInterval(()=>{
            const pick=sampleEvents[Math.floor(Math.random()*sampleEvents.length)];
            const newEvent={
            id: Date.now(),
            city:pick.city,
            type:pick.type,
            message:pick.message,
            time:new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit', hour12:true})
        };
            setEvents(prev=>[newEvent,...prev].slice(0,15));
        },3000);
        return () => clearInterval(id);
    },[paused]);
    return(
        <div className='bg-white p-4 rounded-2xl shadow-lg border border-gray-100 w-full mb-4'>
            <h2 className='text-sm font-semibold text-slate-900 tracking-tight ml-2 mt-2'>Predictive Network Events</h2>
            <div className='max-h-60 overflow-y-auto [scrollbar-width:none] ml-2 mt-4'>
                {events.map(e=>(
                    e.city === cityName || cityName === "All Cities" ?(
                    <div key={e.id} className='mt-2 flex items-center'>
                        <span className={`inline-flex justify-center w-14 p-1 rounded-md text-xs font-semibold ${e.type==="Warning"?"bg-[#F59E0B]":e.type==="Info"?"bg-[#38BDF8]":"bg-[#EF4444]"}`}>{e.type}</span>
                        <span className='text-[13px] ml-2'>{e.message}</span>
                        <span className='text-xs ml-2 whitespace-nowrap shrink-0'>{e.time}</span>
                    </div>):null 
                ))}
            </div>
        </div>
    );
}
function TowerToolTip({id,cityName,cityStatus}){
    return(
    <div className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#0B132B] w-72 border border-slate-800/50 text-white rounded-lg px-3 py-2 shadow-lg whitespace-nowrap z-50'>
        <div className='flex justify-between'>
            <p className='!text-xs font-semibold text-slate-400 tracking-tight'>NETWORK TOWER</p>
            <CellTowerIcon size={16} className='text-sky-400'/>
        </div>
        <p className="font-semibold text-sm mt-2">Tower {id}</p>
        <div class="border-b border-slate-700 mt-2"></div>
        <div className='flex justify-between items-center mt-2'>
            <p className='text-xs font-medium text-slate-400'>Status: </p>
            <p className={`text-xs px-4 py-1 ${cityStatus==="Active"?"bg-[#064e3b]":cityStatus==="Degraded"?"bg-[#431407]":cityStatus==="Down"?"bg-[#450A0A]":"bg-[#1E293B]"} rounded-full`}>{cityStatus}</p>
        </div>
        <div className='flex mt-2'>
            <MapPinIcon size={16} />
            <p className='text-xs ml-1 text-slate-300'>{cityName}</p>
        </div>
    </div>
    );
}
function TowerStatus({paused,cityName}){
    const city=['Islamabad' , 'Lahore' , 'Peshawar' , 'Multan' , 'Karachi' , 'Quetta'];
    const status=['Active' ,'Active' , 'Down', 'Active' ,'Active' , 'Active', 'Degraded' ,'Active' ,  'Degraded'  ,'Active' ,'Active' ,'Planned', 'Active' ,'Active' , 'Active'];
    const [gridStatus,setGridStatus]=useState(()=>{
    const towerStatus=[];
    let towerID=101;
    for(let i=1;i<=50;i++){
        const selectedCity=city[Math.floor(Math.random()*city.length)];
        const selectedStatus=status[Math.floor(Math.random()*status.length)];
        const tid=`T-${towerID}`;
        towerStatus.push({id: tid , city: selectedCity, status: selectedStatus,});
        towerID++;
    }
    return towerStatus;
    });
    useEffect(()=>{
        if(paused){
            return;
        }
        const id=setInterval(()=>{
            const statusValue=status[Math.floor(Math.random()*status.length)];
            setGridStatus(prev => {
                const pickedIndex=Math.floor(Math.random()*prev.length);
                return prev.map((tower,index) =>{
                if(index === pickedIndex){
                    return {...tower,status:statusValue};
                }
                return tower;
            })})
        },5000);
        return () => clearInterval(id);
    },[paused]);
    const priority={ Active:1 , Degraded:2 , Down:3 , Planned:4};
    const sortedTower=[...gridStatus].sort((a,b)=>
        priority[a.status] - priority[b.status]
    );
    let activeCount=0,downCount=0,degradedCount=0,plannedCount=0;
    for(let j=0;j<gridStatus.length;j++){
        if(gridStatus[j].status==="Active" && (gridStatus[j].city === cityName || cityName === "All Cities")){
            activeCount++;
        }
        else if(gridStatus[j].status==="Degraded" && (gridStatus[j].city === cityName || cityName === "All Cities")){
            degradedCount++;
        }
        else if(gridStatus[j].status==="Down" && (gridStatus[j].city === cityName || cityName === "All Cities")){
            downCount++;
        }
        else if(gridStatus[j].status === "Planned" && (gridStatus[j].city === cityName || cityName === "All Cities")){
            plannedCount++;
        }
    }
    return(
        <div className='bg-white p-2 rounded-2xl shadow-lg border border-gray-100 w-full mb-4'>
            <div>
                <h2 className='text-sm font-semibold text-slate-900 tracking-tight ml-2 mt-2'>Tower Status Grid</h2>
            </div>
            <div className='flex justify-between mt-4 pl-3 pr-3 max-[440px]:grid max-[440px]:grid-cols-2  max-[440px]:gap-y-2'>
                <div className='flex text-xs'><div className='text-[#38BDF8] mr-2'>⬤</div>{activeCount}{" "}Active</div>
                <div className='flex text-xs'><div className='text-[#FB923C] mr-2'>⬤</div> {degradedCount}{" "}Degraded</div>
                <div className='flex text-xs'><div className='text-[#EF4444] mr-2'>⬤</div>{downCount}{" "}Down</div>
                <div className='flex text-xs'><div className='text-[#64748B] mr-2'>⬤</div>{plannedCount}{" "}Planned</div>
            </div>
            <div className='flex flex-wrap p-4'>
                {sortedTower.map(grid =>{
                if(grid.city === cityName || cityName === "All Cities"){
                    if(grid.status === "Active"){
                        return( 
                        <div key={grid.id} className='relative group'>
                        <div className='text-[#38BDF8] p-2 cursor-pointer'>⬤</div>
                        <TowerToolTip id={grid.id} cityName={grid.city} cityStatus={grid.status}/>
                        </div>
                        );
                    }
                    else if(grid.status === "Degraded"){
                        return(
                        <div key={grid.id} className='relative group'> 
                        <div className='text-[#FB923C] p-2 cursor-pointer'>⬤</div>
                        <TowerToolTip id={grid.id} cityName={grid.city} cityStatus={grid.status}/>
                        </div>
                        );
                    }
                    else if(grid.status === "Down"){
                        return(
                        <div key={grid.id} className='relative group'>
                        <div className='text-[#EF4444] p-2 cursor-pointer'>⬤</div>
                        <TowerToolTip id={grid.id} cityName={grid.city} cityStatus={grid.status}/>
                        </div>
                        );
                    }
                    else{
                        return(
                        <div key={grid.id} className='relative group'>
                        <div className='text-[#64748B] p-2 cursor-pointer'>⬤</div>
                        <TowerToolTip id={grid.id} cityName={grid.city} cityStatus={grid.status}/>
                        </div>
                        );
                    }
                }})}
            </div>
        </div>
    );
}
function TopUser({paused}){
    const person=["Users-2301" , "Users-1023" , "Users-6261" , "Users-3242" , "Users-5326" , "Users-8191" , "Users-5622" , "Users-7230"];
    const technology=["5G" , "4G" , "Fiber"];
    const [topUser,setTopUser]=useState(()=>{
        const dataConsumed=[];
        for(let i=0;i<8;i++){
            const selectedTech=technology[Math.floor(Math.random()*technology.length)];
            const usedData=Number((Math.random()*150).toFixed(2));
            dataConsumed.push({user : person[i] , network : selectedTech , data : usedData});
        }
        return dataConsumed;
    });
    useEffect(()=>{
        if(paused){
            return;
        }
        const id=setInterval(()=>{
            setTopUser(element =>{
                const selectedIndex=Math.floor(Math.random()*element.length);
                return element.map((row,pos)=>{
                    if(pos === selectedIndex){
                    const newData=Math.min(150,Number((row.data+(Math.random()*5)).toFixed(2)));
                    return {...row, data:newData === 150?25:newData};
                    }
                    return row;
                })
            })
        },3000);
        return () => clearInterval(id);
    },[paused]);
    const sortedTopUser=[...topUser].sort((a,b)=>{
        return b.data - a.data;
    });
    return(
        <div className='max-[1100px]:col-span-2 bg-white p-2 rounded-2xl shadow-lg border border-gray-100 w-full mb-4'>
            <h2 className='text-sm font-semibold text-slate-900 tracking-tight ml-2 mt-2'>Top Users By Data</h2>
            <div className='grid grid-cols-[95px_58px_1fr] justify-between p-2 text-xs text-slate-500 tracking-tight mt-2 px-2'>
                <p>Anonymous User</p>
                <p>Network</p>
                <p>Data Consumed Today (GB/TB)</p>
            </div>
            <div className='px-2'>
                {sortedTopUser.map(value=>{
                    return(
                    <div className='grid grid-cols-[95px_58px_1fr] justify-between text-xs py-1'>
                        <p className='font-mono font-semibold tracking-tight text-slate-700'>{value.user}</p>
                        <div className='flex items-center w-20'>
                            {value.network==="4G"?(
                                <WifiHighIcon size={14}/>):value.network==="5G"?(<BroadcastIcon size={14}/>):(<LightningIcon size={14}/>)}
                            <p className='text-xs'>{value.network}</p>
                        </div>
                        <div className='flex items-center gap-0.5'>
                            <p className='font-semibold text-slate-900 w-16'>{value.data} GB</p>
                            <div className='flex-1 min-w-[30px] h-2 bg-slate-100/80 border border-slate-200/60 rounded-full overflow-hidden'>
                                <div className='h-full bg-gradient-to-r from-sky-400 via-emerald-400 to-amber-500 rounded-full'  style={{width : `${(value.data/150)* 100}%`}}></div>
                            </div>
                        </div>
                    </div>
                    );
                })}
            </div>
        </div>
    );
}
function SecondPortion({paused,cityName}){
    return(
        <div className='grid grid-cols-3 gap-4 mt-8 w-full justify-evenly px-5 max-[1100px]:grid-cols-2 max-[950px]:flex max-[950px]:flex-col'>
            <NetworkEvents paused={paused} cityName={cityName}/>
            <TowerStatus paused={paused} cityName={cityName}/>
            <TopUser paused={paused}/>
        </div>
    );
}
function App(){
    const [paused,setPaused]=useState(false);
    const [city,setCity]=useState("All Cities");
    return(
        <div className='min-h-screen bg-[#FFFFFF] overflow-x-hidden'>
            <Header paused={paused} setPaused={setPaused} cityName={city} setCity={setCity}/>
            <Overview paused={paused}/>  
            <FirstPortion paused={paused} cityName={city}/>
            <SecondPortion paused={paused} cityName={city}/>
        </div>
    );
}
export default App;
