import {Footer} from "nextra-theme-blog";

const CustomFooter = () => {
    return (
        <>
            <Footer>
                <abbr
                    title="This site and all its content are licensed under a Creative Commons Attribution-NonCommercial 4.0 International License."
                    style={{cursor: 'help'}}
                >
                    CC BY-NC 4.0
                </abbr>{' '}
                {new Date().getFullYear()} © PHUCBM.
                <a href="/feed.xml" style={{float: 'right'}}>
                    RSS
                </a>
            </Footer>
        </>
    );
};

export default CustomFooter;