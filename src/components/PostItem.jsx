// Shacdn import
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// FontAwesome import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

// React import
import { useEffect, useState } from "react"
import { Button } from "./ui/button"


const icons = [
    { icon: ["far", "fa-heart"], number: "15,6K" },
    { icon: ["far", "fa-comment"], number: "1,2K" },
    { icon: ["fas", "fa-repeat"], number: "687" },
    { icon: ["far", "fa-paper-plane"], number: "189" }
]


function PostItem() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
            .then(res => res.json())
            .then(response => {
                setPosts(response)
                setLoading(false)
            })
    }, [])

    if (loading) return <div>Đang tải...</div>

    return (
        <>
            <Card className="bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)] ">
                <div className="flex items-center justify-between px-6">
                    <Avatar className="size-9 ">
                        <AvatarImage src="https://i.pinimg.com/736x/0b/a7/c0/0ba7c012596101d0dc4310f666ac0ec3.jpg" />
                    </Avatar>

                    <p className="flex-1 px-3 text-md text-[#777]">Có gì mới?</p>
                    <Button className="outline-solid outline outline-[#77777790]">Đăng</Button>
                </div>

                {posts.map((post) => (
                    <>
                        <Separator className="bg-[rgba(255,255,255,0.1)]" />

                        <CardHeader className="flex gap-5">
                            <Avatar className="size-9">
                                <AvatarImage src="https://github.com/shadcn.png" />
                            </Avatar>
                            <div className="text-white">
                                <CardTitle>User {post.userId}</CardTitle>
                                <CardDescription className="text-indigo-100 text-[15px] text-ellipsis" >
                                    {post.body}
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardAction className="px-6">
                            {icons.map((item, index) => (
                                <>
                                    <Button key={index} variant="ghost" className="text-[#777] hover:bg-[rgba(255,255,255,0.1)] hover:text-[#777]">
                                        <FontAwesomeIcon size="lg " icon={item.icon} />{item.number}
                                    </Button>
                                </>
                            ))}
                        </CardAction>
                    </>
                ))}
            </Card>
        </>
    )
}

export default PostItem;