export default function Header () {
    return (
        <header>
            <img  alt="logo"/>
            <h1 className="text-3xl text-center mt-8 mb-8 font-bold">Chelsofia's Recipe Site</h1>
            <nav>
                <ul className="flex justify-center gap-4 mt-4">
                    <li>
                        <a href="/" className=" hover:text-orange-500">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/about" className=" hover:text-orange-500">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="/contact" className=" hover:text-orange-500">
                            Contact
                        </a>
                    </li>
                </ul>       
            </nav>
        </header>
    )
}