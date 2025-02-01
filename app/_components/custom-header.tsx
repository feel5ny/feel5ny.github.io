import React from 'react';
import {Navbar, ThemeSwitch} from "nextra-theme-blog";
import {getPageMap} from "nextra/page-map";
import {Search} from "nextra/components";
import Logo from "./logo";

const CustomHeader = async () => {
    return (
        <>
            <div className="flex items-center justify-between">
                <Logo/>

                <div className="flex items-center">
                    <Navbar pageMap={await getPageMap()}/>
                    <Search/>
                    <ThemeSwitch/>
                </div>
            </div>
        </>
    );
};

export default CustomHeader;