import MpesaLogo from "../../../assets/images/M-PESA-logo.png";
import SafaricomLogo from "../../../assets/images/SAF-MAIN-LOGO.png.jpg";

type Props = {
    agentNumber: string;
    storeNumber: string;
    agentName: string;
};

function ClassicWithdrawAgent({ agentNumber, storeNumber, agentName }: Props) {
  return (
    <div className="w-full border-4 border-mpesa-green">
        <div className="w-full py-6 text-center bg-mpesa-green">
            <img src={MpesaLogo} alt="logo" className="mx-auto w-[75%]" />
            <h3 className="mt-8 text-5xl tracking-wider uppercase league-spartan-bold text-mpesa-white">
                Withdraw Agent
            </h3>
        </div>
        <div className="py-5 text-center text-black bg-mpesa-white rounded-t-md">
            <div className="mt-7">
                <label className="text-2xl font-semibold uppercase">Agent Number</label>
                <div className="border-3 border-mpesa-red w-[60%] mx-auto flex items-center justify-center py-2 mt-1">
                    <p className="text-6xl tracking-[10px] league-spartan-bold text-center leading-none mt-2">
                        {agentNumber}
                    </p>
                </div>
            </div>

            <div className="mt-10">
                <label className="text-2xl font-semibold uppercase">Store Number</label>
                <div className="border-3 border-mpesa-red w-[60%] mx-auto flex items-center justify-center py-2 mt-1">
                    <p className="text-5xl tracking-[8px] league-spartan-bold text-center leading-none mt-2">
                        {storeNumber}
                    </p>
                </div>
            </div>

            <div className="mt-10">
                <label className="text-2xl font-semibold uppercase">Agent Name</label>
                <p className="text-5xl text-center mt-2 league-spartan-bold">
                    {agentName}
                </p>
            </div>

            <div className="flex items-center justify-between w-11/12 mx-auto mt-8">
                <hr className="flex-grow mr-4 border border-mpesa-green" />
                <img src={SafaricomLogo} alt="safaricom-logo" className="w-[150px]" />
            </div>
        </div>
    </div>
  )
}

export default ClassicWithdrawAgent