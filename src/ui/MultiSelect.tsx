import React, { useState } from 'react';
import { Option } from '../interfaces/Option';

interface MultiSelectProps {
  options: Option[];
  onChange: (selected: string[]) => void;
  setOptions: (options: Option[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, onChange ,setOptions}) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function handleClickOption(e:any){
    // change the value of that id option to true
    const newOptions = options.map((option) => {
      if(option.id === e.target.value){
        option.checked = !option.checked;
        if(option.checked){
          setSelectedOptions([...selectedOptions, option]);
        }
        else{
          setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption.id !== option.id));
        }
      }
      return option;
    });
    setOptions(newOptions);
    const selected = selectedOptions.map((option) => option.id);
    onChange(selected);
    console.log(selected)
  }
  function handleRemoveOption(id:string){
    const newOptions = options.map((option) => {
      if(option.id === id){
        option.checked = !option.checked;
      }
      return option;
    });
    setOptions(newOptions);
    setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption.id !== id));
    const selected = selectedOptions.map((option) => option.id);
    onChange(selected);
    console.log(selected)
  }
 //add handleOutsideClick function and logic 

  return (
    <div className="relative">
      <div className="border p-2 cursor-pointer flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {selectedOptions.length ? selectedOptions.map((option)=> <span key={option.id} className='pr-2' onClick={()=>handleRemoveOption(option.id)}>{option.name}</span>):"Select options"}
      </div>
      {isDropdownOpen && (
        <div className="absolute top-[100%] left-0 right-0 border bg-background z-10">
          {options.length && options.map((option) => !option.checked ?
            <button 
            key={option.id} 
            className="p-2 w-full border cursor-pointer block" 
            onClick={(e)=>{handleClickOption(e)}} 
            value={option.id}
          >
            {option.name}
          </button> : null
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
