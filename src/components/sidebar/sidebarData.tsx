import {
    AiFillCaretDown,
    AiFillCaretUp,
    AiOutlineHome,
    AiOutlineUser
} from 'react-icons/ai';
import { SidebarItem} from "../../api/Interface";
import { IoHomeOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { FiPrinter } from "react-icons/fi";

export const SidebarData: SidebarItem[] = [

    {
        title: 'Overview',
        path: '/overview',
        icon: <AiOutlineHome />,
        iconClosed: <AiFillCaretDown />,
        iconOpened: <AiFillCaretUp />,
        subnav: [
            {
                title: 'Users',
                path: '/user',
                icon: <AiOutlineUser />
            },
           /* {
                title: 'Profile',
                path: '/profile',
                icon: <IoSettingsOutline />
            },*/
        ]
    },
    {
        title: 'Profile',
        path: '/profile',
        icon: <IoSettingsOutline />
    },
    {
        title: 'Home',
        path: '/home',
        icon: <IoHomeOutline />
    },
    {
        title: 'Printer',
        path: '/printer',
        icon: <FiPrinter />
    },
];