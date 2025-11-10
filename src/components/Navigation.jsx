import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

// Thêm tất cả icon vào library
library.add(fas, far, fab)

import { NavLink } from "react-router";
import paths from '@/paths'

const styles = {
    link: {
        padding: "8px 15px",
        fontSize: "24px",
        borderRadius: "12px",
        color: "#99a1af", // Màu mặc định
        cursor: "pointer",
    },
    addPostBtn: {
        padding: "8px 15px",
        fontSize: "24px",
        borderRadius: "12px",
        color: "#99a1af",
        cursor: "pointer",
        backgroundColor: "rgba(255,255,255,0.08)",
    }
}

const items = [
    { path: paths.homePage, iconSolid: ['fas', 'house'], iconRegular: ['fas', 'house'] },
    { path: paths.searchPage, iconSolid: ['fas', 'magnifying-glass'], iconRegular: ['fas', 'magnifying-glass'] },
    { path: null, iconSolid: ['fas', 'plus'], iconRegular: ['fas', 'plus'] },
    { path: paths.activityPage, iconSolid: ['fas', 'heart'], iconRegular: ['far', 'heart'] },
    { path: paths.profilePage, iconSolid: ['fas', 'user'], iconRegular: ['far', 'user'] },
]

function Navigation() {

    return (
        <nav className="fixed top-0 left-0 bottom-0 text-white min-w-[70px] px-2 flex flex-col justify-between ">
            {/* Logo */}
            <section className="max-w-16 max-h-16">
                <NavLink to="/" className="mt-4 mb-6 flex justify-center">
                    <FontAwesomeIcon icon={['fab', 'threads']} size='3x' />
                </NavLink>
            </section>

            {/* Nav */}
            <section>
                <ul className="flex flex-col items-center gap-4">
                    {items.map((item, index) => (
                        <li className="my-1" key={index}>
                            <NavLink
                                to={item.path}
                                style={({ isActive }) => ({
                                    ...(item.path ? styles.link : styles.addPostBtn),
                                    color: isActive ? "#FFFFFF" : styles.link.color
                                })}
                                className="hover:bg-[rgba(255,255,255,0.08)]"
                                end={item.path === "/"}
                            >
                                {({ isActive }) => (
                                    <FontAwesomeIcon icon={isActive ? item.iconSolid : item.iconRegular} />
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Menu */}
            <section>
                <button style={styles.link} className="mb-5">
                    <FontAwesomeIcon icon={['fas', 'bars']} className='hover:text-white' />
                </button>
            </section>
        </nav>
    )
}

export default Navigation;