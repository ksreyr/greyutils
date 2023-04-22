import * as React from "react";
import {UIContext} from "@/context/UIContext";
import {Structur} from "@/components/structur";
import {DashBoadContent} from "@/components/DashBoadContent";

function DashboardContent() {
    const {openMenu: open, dispatch} =
        React.useContext(UIContext);

    return (
        <Structur>
            <DashBoadContent/>
        </Structur>
    );
}

export default function Home() {
    return <DashboardContent/>;
}