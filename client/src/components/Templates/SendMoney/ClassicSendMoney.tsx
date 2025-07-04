import MpesaLogo from "../../../assets/images/M-PESA-logo.png";
import SafaricomLogo from "../../../assets/images/SAF-MAIN-LOGO.png.jpg";

type Props = {
    phoneNumber: string;
    receiverName: string;
}

function ClassicSendMoney({ phoneNumber, receiverName }: Props) {

  return (
    <div className="w-full h-full border-4 border-mpesa-green">
        <div className="w-full py-6 text-center bg-mpesa-green">
            <img src={MpesaLogo} alt="logo" className="mx-auto w-[85%]" />
            <h3 className="mt-8 text-5xl tracking-wider uppercase league-spartan-bold text-mpesa-white">
                Send Money
            </h3>
        </div>
        <div className="py-5 text-center text-black bg-mpesa-white rounded-t-md">
            <div className="mt-7">
                <label htmlFor="phoneNumbe" className="text-2xl font-semibold uppercase">Phone Number</label>
                <div className="border-3 border-mpesa-red w-[80%] mx-auto flex items-center justify-center py-2 mt-1">
                    <p className="text-6xl tracking-[15px] league-spartan-bold text-center leading-none mt-2">
                        { phoneNumber || "0712345678" }
                    </p>
                </div>
            </div>
            <div className="mt-12">
                <label htmlFor="recieverName" className="text-2xl font-semibold uppercase">
                    Receiver Name (Iteleta Jina Gani)
                </label>
                <div className="mt-2">
                    <p className="text-5xl text-center league-spartan-bold">
                        { receiverName || "Bob Developer" }
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between w-11/12 mx-auto mt-16">
                <hr className="flex-grow mr-4 border border-mpesa-green" />
                <img src={SafaricomLogo} alt="safaricom-logo" className="w-[150px]" />
            </div>
        </div>
    </div>
  )
}

export default ClassicSendMoney