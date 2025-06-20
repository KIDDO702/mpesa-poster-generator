import ClassicSendMoney from "../Templates/SendMoney/ClassicSendMoney";

type Props = {
  formData: {
    phoneNumber: string;
    receiverName: string;
  } | null;
};

function Preview({ formData }: Props) {
  if (!formData) {
    return <div 
      className="p-5 overflow-auto text-center border-2 border-dashed rounded-md shadow-sm tw-full bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:shadow-md">
        No preview yet.
    </div>;
  }
   
  return (
    <>
      <div 
        className="w-full p-5 overflow-auto border-2 border-dashed rounded-md shadow-sm bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:shadow-md"
          style={{ height: "476px" }}>
        <div className="flex justify-center">
          <div className="scale-[0.33] sm:scale-[0.4] md:scale-[0.6] origin-top transform">
            <div id="poster-preview" className="w-[1123px] h-[794px]">
              <ClassicSendMoney 
                phoneNumber={formData.phoneNumber} 
                receiverName={formData.receiverName} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Preview