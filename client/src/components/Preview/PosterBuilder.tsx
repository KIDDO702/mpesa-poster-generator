import { useState } from "react";
import DynamicFormSelector from "../Input/DynamicFormSelector";
import Preview from "./Preview";

function PosterBuilder() {
    const [formData, setFormData] = useState<{
        phoneNumber: string;
        receiverName: string;
        templateType: string;
        templateId: string;
      } | null>(null);
  return (
    <>
        <div className="flex flex-col lg:flex-row items-start w-[90%] mx-auto lg:space-x-4 py-10">
            <div className="lg:w-[35%] w-full">
                <DynamicFormSelector onGenerate={setFormData} />
            </div>        
            <div className="lg:w-[65%] w-full mt-7 lg:mt-0">
                <Preview formData={formData} />
            </div>
        </div>
    </>
  )
}

export default PosterBuilder