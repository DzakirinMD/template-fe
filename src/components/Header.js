import Link from 'next/link';

const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto">
                <Link href="/">
                    <h1 className="text-xl">Template FE</h1>
                </Link>
            </div>
        </header>
    );
};

export default Header;
