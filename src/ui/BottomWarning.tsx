import {Link} from 'react-router-dom'
interface props {
    label:string;
    buttonText:string;
    to:string;
}
export function BottomWarning({label,buttonText,to}:props){
    return(
        <div className='py-2 text-md flex justify-center'>
            <div>
                {label}
            </div>
            <Link to={to} className='pointer underline pl-1 cursor-pointer'>
                {buttonText}
            </Link>
        </div>
    )
}