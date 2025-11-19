// CommentModal.jsx - Modal để trả lời/comment bài post
import { useState } from "react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function CommentModal({ open, onOpenChange, post, currentUser, onSubmit }) {
    const [comment, setComment] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async () => {
        if (!comment.trim()) return

        setIsSubmitting(true)
        try {
            await onSubmit(comment)
            setComment("") // Clear textarea sau khi submit
            onOpenChange(false) // Đóng modal
        } catch (error) {
            console.error("Error submitting comment:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleKeyDown = (e) => {
        // Ctrl/Cmd + Enter để submit
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            handleSubmit()
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#181818] border border-[rgba(255,255,255,0.1)] text-white max-w-[600px] p-0 gap-0">
                {/* Header */}
                <DialogHeader className="px-6 py-4 border-b border-[rgba(255,255,255,0.1)]">
                    <DialogTitle className="text-center text-white">Thread trả lời</DialogTitle>
                </DialogHeader>

                {/* Content */}
                <div className="max-h-[70vh] overflow-y-auto">
                    {/* Bài post gốc */}
                    <div className="px-6 py-4">
                        <div className="flex gap-3">
                            <div className="flex flex-col items-center">
                                <Avatar className="size-9">
                                    <AvatarImage src={post?.userAvatar || "https://github.com/shadcn.png"} />
                                </Avatar>
                                <div className="w-[2px] flex-1 bg-[rgba(255,255,255,0.1)] my-2"></div>
                            </div>

                            <div className="flex-1 pb-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-white font-semibold">
                                        {post?.userName || `User ${post?.userId}`}
                                    </span>
                                    <span className="text-[#777] text-sm">{post?.time || "5 giờ"}</span>
                                </div>
                                <p className="text-indigo-100 text-[15px] leading-relaxed">
                                    {post?.body || post?.content}
                                </p>

                                {/* Audio player nếu có */}
                                {post?.audio && (
                                    <div className="mt-3 flex items-center gap-3 bg-[rgba(255,255,255,0.05)] rounded-full px-4 py-2 w-fit">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-white hover:bg-[rgba(255,255,255,0.1)]"
                                        >
                                            <FontAwesomeIcon icon={["fas", "fa-play"]} />
                                        </Button>
                                        <div className="w-40 h-1 bg-[rgba(255,255,255,0.2)] rounded-full">
                                            <div className="w-1/3 h-full bg-white rounded-full"></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <Separator className="bg-[rgba(255,255,255,0.1)]" />

                    {/* Phần viết comment */}
                    <div className="px-6 py-4">
                        <div className="flex gap-3">
                            <Avatar className="size-9">
                                <AvatarImage src={currentUser?.avatar || "https://i.pinimg.com/736x/0b/a7/c0/0ba7c012596101d0dc4310f666ac0ec3.jpg"} />
                            </Avatar>

                            <div className="flex-1">
                                <div className="mb-2">
                                    <span className="text-white font-semibold">
                                        {currentUser?.name || "_hatuan_khoy"}
                                    </span>
                                </div>

                                <Textarea
                                    placeholder={`Trả lời ${post?.userName || "radionhacbuon"}...`}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="min-h-[80px] bg-transparent border-none text-indigo-100 placeholder:text-[#777] resize-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-3 border-t border-[rgba(255,255,255,0.1)] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#777] text-sm font-bold">
                        <FontAwesomeIcon icon={["far", "fa-square-check"]} />
                        <span>Các lựa chọn để kiểm soát câu trả lời</span>
                    </div>
                    <Button
                        className="bg-transparent border border-[#77777790] hover:bg-[rgba(255,255,255,0.1)] text-white"
                        onClick={handleSubmit}
                        disabled={!comment.trim() || isSubmitting}
                    >
                        {isSubmitting ? "Đang đăng..." : "Đăng"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CommentModal