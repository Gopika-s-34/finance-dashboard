import { useLocation, Link } from "react-router-dom";

export default function Breadcrumbs() {
    const location = useLocation();

    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <div className="mb-4 text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-500">
                Home
            </Link>

            {pathnames.map((value, index) => {
                const to = "/" + pathnames.slice(0, index + 1).join("/");

                return (
                    <span key={to}>
                        {" / "}
                        <Link
                            to={to}
                            className={`capitalize ${index === pathnames.length - 1
                                    ? "font-semibold text-gray-800"
                                    : "hover:text-blue-500"
                                }`}
                        >
                            {value}
                        </Link>
                    </span>
                );
            })}
        </div>
    );
}