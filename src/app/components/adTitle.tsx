export default function AdTitle({title} : {title: string}) 
{
    return (<h1 className='mb-10 text-center text-clamp'>{title}</h1>);
}