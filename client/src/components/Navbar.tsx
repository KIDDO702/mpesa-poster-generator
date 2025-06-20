function Navbar() {
    return (
        <>
            <nav className="sticky top-0 z-20 mx-auto border-b-2 bg-mpesa-white dark:bg-slate-950 border-mpesa-green backdrop-blur-md">
                <div className="py-4 mx-auto text-center text-white">
                    <h1 className="text-2xl font-bold text-mpesa-green dark:text-mpesa-green py-1">
                        M-pesa Poster Generator
                    </h1>
                </div>
            </nav>
        </>
    );
}

export default Navbar;