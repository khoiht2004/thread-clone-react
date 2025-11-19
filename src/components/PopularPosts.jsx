import { useState } from "react"
import { Link } from "react-router"
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
import CommentModal from "./CommentModal"

const icons = [
    { icon: ["far", "fa-heart"], number: "15,6K", type: "like" },
    { icon: ["far", "fa-comment"], number: "1,2K", type: "comment" },
    { icon: ["fas", "fa-repeat"], number: "687", type: "repost" },
    { icon: ["far", "fa-paper-plane"], number: "189", type: "share" }
]

function PopularPost({ post, onClick, currentUser }) {
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)

    const handlePostClick = (e) => {
        // Chỉ trigger onClick khi không click vào button action và không click vào username
        if (!e.target.closest('.action-buttons') && !e.target.closest('.username-link')) {
            onClick(post.userId, post.id)
        }
    }

    const handleActionClick = (e, actionType) => {
        e.stopPropagation() // Ngăn event bubble lên Card

        if (actionType === "comment") {
            setIsCommentModalOpen(true)
        } else {
            console.log(`Action ${actionType} on post ${post.id}`)
        }
    }

    const handleCommentSubmit = async (commentText) => {
        // Gửi comment lên server
        console.log("Submitting comment:", commentText, "for post:", post.id)

        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("Comment posted successfully")
                resolve()
            }, 1000)
        })
    }

    return (
        <>
            {/* <Separator className="bg-[rgba(255,255,255,0.1)]" /> */}

            <Card
                className="bg-transparent p-0 border-none cursor-pointer transition-colors"
                onClick={handlePostClick}
            >
                <CardHeader className="flex gap-5">
                    <Avatar className="size-9">
                        <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                    <div className="text-white">
                        <CardTitle>
                            <Link
                                to={`/@${post.userId}`}
                                className="username-link hover:underline"
                                onClick={(e) => e.stopPropagation()}
                            >
                                User {post.userId}
                            </Link>
                        </CardTitle>
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
                            onClick={(e) => handleActionClick(e, item.type)}
                        >
                            <FontAwesomeIcon size="lg" icon={item.icon} />{item.number}
                        </Button>
                    ))}
                </CardAction>
            </Card>

            <Separator className="bg-[rgba(255,255,255,0.1)]" />

            {/* Comment Modal */}
            <CommentModal
                open={isCommentModalOpen}
                onOpenChange={setIsCommentModalOpen}
                post={{
                    ...post,
                    userName: `User ${post.userId}`,
                    userAvatar: "https://github.com/shadcn.png",
                    time: "5 giờ"
                }}
                currentUser={currentUser || {
                    name: "_hatuan_khoy",
                    avatar: "https://i.pinimg.com/736x/0b/a7/c0/0ba7c012596101d0dc4310f666ac0ec3.jpg"
                }}
                onSubmit={handleCommentSubmit}
            />
        </>
    )
}

export default PopularPost