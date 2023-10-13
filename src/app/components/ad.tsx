'use client'
import { iadProperty } from '../interfaces/iadProperty';
import AdProperty from './adProperty';
import AdTitle from './adTitle';
import SlidePicture from './pictureSlider/pictureSlider';
import { useRouter } from 'next/navigation';

interface iAd
{
  adInfo: any,
}

const Ad: React.FC<iAd> = ({adInfo}) =>
{
  const router = useRouter();
  const properties: Array<iadProperty> = adInfo.properties;
  const Id = adInfo!['id'] ? adInfo!['id'] : '';

  const pictures = adInfo.pictures;
  const url = "/ad/" + Id;

  const addAndApartmentInfo = properties.map(property =>
  {
    return <AdProperty key={property.name + Id} adProperty={property}/>
  });

  const handleClick = (e: any) =>
  {
    e.preventDefault();
    if(!(e!.target!.name === 'arrow' || e!.target!.id === 'arrow'))
      router.push(url);
  }


  return (
    <a className="shadow-container justify-items-center w-fit flex-col relative flex p-10 border-2 bg-adblueback/30 border-adblueback rounded-xl" href={url} onClick={handleClick}>
      <AdTitle title={adInfo.title} />
      <div className='flex flex-col'>
        <SlidePicture pictures={pictures} automaticSlider={false}/>
        <br className='clear-both' />
        <div className="sm:grid sm:grid-cols-2" key={Id}>
          <div className='justify-self-center	p-1.5 m-1 bg-amber-200 rounded-xl'>
            <svg className='w-[32px] h-[32px]'>
              <path d='M26 4a2 2 0 0 1 2 1.85v7.99l1.85 5.54a3 3 0 0 1 .11.46l.03.24.01.24V30h-2v-2H4v2H2v-9.68a3 3 0 0 1 .09-.71l.06-.23L4 13.84V6a2 2 0 0 1 1.7-1.98l.15-.01L6 4zm2 18H4v4h24zm-1.39-6H5.4l-1.34 4h23.9zM26 6H6v8h2v-4a2 2 0 0 1 1.85-2H22a2 2 0 0 1 2 1.85V14h2zm-11 4h-5v4h5zm7 0h-5v4h5z'></path>
            </svg>
          </div>
          <div className='justify-self-center	p-1.5 m-1 bg-amber-200 rounded-xl'>
            <svg className='w-[32px] h-[32px]'>
              <path d="M7.5 2a4.5 4.5 0 0 1 4.47 4H14v2H8V6h1.95A2.5 2.5 0 0 0 5 6.34V16h26v2h-2v5a5 5 0 0 1-3 4.58V30h-2v-2H8v2H6v-2.42a5 5 0 0 1-3-4.34V18H1v-2h2V6.5A4.5 4.5 0 0 1 7.5 2zM27 18H5v5a3 3 0 0 0 2.65 2.98l.17.01L8 26h16a3 3 0 0 0 3-2.82V23z"></path>
            </svg>
          </div>
        </div>
        <div className='self-center text-xl'>{adInfo.precio} € noche</div>
      </div>
    </a>
  );
}
export default Ad;