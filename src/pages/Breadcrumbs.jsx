import { ArrowRight, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    const isMongodbId = (value) => /^[0-9a-fA-F]{24}$/.test(value);
    return (
        <div className="text-sm  p-4">
            <nav className="flex space-x-1 items-center">
                <Link to={"/"} className="flex items-center gap-3">
                    Home <ChevronRight size={20} />
                </Link>

                {pathnames.map((value, index) => {
                    if (isMongodbId(value)) return null;

                    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathnames.length - 1;

                    return (
                        <span key={to} className="flex items-center space-x-1">
                            <ArrowRight />
                            {isLast ? (
                                <span>{decodedURIComponent(value)}</span>
                            ) : (
                                <Link to={to}>{decodeURIComponent(value)}</Link>
                            )}
                        </span>
                    );
                })}
            </nav>
        </div>
    );
};

export default Breadcrumbs;
