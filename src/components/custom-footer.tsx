import {Footer, ThemeSwitch} from "nextra-theme-blog";
import {getPageMap} from "nextra/page-map";
import {Navbar} from "@/components/navbar";
import {Search} from "nextra/components";
import React from "react";

const CustomFooter = async () => {
    return (
        <Footer>
            <div className="space-y-6">
                <Navbar pageMap={await getPageMap()}/>

                <div className="flex justify-between items-center gap-4">
                    <div className="flex gap-2 items-center">
                        <ThemeSwitch/>
                        <div>
                            © {new Date().getFullYear()} Felix
                        </div>
                    </div>
                    <Search placeholder="Search posts..."/>
                </div>
            </div>
        </Footer>
    );
};

export default CustomFooter;