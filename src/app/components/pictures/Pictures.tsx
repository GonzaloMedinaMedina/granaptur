import { readdirSync } from "fs";
import Image from "next/image";

export default async function Pictures() 
{    
  function compareNumbers(a: any, b: any) 
  {
    let an = a.match(/(\d+)/)[0],
        bn = b.match(/(\d+)/)[0];
        return an - bn;
  }
 
  const path = process.env.NODE_ENV === 'development' ? `./public/atico/` : `./atico`
  let i=0,
  imageComponents: Array<any> = [];
    try
    {
        let result = readdirSync(path).map(p => `/atico/` + p).sort(compareNumbers)
        imageComponents = result.map(r => {return <Image key={i++} alt="" src={r} width={100} height={100}></Image>})
    }   
    catch(e)
    {
        console.log(e);
    }

  return imageComponents;
}