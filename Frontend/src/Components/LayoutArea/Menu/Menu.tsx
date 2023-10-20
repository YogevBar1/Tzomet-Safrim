import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<NavLink to="/home">Home</NavLink>
            <span> | </span>
			<NavLink to="/search-books">Search</NavLink>
            <span> | </span>
			<NavLink to="/add-book">Add Book</NavLink>
        </div>
    );
}

export default Menu;
