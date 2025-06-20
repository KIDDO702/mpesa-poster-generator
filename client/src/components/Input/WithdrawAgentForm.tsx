
function WithdrawAgentForm() {
  return (
    <>
      <form>
        <div className="w-full">
          <label htmlFor="agent-number" className="league-spartan-medium text-slate-600 dark:text-slate-300">Agent Number</label>
          <input type="text" id="agent-number" placeholder="123456"
            className="w-full px-3 py-2 border rounded-lg border-slate-200 bg-slate-100 dark:bg-slate-800 dark:border-slate-700 placeholder:dark:text-slate-400 focus:outline focus:outline-offset-2 focus:outline-mpesa-green" />
        </div>
        <div className="w-full mt-7">
          <label htmlFor="store-number" className="league-spartan-medium text-slate-600 dark:text-slate-300">Store Number</label>
          <input type="text" id="store-number" placeholder="123456"
            className="w-full px-3 py-2 border rounded-lg border-slate-200 bg-slate-100 dark:bg-slate-800 dark:border-slate-700 placeholder:dark:text-slate-400 focus:outline focus:outline-offset-2 focus:outline-mpesa-green" />
        </div>
        <div className="w-full mt-7">
          <label htmlFor="receiverName">Reciever Name</label>
          <input type="text" id="receiverName" placeholder="Italeta Jina Gani ?"
            className="w-full px-3 py-2 border rounded-lg border-slate-200 bg-slate-100 dark:bg-slate-800 dark:border-slate-700 placeholder:dark:text-slate-400 focus:outline focus:outline-offset-2 focus:outline-mpesa-green" />
        </div>
        <div className="mt-8">
          <button type="submit" className="px-3 py-2 rounded-lg bg-mpesa-green text-mpesa-white hover:bg-mpesa-red">
            Generate Poster
          </button>
        </div>
      </form>
    </>
  )
}

export default WithdrawAgentForm