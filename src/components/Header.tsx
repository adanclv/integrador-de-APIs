import { Link } from "react-router-dom";

export const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-md py-6 px-8 flex justify-between items-center">
            <Link to='/' className="text-3xl font-bold text-blue-600">🌐 Integrador de APIs</Link>
            <nav className="space-x-4">
                <Link to="/weather" className="text-blue-600 hover:text-blue-800 font-medium transition">Clima</Link>
                <Link to="/news" className="text-blue-600 hover:text-blue-800 font-medium transition">Noticias</Link>
                <Link to="/pop" className="text-blue-600 hover:text-blue-800 font-medium transition">Población</Link>
                <Link to="/currency" className="text-blue-600 hover:text-blue-800 font-medium transition">Divisas</Link>
                <Link to="/todo" className="text-blue-600 hover:text-blue-800 font-medium transition">To-Do</Link>
            </nav>
        </header>
    );
}