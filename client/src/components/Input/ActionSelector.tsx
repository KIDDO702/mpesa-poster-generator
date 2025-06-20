type ActionSelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

function ActionSelector({ value, onChange }: ActionSelectorProps) {
  return (
    <>
        <select value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-slate-100 text-slate-900 w-full px-3 py-2.5 rounded-lg dark:bg-slate-800 dark:text-slate-200 focus:outline-2 focus:outline-mpesa-green focus:outline-offset-2 border border-slate-200 dark:border-slate-700 transition-all duration-300 ease-in-out" 
          id="">
            <option value="send-money">Send Money</option>
            <option value="withdraw">Withdraw</option>
            <option value="lipa-na-mpesa">Lipa na Mpesa</option>
        </select>
    </>
  )
}

export default ActionSelector