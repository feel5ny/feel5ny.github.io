import React from 'react';
import {ThemeSwitch} from "nextra-theme-blog";
import {getPageMap} from "nextra/page-map";
import {Search} from "nextra/components";
import Logo from "./logo";
import {Navbar} from "./navbar";

const CustomHeader = async () => {
    return (
        <>
            <div className="custom-header flex items-center justify-between mb-10">
                <Logo/>

                <div className="flex items-center gap-5">
                    <Navbar pageMap={await getPageMap()}/>
                    <Search/>
                    <ThemeSwitch/>
                </div>
            </div>
        </>
    );
};

export default CustomHeader;