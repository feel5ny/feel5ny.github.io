import React from 'react';
import Logo from "@/components/logo";
import {Search} from "nextra/components";

const CustomHeader = async () => {
    return (
        <div className="custom-header flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
                <Logo/>
                <span className="font-bold">Felix</span>
            </div>


            <div>
                <Search placeholder="Search posts..."/>
            </div>
        </div>
    );
};

export default CustomHeader;