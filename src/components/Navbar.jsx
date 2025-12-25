import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<div>
			<div>
				<Link to="/">
					<img
						src="../images/movie-full-logo.png"
						alt="logo"
						className="w-[150px]"
					/>
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
