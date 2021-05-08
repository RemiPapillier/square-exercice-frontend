import { Link } from 'react-router-dom';

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <Link data-testid="logo" to ="/">
                <h1>SquareSense</h1>
            </Link>
            <div className="links">
                <Link data-testid="occupancy" to="/">Occupancy</Link>
                <Link data-testid="simulation" to="/simulate">Simulation</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;