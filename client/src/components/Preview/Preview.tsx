import ClassicSendMoney from "../Templates/SendMoney/ClassicSendMoney";

function Preview() {
  return (
    <>
      <div className="w-full p-5 border-2 border-dashed rounded-md bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700 shadow-sm dark:shadow-md overflow-auto">
        <div className="flex justify-center">
          <div className="scale-[0.6] origin-top">
            <div id="poster-preview" className="w-[1123px] h-[794px]">
              <ClassicSendMoney />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Preview