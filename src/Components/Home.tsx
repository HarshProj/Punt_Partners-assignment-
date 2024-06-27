import '../CSS/Home.css'
import details from'../Assets/punt-frontend-assignment (1).json'
import { useEffect, useState } from 'react';
interface FontVariants {
    [weight: string]: string;
  }
interface FontDetails {
    [fontName: string]: FontVariants;
  }
  
export const Home = () => {
    const fontDetails: FontDetails = details;
    console.log(fontDetails);
    console.log(details);
    const[text,setText]=useState('')
    const [font, setFont] = useState<string>('');
    const [weidth, setWeidth] = useState<string>('');
    // const [fontWeight, setFontWeight] = useState<string>('');
    const [fontWeights, setFontWeights] = useState<string[]>([]);
    useEffect(() => {
        const head = document.head;
        if(weidth){
        
        const url = fontDetails[font][weidth];
        console.log(url)
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
            console.log(text);
        }
    }, [weidth]);
    useEffect(() => {
        if (font) {
            // Get the weights for the selected font
            const weights = Object(fontDetails[font]);
            setFontWeights(weights);
            console.log("font weidth",fontWeights)
          } else {
            setFontWeights([]);
          }
    }, [font]);
    useEffect(()=>{

    },[text])
    useEffect(() => {
        const savedText = localStorage.getItem('text');
        const savedFont = localStorage.getItem('font');
        const savedWeight = localStorage.getItem('weight');
        // const savedItalic = localStorage.getItem('italic');
        if (savedText) setText(savedText);
        if (savedFont) setFont(savedFont);
        if (savedWeight) setWeidth(savedWeight);
        // if (savedItalic) setIsItalic(JSON.parse(savedItalic));
      }, []);
    
      const handlesave=()=>{
        localStorage.setItem('text', text);
        localStorage.setItem('font', font);
        localStorage.setItem('weight', weidth);
      }
      const handlereset=()=>{
        setText('');
        setFont('');
        setWeidth('');
        localStorage.removeItem('text');
        localStorage.removeItem('font');
        localStorage.removeItem('weight');
      }
    return (
    <div className='home-box'>
        <div className="container"> 
            <div className="desc-sec">
            <div className="font-family-sec">
                <select name="" id="" value={font}onChange={(e)=>{setFont(e.target.value)}}>
                <option value="">Select Font</option>
                    {Object.keys(details).map((font)=>(
                        <option key={font} value={font}>{font}</option>
                    ))}
                </select>
            </div>
            <div className="varient-sec">
            <select name="" id="" value={weidth} onChange={(e)=>{setWeidth(e.target.value)}}>
                
            <option value="">Select Font</option>
                    {!font?'':Object.keys(fontDetails[font]).map((weidth)=>(
                        <option key={weidth} value={weidth}>{weidth}</option>
                    ))}
                </select>
            </div>
            </div>

            <div className="text-sec">
            <textarea name="" id="" style={{ fontFamily: font, fontWeight: weidth }} value={text} onChange={(e)=>{setText((e.target.value))}}/>
            </div>
            <div className="reset-save">
                <button className="btn" onClick={handlereset}>Reset</button>
                <button className="btn" onClick={handlesave}>Save</button>
            </div>
        </div>
    </div>
  )
}
