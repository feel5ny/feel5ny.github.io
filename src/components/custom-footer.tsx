import {Footer, ThemeSwitch} from "nextra-theme-blog";
import {getPageMap} from "nextra/page-map";
import {Navbar} from "@/components/navbar";

const CustomFooter = async () => {
    return (
        <Footer>
            <div className="flex justify-between items-center">

                {/*left*/}
                <div className="flex justify-between items-center gap-2">
                    <ThemeSwitch/>
                    <Navbar pageMap={await getPageMap()}/>
                </div>

                {/*right*/}
                <div>
                    © {new Date().getFullYear()} Felix
                </div>
            </div>
        </Footer>
    );
};

export default CustomFooter;