import MpesaLogo from "../../../assets/images/M-PESA-logo.png";
import SafaricomLogo from "../../../assets/images/SAF-MAIN-LOGO.png.jpg";

type Props = {
  agentNumber: string;
  storeNumber: string;
  agentName: string;
};

function BoxedWithdrawAgent({ agentNumber, storeNumber, agentName }: Props) {
  const renderBoxDigits = (value: string) =>
    (value || "").split("").map((digit, index) => (
      <div
        key={index}
        className="w-20 h-20 flex items-center justify-center border-3 border-mpesa-red text-5xl font-ds-digital text-black"
      >
        {digit}
      </div>
    ));

  return (
    <div className="w-full border-2 border-mpesa-green">
      <div className="w-full py-6 text-center bg-mpesa-green">
        <img src={MpesaLogo} alt="M-PESA logo" className="mx-auto w-[75%]" />
        <h3 className="mt-8 text-5xl tracking-wider uppercase league-spartan-bold text-mpesa-white">
          Withdraw Agent
        </h3>
      </div>

      <div className="py-5 text-center text-black bg-mpesa-white rounded-t-md">
        {/* Agent Number */}
        <div className="mt-7">
          <label className="text-2xl font-semibold uppercase">Agent Number</label>
          <div className="w-[80%] mx-auto flex flex-wrap justify-center gap-3 py-2 mt-1 orbitron-black">
            {renderBoxDigits(agentNumber || "123456")}
          </div>
        </div>

        {/* Store Number */}
        <div className="mt-10">
          <label className="text-2xl font-semibold uppercase">Store Number</label>
          <div className="w-[80%] mx-auto flex flex-wrap justify-center gap-3 py-2 mt-1 orbitron-black">
            {renderBoxDigits(storeNumber || "654321")}
          </div>
        </div>

        {/* Agent Name */}
        <div className="mt-10">
          <label className="text-2xl font-semibold uppercase">Agent Name</label>
          <p className="text-5xl text-center mt-2 league-spartan-bold">
            {agentName || "John Doe"}
          </p>
        </div>

        <div className="flex items-center justify-between w-11/12 mx-auto mt-8">
          <hr className="flex-grow mr-4 border border-mpesa-green" />
          <img src={SafaricomLogo} alt="Safaricom logo" className="w-[150px]" />
        </div>
      </div>
    </div>
  );
}

export default BoxedWithdrawAgent;
