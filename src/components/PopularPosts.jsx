import {
    Card,
    CardAction,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "./ui/button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const icons = [
    { icon: ["far", "fa-heart"], number: "15,6K" },
    { icon: ["far", "fa-comment"], number: "1,2K" },
    { icon: ["fas", "fa-repeat"], number: "687" },
    { icon: ["far", "fa-paper-plane"], number: "189" }
]

function PopularPost({ post, onClick }) {
    const handlePostClick = (e) => {
        // Chỉ trigger onClick khi không click vào button action
        if (!e.target.closest('.action-buttons')) {
            onClick(post.userId, post.id)
        }
    }

    const handleActionClick = (e, actionType) => {
        e.stopPropagation();
        console.log(`Action ${actionType} on post ${post.id}`)
    }

    return (
        <>
            <Separator className="bg-[rgba(255,255,255,0.1)]" />
            <Card
                className="bg-transparent p-0 border-none cursor-pointer "
                onClick={handlePostClick}
            >
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
                <CardAction className="px-6 action-buttons">
                    {icons.map((item, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            className="text-[#777] hover:bg-[rgba(255,255,255,0.1)] hover:text-[#777] cursor-pointer rounded-3xl"
                            onClick={(e) => handleActionClick(e, item.icon[1])}
                        >
                            <FontAwesomeIcon size="lg" icon={item.icon} />{item.number}
                        </Button>
                    ))}
                </CardAction>
            </Card>
        </>
    )
}

export default PopularPost