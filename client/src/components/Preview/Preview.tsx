import { useState, useEffect } from "react";
import { templateRegistry } from "../Templates/templateRegistry";
import { FaRegFilePdf } from "react-icons/fa6";
import { FaRegFileImage } from "react-icons/fa";
import TemplateSelector from "../Templates/TemplateSelector";

type Props = {
  formData:
    | {
        templateType: "send-money" | "withdraw-agent" | "lipa-na-mpesa";
        [key: string]: string | number | boolean; // allows extra fields like phoneNumber, agentName, etc.
      }
    | null;
};
function Preview({ formData }: Props) {
  const templateType = formData?.templateType;
  const availableTemplates = templateType ? templateRegistry[templateType] || [] : [];

  const [selectedTemplateId, setSelectedTemplateId] = useState(
    availableTemplates[0]?.id || ""
  );

  useEffect(() => {
    // Reset template when templateType changes
    if (templateType) {
      const defaultId = templateRegistry[templateType]?.[0]?.id || "";
      setSelectedTemplateId(defaultId);
    }
  }, [templateType]);

  if (!formData) {
    return <div 
      className="p-5 overflow-auto text-center border-2 border-dashed rounded-md shadow-sm tw-full bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:shadow-md">
        No preview yet.
    </div>;
  }

  const selectedTemplate = availableTemplates.find(
    (template) => template.id === selectedTemplateId
  );

  const TemplateComponent = selectedTemplate?.component;
   
  return (
    <>
      <div className="w-full overflow-auto border-2 border-dashed rounded-md shadow-sm bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:shadow-md"
         style={{ height: "600px" }}>

        {/* Download Buttons */}
        <div className="sticky top-0 z-10 bg-slate-100 dark:bg-slate-800 py-4 px-4 flex justify-center gap-4 w-full border-b border-slate-200 dark:border-slate-700 shadow-sm">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-mpesa-red text-mpesa-white rounded-md hover:bg-mpesa-green transition-colors duration-200 cursor-pointer text-sm md:text-base"
          >
            <FaRegFilePdf className="md:text-lg" />
            Download PDF
          </button>

          <button
            className="flex items-center gap-2 px-4 py-2 bg-mpesa-red text-mpesa-white rounded-md hover:bg-mpesa-green transition-colors duration-200 cursor-pointer text-sm md:text-base"
          >
            <FaRegFileImage className="md:text-lg" />
            Download Image
          </button>
        </div>
    
        {/* Poster Preview Centered */}
        <div className="flex justify-center max-h-[250px] md:max-h-[430px] py-4 md:py-8">
          <div className="scale-[0.3] sm:scale-[0.5] md:scale-[0.6] origin-top transform px-4 md:px-0">
            <div id="poster-preview" className="w-[1123px] h-[794px]">
              {TemplateComponent && <TemplateComponent {...formData} />}
              {/* <ClassicWithdrawAgent agentNumber="12345" storeNumber="67890" agentName="John Doe" /> */}
            </div>
          </div>
        </div>


        {/* Template Selector BELOW, centered */}
        <div className="md:mt-16 flex justify-center pb-5">
          <TemplateSelector
            templateType={templateType ?? "send-money"}
            selectedTemplateId={selectedTemplateId}
            onSelect={(id) => setSelectedTemplateId(id)}
            formData={formData}
          />
        </div>
      </div>
    </>
  )
}

export default Preview