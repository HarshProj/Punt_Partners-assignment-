import '../CSS/Home.css'
import details from'../Assets/punt-frontend-assignment (1).json'
import { useEffect, useState } from 'react';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface FontVariants {
    [weight: string]: string;
  }
interface FontDetails {
    [fontName: string]: FontVariants;
  }
  
export const Home = () => {
    const fontDetails: FontDetails = details;
    // console.log(details);
    const[text,setText]=useState('')
    const[toggle,setToggle]=useState(false)
    const [font, setFont] = useState<string>('');
    const [weidth, setWeidth] = useState<string>('');
    const [fontWeights, setFontWeights] = useState<FontVariants>({});
    useEffect(() => {
        const head = document.head;
        if(weidth){
            let url = fontDetails[font][weidth];
            let x=url;
            if(fontDetails[font]&&fontDetails[font][weidth+'italic']!==undefined&&toggle){
                url=fontDetails[font][weidth+'italic']
            }
            if(!toggle){
                url = fontDetails[font][weidth];
            }
        // console.log(url===x)
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            link.setAttribute('data-font', font);
            head.appendChild(link);
            
            const style = document.createElement('style');
            style.textContent = `
                @font-face {
                    font-family: '${font}';
                    font-weight: ${weidth};
                    src: url(${url}) format('woff2');
                }
            `;
            head.appendChild(style);
            // console.log(text);
        }
        // console.log("Fontweidth",fontWeights)
    }, [weidth,toggle]);
    useEffect(() => {
        if (font) {
            const newFontWeights: FontVariants = {};
       Object.entries(fontDetails[font]).forEach(([weight, url]) => {
        if (weight.length === 3) {
          newFontWeights[weight] = url;
        }
      })
      setFontWeights(newFontWeights);
        // console.log('fonts',fontWeights,fontDetails[font])
    } 
        
        else {
            setFontWeights({});
          }
    }, [font]);
    useEffect(()=>{

    },[text])
    useEffect(() => {
        const savedText = localStorage.getItem('text');
        const savedFont = localStorage.getItem('font');
        const savedWeight = localStorage.getItem('weight');
        const savedItalic = localStorage.getItem('toggle');
        if (savedText) setText(savedText);
        if (savedFont) setFont(savedFont);
        if (savedWeight) setWeidth(savedWeight);
        if (savedItalic) setToggle(JSON.parse(savedItalic));
        // console.log(savedItalic)
      }, []);
    
      const handlesave=()=>{
        localStorage.setItem('text', text);
        localStorage.setItem('font', font);
        localStorage.setItem('weight', weidth);
        localStorage.setItem('toggle', JSON.stringify(toggle));
        // console.log( JSON.stringify(toggle))
        toast("Data saved")
      }
      const handlereset=()=>{
        setText('');
        setFont('');
        setWeidth('');
        localStorage.removeItem('text');
        localStorage.removeItem('font');
        localStorage.removeItem('weight');
        localStorage.removeItem('toggle');
        toast.success("Success Notification !");
      }
    return (<>
        {/* <ToastContainer/> */}
    <div className='home-box'>
    <h1>Font family analyser</h1>
        <div className="container"> 
            <div className="desc-sec">
            <div className="font-family-sec">
                <select name="" id="" value={font}onChange={(e)=>{setFont(e.target.value);setWeidth("")}}>
                <option value="">Select Font</option>
                    {Object.keys(details).map((font)=>(
                        <option key={font} value={font}>{font}</option>
                    ))}
                </select>
            </div>
            <div className="varient-sec">
            <select name="" id="" value={weidth} onChange={(e)=>{setWeidth(e.target.value);setToggle(false)}}>
                
            <option value="">Select Font</option>
                    {!font?'':Object.keys(fontWeights).map((weidth)=>(
                        <option key={weidth} value={weidth}>{weidth}</option>
                    ))}
                </select>
            </div>
            {<div className="toggle">
                <label >Italic</label>
                
                <button className='toggle-btn' onClick={()=>{setToggle(!toggle)}} disabled={fontDetails[font]===undefined||fontDetails[font][weidth+'italic']===undefined} >{toggle?'OFF':'ON'}</button>
            </div>}
            </div>

            <div className="text-sec">
            <textarea name="" id="" style={{ fontFamily: font, fontWeight: weidth }} value={text} onChange={(e)=>{setText((e.target.value))}}/>
            </div>
            <div className="reset-save">
                <button className="btn" onClick={handlereset}>Reset</button>
                <button className="btn" onClick={handlesave}>Save</button>
                {/* <ToastContainer/> */}
            </div>
        </div>
    </div>
                        </>
  )
}
