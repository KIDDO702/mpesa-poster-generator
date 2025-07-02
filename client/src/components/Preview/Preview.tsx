import axios from "axios";
import { useEffect, useState } from "react";
import { templateRegistry } from "../Templates/templateRegistry";
import { FaRegFilePdf } from "react-icons/fa6";
import { FaRegFileImage } from "react-icons/fa";
import { ClockLoader, ScaleLoader } from "react-spinners";
import TemplateSelector from "../Templates/TemplateSelector";
// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

type Props = {
  formData:
    | {
        templateType: "send-money" | "withdraw-agent" | "lipa-na-mpesa";
        [key: string]: string | number | boolean;
      }
    | null;
  selectedTemplateId: string;
  onSelect: (id: string) => void;
};

function Preview({ formData, selectedTemplateId, onSelect }: Props) {
  const templateType = formData?.templateType;
  const availableTemplates = templateType ? templateRegistry[templateType] || [] : [];
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "generating" | "downloading">("idle");
  const [ pdfDownloadStatus, setPdfDownloadStatus] = useState<"idle" | "generating" | "downloading">("idle");


  useEffect(() => {
    // Set default template only if none selected
    if (templateType && !selectedTemplateId) {
      const defaultId = templateRegistry[templateType]?.[0]?.id || "";
      onSelect(defaultId);
    }
  }, [templateType, selectedTemplateId, onSelect]);

  if (!formData) {
    return (
      <div className="p-5 overflow-auto text-center border-2 border-dashed rounded-md shadow-sm tw-full bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:shadow-md">
        No preview yet.
      </div>
    );
  }

  const selectedTemplate = availableTemplates.find(
    (template) => template.id === selectedTemplateId
  );

  const TemplateComponent = selectedTemplate?.component;

  const handleDownloadImage = async () => {
    console.log("generating image ...");
    if (!formData || !selectedTemplate) {
      alert("Please generate a poster and select a template first.");
      return;
    }

    try {
      setDownloadStatus("generating");
      const response = await axios.post(`/api/handle-image-download`, {
        formData,
        templateType: formData.templateType,
        selectedTemplateId
      },
      {
        responseType: "blob", // Ensure we get a Blob response
        headers: {
          "Content-Type": "application/json",
        },
      });

      setDownloadStatus("downloading");

      console.log("downloading image ...");
      const url = URL.createObjectURL(response.data)
      const link = document.createElement("a");

      link.href= url;

      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const name = formData.agentName || formData.receiverName || "unknown-user";
      const filename = `${selectedTemplateId}__${name.toString().replace(/\s+/g, "-")}__${timestamp}.jpg`;
      
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Download Failed: ", error);
      alert("Failed to download image. Please try again.");
    } finally {
      setDownloadStatus("idle");
    }
  };

  const handleDownloadPDF = async () => {
    if (!formData || !selectedTemplate) {
      alert("Please generate a poster and select a template first.");
      return;
    }
  
    try {
      setPdfDownloadStatus("generating");
      const response = await axios.post(
        `/api/handle-pdf-download`,
        {
          formData,
          templateType: formData.templateType,
          selectedTemplateId,
        },
        {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      // ✅ Custom filename logic
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const name = formData.agentName || formData.receiverName || "unknown-user";
      const filename = `${selectedTemplateId}__${name.toString().replace(/\s+/g, "-")}__${timestamp}.pdf`;
  
      setPdfDownloadStatus("downloading");
      const blobUrl = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename; // ✅ guaranteed to work in all modern browsers
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("PDF Download Failed: ", error);
      alert("Failed to download PDF. Please try again.");
    } finally {
      setPdfDownloadStatus("idle");
    }
  };
  
  return (
    <>
      <div className="w-full overflow-auto border-2 border-dashed rounded-md shadow-sm bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:shadow-md"
        style={{ height: "600px" }}>

        {/* Download Buttons */}
        <div className="sticky top-0 z-10 bg-slate-100 dark:bg-slate-800 py-4 px-4 flex flex-col items-center gap-3 w-full border-b border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex justify-center gap-4">
          <button
            onClick={handleDownloadPDF}
            disabled={pdfDownloadStatus !== "idle"}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 text-sm md:text-base ${
              pdfDownloadStatus !== "idle"
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-mpesa-red text-mpesa-white hover:bg-mpesa-green"
            }`}
          >
            {pdfDownloadStatus === "generating" && <ClockLoader size={20} color="white" />}
            {pdfDownloadStatus === "downloading" && <ScaleLoader height={20} color="white" radius={2} />}
            {pdfDownloadStatus === "idle" && <FaRegFilePdf className="md:text-lg" />}

            {pdfDownloadStatus === "generating"
              ? "Generating..."
              : pdfDownloadStatus === "downloading"
              ? "Downloading..."
              : "Download PDF"}
          </button>

          <button
            onClick={handleDownloadImage}
            disabled={downloadStatus !== "idle"}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 text-sm md:text-base ${
              downloadStatus !== "idle"
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-mpesa-red text-mpesa-white hover:bg-mpesa-green"
            }`}
          >     
            {/* Show spinner only when busy */}
            { downloadStatus === "generating" && <ClockLoader size={20} color="white" />}
            { downloadStatus === "downloading" && <ScaleLoader height={20} color="white" radius={2} />}
            { downloadStatus === "idle" && <FaRegFileImage className="md:text-lg" />}

            {/* Icon and label */}
            { downloadStatus === "generating"
              ? "Generating..."
              : downloadStatus === "downloading"
              ? "Downloading..."
              : "Download Image"}
          </button>
          </div>
          {/* ✅ Helpful Note Below Buttons */}
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl text-center">
            <span className="font-semibold">Tip:</span> Use <span className="font-semibold">PDF</span> format for printing (A4 landscape) — it fits perfectly on paper. Choose <span className="font-semibold">Image</span> if you're sending the poster to a graphic designer or using it in other design tools.
          </p>

        </div>

        {/* Poster Preview Centered */}
        <div className="flex justify-center max-h-[250px] md:max-h-[430px] py-4 md:py-8">
          <div className="scale-[0.3] sm:scale-[0.5] md:scale-[0.6] origin-top transform px-4 md:px-0">
            <div id="poster-preview" className="w-[1123px] h-[794px] bg-white overflow-hidden box-border">
              {TemplateComponent && <TemplateComponent {...formData} />}
            </div>
          </div>
        </div>

        {/* Template Selector */}
        <div className="mt-5 md:mt-32 flex justify-center pb-5">
          <TemplateSelector
            templateType={templateType ?? "send-money"}
            selectedTemplateId={selectedTemplateId}
            onSelect={onSelect}
            formData={formData}
          />
        </div>
      </div>
    </>
  );
}

export default Preview;
