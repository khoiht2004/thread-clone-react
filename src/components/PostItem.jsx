import {
    Card,
} from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Button } from "./ui/button"
import PopularPost from "./PopularPosts"

library.add(fas, far, fab)

function PostItem() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then(response => {
                setPosts(response)
                setLoading(false)
            })
            .catch(error => {
                console.error("Error fetching posts:", error)
                setLoading(false)
            })
    }, [])

    const handlePostClick = (userId, postId) => {
        navigate(`/@${userId}/post-detail/${postId}`)
    }

    if (loading) {
        return (
            <Card className="bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)] p-6">
                <div className="text-center text-[#777]">Đang tải...</div>
            </Card>
        )
    }

    return (
        <Card className="bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)]">
            {/* Phần nhập bài viết mới */}
            <div className="flex items-center justify-between px-6">
                <Avatar className="size-9">
                    <AvatarImage src="https://i.pinimg.com/736x/0b/a7/c0/0ba7c012596101d0dc4310f666ac0ec3.jpg" />
                </Avatar>
                <p className="flex-1 px-3 text-md text-[#777]">Có gì mới?</p>
                <Button className="outline-solid outline outline-[#77777790]">Đăng</Button>
            </div>

            {/* Danh sách bài post */}
            {posts.map((post) => (
                <PopularPost
                    key={post.id}
                    post={post}
                    onClick={handlePostClick}
                />
            ))}
        </Card>
    )
}

export default PostItem