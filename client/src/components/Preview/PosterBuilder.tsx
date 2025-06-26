import { useEffect, useState } from "react";
import DynamicFormSelector from "../Input/DynamicFormSelector";
import Preview from "./Preview";

function PosterBuilder() {
  const [formData, setFormData] = useState<{
    templateType: "send-money" | "withdraw-agent" | "lipa-na-mpesa";
    templateId: string;
    [key: string]: string | number | boolean;
  } | null>(null);

  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");

  useEffect(() => {
    const handleInject = (e: any) => {
      const { formData, templateType, selectedTemplateId } = e.detail;

      console.log("🎯 Puppeteer injection received:", e.detail);

      setFormData({
        ...formData,
        templateType,
        templateId: selectedTemplateId,
      });
      setSelectedTemplateId(selectedTemplateId);
    };

    window.addEventListener("puppeteer:inject", handleInject);
    return () => window.removeEventListener("puppeteer:inject", handleInject);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-start w-[90%] mx-auto lg:space-x-4 py-10">
      <div className="lg:w-[30%] w-full">
        <DynamicFormSelector onGenerate={setFormData} />
      </div>
      <div className="lg:w-[70%] w-full mt-7 lg:mt-0">
        <Preview
          formData={formData}
          selectedTemplateId={selectedTemplateId}
          onSelect={setSelectedTemplateId}
        />
      </div>
    </div>
  );
}

export default PosterBuilder;
