import { Button, Tooltip } from "@mui/material";
import { useEffect, useState, useCallback, useMemo } from "react";
import { FiSearch } from "react-icons/fi";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Filter = () => {
    const [searchParams] = useSearchParams();
    const pathname = useLocation().pathname;
    const navigate = useNavigate();

    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    // Use useMemo to cache URLSearchParams construction
    const params = useMemo(() => new URLSearchParams(searchParams), [searchParams]);

    useEffect(() => {
        const currentSortOrder = searchParams.get("sortby") || "asc";
        const currentSearchTerm = searchParams.get("keyword") || "";

        setSortOrder(currentSortOrder);
        setSearchTerm(currentSearchTerm);
    }, [searchParams]);

    // Debounced search with useEffect
    useEffect(() => {
        const handler = setTimeout(() => {
            const newParams = new URLSearchParams(searchParams);
            if (searchTerm) {
                newParams.set("keyword", searchTerm);
            } else {
                newParams.delete("keyword");
            }
            navigate(`${pathname}?${newParams.toString()}`);
        }, 700);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, searchParams, navigate, pathname]);

    // Use useCallback to memoize the toggle function
    const toggleSortOrder = useCallback(() => {
        setSortOrder((prevOrder) => {
            const newOrder = (prevOrder === "asc") ?  "desc" : "asc";
            const newParams = new URLSearchParams(searchParams);
            newParams.set("sortby", newOrder);
            navigate(`${pathname}?${newParams.toString()}`);
            return newOrder;
        });
    }, [searchParams, navigate, pathname]);

    // Memoize search input change handler
    const handleSearchChange = useCallback((e) => {
        setSearchTerm(e.target.value);
    }, []);

    return (
        <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
            {/* SEARCH BAR */}
            <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
                <input
                    type="text"
                    placeholder="Search Products"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]"/>
                <FiSearch className="absolute left-3 text-slate-800 size={20}"/>
            </div>

            {/* SORT BUTTON */}
            <div className="flex sm:flex-row flex-col gap-4 items-center">
                <Tooltip title={`Price: ${sortOrder === "asc" ? "Low to High" : "High to Low"}`}>
                    <Button variant="contained" 
                        onClick={toggleSortOrder}
                        color="primary" 
                        className="flex items-center gap-2 h-10">
                        Price
                        {sortOrder === "asc" ? (
                            <FaArrowUp size={16} />
                        ) : (
                            <FaArrowDown size={16} />
                        )}
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
}

export default Filter;