import MpesaLogo from "../../../assets/images/M-PESA-logo.png";
import SafaricomLogo from "../../../assets/images/SAF-MAIN-LOGO.png.jpg";


function ClassicSendMoney() {
  return (
    <div className="w-full border-2 border-mpesa-green">
        <div className="w-full bg-mpesa-green py-5 text-center">
            <img src={MpesaLogo} alt="logo" className="mx-auto w-[80%]" />
            <h3 className="league-spartan-bold uppercase text-5xl tracking-wider text-mpesa-white mt-6">
                Send Money
            </h3>
        </div>
        <div className="bg-mpesa-white py-5 text-center text-black rounded">
            <div className="mt-7">
                <label htmlFor="phoneNumbe" className="font-semibold text-2xl uppercase">Phone Number</label>
                <div className="border-3 border-mpesa-red w-[80%] mx-auto flex items-center justify-center py-2 mt-1">
                    <p className="text-6xl tracking-[15px] league-spartan-bold text-center leading-none mt-2">0742459215</p>
                </div>
            </div>
            <div className="mt-10">
                <label htmlFor="recieverName" className="font-semibold text-2xl uppercase">
                    Receiver Name (Iteleta Jina Gani)
                </label>
                <div className="mt-1.5">
                    <p className="text-5xl league-spartan-bold text-center">Robert Ochieng</p>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between w-11/12 mx-auto">
                <hr className="flex-grow border border-mpesa-green mr-4" />
                <img src={SafaricomLogo} alt="safaricom-logo" className="w-[150px]" />
            </div>
        </div>
    </div>
  )
}

export default ClassicSendMoney