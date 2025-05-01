import  * as React from "react";
import { useEffect, useState } from "react";
import { BottomGradient, Button, Input, Label, LabelInputContainer } from "../../ui";
import { useToast } from "../../ui/use-toast";
import { MultipleUploadImage } from "../MultipleImageUpload";
import { RiDeleteBinLine } from "react-icons/ri";
import { useForm, Controller } from "react-hook-form";
import SelectInput from "../../ui/SelectInput";
import { createProduct } from "../../api/product";
import {  Options, Product } from "../../interfaces";
import { getCategories } from "../../api/category";
import { FaTrash } from "react-icons/fa";

interface ProductFormProps{
    products:Product[];
    setProducts:React.Dispatch<React.SetStateAction<Product[]>>;
    setShowForm:React.Dispatch<React.SetStateAction<boolean>>;
}

export function ProductForm({products,setProducts,setShowForm}:ProductFormProps) {
    const { register, handleSubmit, setValue, control, watch } = useForm();
    const [category,setCategory] = useState<Options[]>([]);
    const [expanded, setExpanded] = useState(false);
    const [info,setInfo] =useState([{ key:'', value:''}]);
    const { toast } = useToast();
    const images = watch("images", []);
    useEffect(()=>{
        const fetchData = async ()=>{
            const fetchCategory = await getCategories();
            setCategory(fetchCategory.data.map((item) => ({value:item._id,label:item.name})))
        }
        fetchData();
    },[])
    
    const toggleExpanded = () => {
        setExpanded(!expanded);
    };
    const onSubmit = async (data: any) => {
        try {
            const response = await createProduct({...data,info});
            setProducts([...products,response.data])
            setShowForm(false);
            toast({
                title: "success",
                description:response.message,
                variant: "default"
            });
        } catch (error: any) {
            toast({
                title: "error",
                description: error.message,
                variant: "destructive"
            });
        }
    };


    return (
         <form className="mt-10 mx-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-7">
                <div className="">
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                        <LabelInputContainer>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Ex. Shoes" type="text" {...register("name")} />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="brand">Brand</Label>
                            <Input id="brand" placeholder="ex. Puma" type="text" {...register("brand")} />
                        </LabelInputContainer>
                    </div>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="description">Description</Label>
                        <Input id="description" placeholder="Ex. best place to play cricket affordable price" type="text" {...register("description")} />
                    </LabelInputContainer>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                        <LabelInputContainer>
                            <Label htmlFor="price">Price</Label>
                            <Input id="price" placeholder="Rs. 5000" type="number" {...register("price", { valueAsNumber: true })} />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="discountPercent">Discount Percent</Label>
                            <Input id="discountPercent" placeholder="Rs. 5000" type="number" {...register("discountPercent", { valueAsNumber: true })} />
                        </LabelInputContainer>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="sports">Select Sports Category</Label>
                            <Controller
                                control={control}
                                name="category"
                                render={({ field:{onChange} }) => (
                                    <SelectInput Options={category} onOptionChange={onChange} className="w-full" placeholder="Ex. shoes or cloths"/>
                                )}
                            />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="stock">Quantity</Label>
                            <Input id="stock" placeholder="500" type="number" {...register("stock", { valueAsNumber: true })} />
                        </LabelInputContainer>
                    </div>
                    <LabelInputContainer>
                        <Label htmlFor="info">Additional Info</Label>
                        <InfoField info={info} setInfo={setInfo} />
                    </LabelInputContainer>
                </div>
                <div className="flex flex-col gap-4 flex-wrap">
                    <LabelInputContainer>
                        <Label htmlFor="images">Upload Reference Images</Label>
                        <Controller
                            control={control}
                            name="images"
                            render={({ field }) => (
                                <MultipleUploadImage
                                className="w-full"
                                setKeys={field.onChange} 
                                folder={"products"} 
                                id={"product"} 
                                keys={field.value || []} 
                                />
                            )}
                        />
                    </LabelInputContainer>
                    <div className="flex flex-wrap gap-2">
                        {images.length ? images.slice(0, expanded ? images.length : 5).map((item:string, index:number) => (
                            <div key={index} className="relative border border-white">
                                <img
                                    src={item}
                                    alt="image"
                                    className="w-40 h-40 z-0"
                                />
                                <span
                                    className="absolute right-0 top-0 z-10 p-1 rounded-full bg-slate-500"
                                    onClick={() => setValue("images", images.filter((image:string) => image !== item))}
                                >
                                    <RiDeleteBinLine />
                                </span>
                            </div>
                        )) : null}
                        {images.length > 5 && !expanded && (
                            <button onClick={toggleExpanded} className="w-40 h-40 border rounded-2xl flex items-center justify-center">
                                Show More
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 dark:bg-zinc-800 w-[20%] text-white rounded-xl h-14 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
            >
                Submit &rarr;
                <BottomGradient />
            </button>
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
    );
}


const InfoField = ({ info, setInfo }) => {
  const addInfo = () => {
    setInfo([...info, { key: '', value: '' }]);
  };

  const updateInfo = (index, field, value) => {
    const newInfo = [...info];
    newInfo[index][field] = value;
    setInfo(newInfo);
  };

  const removeInfo = (index) => {
    const newInfo = info.filter((_, i) => i !== index);
    setInfo(newInfo);
  };

  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      {info.map((item, index) => (
        <div key={index} className="flex gap-3 justify-center items-center">
          <Input
            type="text"
            placeholder="Key"
            value={item.key}
            onChange={(e) => updateInfo(index, 'key', e.target.value)}
          />
          <Input
            type="text"
            placeholder="Value"
            value={item.value}
            onChange={(e) => updateInfo(index, 'value', e.target.value)}
          />
          <FaTrash onClick={() => removeInfo(index)} />
        </div>
      ))}
      <Button type="button" variant="outline" onClick={addInfo} className="w-32">Add</Button>
    </div>
  );
};

export default InfoField;
