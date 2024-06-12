import { useMemo, useState, useEffect } from "react";

export default function Categories({ data, setArrToBeRender }) {
    const [activeItem, setActiveItem] = useState("All");
    useEffect(() => {
        let arrToRender;
        if (activeItem === "Achieved") {
            arrToRender = arrAchieved;
        } else if (activeItem === "Not Achieved") {
            arrToRender = arrNotAchieved;
        } else {
            arrToRender = data;
        }
        setArrToBeRender(arrToRender);
    }, [activeItem, data, setArrToBeRender]);
    const handleItemClick = (item) => {
        setActiveItem(item);
    };
    const arrAchieved = useMemo(() => {
        return data.filter((el) => el.categories.includes("Achieved"));
    }, [data]);
    const arrNotAchieved = useMemo(() => {
        return data.filter((el) => el.categories.includes("Not Achieved"));
    }, [data]);
    return (
        <>
            <div className="box-nav">
                <div
                    className={activeItem === "All" ? "active" : ""}
                    onClick={() => handleItemClick("All")}
                >
                    All
                </div>
                <div
                    className={activeItem === "Achieved" ? "active" : ""}
                    onClick={() => handleItemClick("Achieved")}
                >
                    Achieved
                </div>
                <div
                    className={activeItem === "Not Achieved" ? "active" : ""}
                    onClick={() => handleItemClick("Not Achieved")}
                >
                    Not Achieved
                </div>
            </div>
        </>
    );
}
