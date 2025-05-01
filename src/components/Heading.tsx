import {LabelProps} from '../interfaces/LabelProps';

export function Heading({label}:LabelProps){
    return(
        <div className="font-semibold text-3xl">
            {label}
        </div>
    )
}