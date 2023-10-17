export default function AdTitle({title} : {title: string}) 
{
    return (<h1 className='text-black mb-10 text-center text-clamp'>{title}</h1>);
}