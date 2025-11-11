// FontAwesome import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

// React import
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Outlet } from "react-router";

function DefaultLayout() {
    return (
        <div className="px-5">
            <Navigation />
            <main className="mx-auto w-[638px] text-white">
                <div className="flex flex-col items-center ">
                    <Outlet />
                </div>
            </main>
            {/* Add posts button */}
            <Button className="fixed bottom-[3%] right-[3%] w-[82px] h-[68px] hover:scale-110 rounded-2xl outline outline-solid outline-[#77777790] cursor-pointer">
                <FontAwesomeIcon icon="fas fa-plus" className='fa-xl' />
            </Button>
        </div >
    )
}

export default DefaultLayout;