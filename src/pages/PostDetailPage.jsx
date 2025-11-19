import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router"
import Heading from "@/components/Heading"
import {
    Card,
    CardAction,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const icons = [
    { icon: ["far", "fa-heart"], number: "15,6K" },
    { icon: ["far", "fa-comment"], number: "1,2K" },
    { icon: ["fas", "fa-repeat"], number: "687" },
    { icon: ["far", "fa-paper-plane"], number: "189" }
]

function PostDetailPage() {
    const { postId } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                setLoading(true)
                setError(null)

                // Fetch post details
                const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
                if (!postResponse.ok) throw new Error("Không tìm thấy bài post")
                const postData = await postResponse.json()

                // Fetch comments
                const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
                if (!commentsResponse.ok) throw new Error("Không tải được bình luận")
                const commentsData = await commentsResponse.json()

                setPost(postData)
                setComments(commentsData)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchPostAndComments()
    }, [postId])

    if (loading) {
        return (
            <>
                <Heading title="Chi tiết bài viết" />
                <Card className="bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)] p-6">
                    <div className="text-center text-[#777]">Đang tải...</div>
                </Card>
            </>
        )
    }

    if (error || !post) {
        return (
            <>
                <Heading title="Chi tiết bài viết" />
                <Card className="bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)] p-6">
                    <div className="text-center text-red-400">{error || "Không tìm thấy bài post"}</div>
                    <div className="text-center mt-4">
                        <Button onClick={() => navigate(-1)}>Quay lại</Button>
                    </div>
                </Card>
            </>
        )
    }

    return (
        <>
            <Heading title="Thread" />

            <Card className="bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)]">
                {/* Nút quay lại */}
                <div className="px-6">
                    <Button
                        variant="ghost"
                        className="text-[#777] hover:bg-[rgba(255,255,255,0.1)] hover:text-[#777] cursor-pointer rounded-3xl"
                        onClick={() => navigate(-1)}
                    >
                        <FontAwesomeIcon icon={["fas", "fa-arrow-left"]} className="mr-2" />
                        Quay lại
                    </Button>
                </div>

                <Separator className="bg-[rgba(255,255,255,0.1)]" />

                {/* Bài post chính */}
                <CardHeader className="flex gap-5">
                    <Avatar className="size-9">
                        <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                    <div className="text-white w-full">
                        <CardTitle>User {post.userId}</CardTitle>
                        <CardDescription className="text-indigo-100 text-[15px] mt-2">
                            {post.body}
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardAction className="px-6">
                    {icons.map((item, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            className="text-[#777] hover:bg-[rgba(255,255,255,0.1)] hover:text-[#777] cursor-pointer rounded-3xl"
                        >
                            <FontAwesomeIcon size="lg" icon={item.icon} />{item.number}
                        </Button>
                    ))}
                </CardAction>

                <Separator className="bg-[rgba(255,255,255,0.1)] my-4" />

                {/* Danh sách bình luận */}
                <CardContent className="space-y-4">
                    <h3 className="text-white font-semibold text-lg px-2">
                        Bình luận ({comments.length})
                    </h3>

                    {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3 p-3 rounded-lg hover:bg-[rgba(255,255,255,0.02)]">
                            <Avatar className="size-8">
                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.email}`} />
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <Link
                                        to={`/@${comment.id}`}
                                        className="text-white font-medium text-sm hover:underline"
                                    >
                                        {comment.name}
                                    </Link>
                                    <span className="text-[#777] text-xs">{comment.email}</span>
                                </div>
                                <p className="text-indigo-100 text-sm">{comment.body}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </>
    )
}

export default PostDetailPage