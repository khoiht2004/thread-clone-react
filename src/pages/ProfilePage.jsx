import Heading from "@/components/Heading";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import PopularPost from "@/components/PopularPosts";

const tabs = [
    { key: "threads", label: "Thread", path: "" },
    { key: "replies", label: "Thread trả lời", path: "/replies" },
    { key: "media", label: "File phương tiện", path: "/media" },
    { key: "reposts", label: "Bài đăng lại", path: "/reposts" }
];

function ProfilePage() {
    const { username } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("threads");

    useEffect(() => {
        const path = location.pathname;
        if (path.endsWith('/replies')) setActiveTab('replies');
        else if (path.endsWith('/media')) setActiveTab('media');
        else if (path.endsWith('/reposts')) setActiveTab('reposts');
        else setActiveTab('threads');
    }, [location.pathname]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true);
                // Lấy username từ URL, loại bỏ @
                const userId = username.replace('@', '');

                // Fetch user info
                const userInfo = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
                if (!userInfo.ok) throw new Error("Không tìm thấy người dùng");
                const userData = await userInfo.json();

                // Fetch user posts
                const postsInfo = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts?_limit=6`);
                if (!postsInfo.ok) throw new Error("Không tải được bài viết");
                const postsData = await postsInfo.json();

                setUser(userData);
                setPosts(postsData);
            } catch (error) {
                console.error("Lỗi tải trang", error);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchUserProfile();
        }
    }, [username]);

    const handleTabClick = (tab) => {
        const basePath = `/${username}`;
        navigate(`${basePath}${tab.path}`, { replace: true });
    };

    const handlePostClick = (userId, postId) => {
        navigate(`/${username}/post-detail/${postId}`);
    };

    if (loading) {
        return (
            <>
                <Heading title="Trang cá nhân" />
                <Card className="bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)] p-6">
                    <div className="text-center text-[#777]">Đang tải...</div>
                </Card>
            </>
        );
    }

    return (
        <>
            <Heading title="Trang cá nhân" />

            <Card className="bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)] w-full">
                {/* Phần heading */}
                <header className="text-white px-6 pt-4 pb-2.5">
                    <div className="h-[84px] justify-between gap-4 items-center flex">
                        <div className="flex-1">
                            <h1 className="font-bold text-2xl">{user?.name || 'Loading...'}</h1>
                            <h2 className="text-[#777]">{username}</h2>
                        </div>
                        <Avatar className="w-[84px] h-[84px]">
                            <AvatarImage
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                                className="object-cover"
                            />
                        </Avatar>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                        <p className="text-[#777777]">79 người theo dõi</p>
                        <div className="text-[24px] flex gap-1.5 cursor-pointer">
                            <FontAwesomeIcon icon="fa-brands fa-instagram" />
                            <FontAwesomeIcon icon="fa-regular fa-bell" />
                            <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                        </div>
                    </div>
                </header>

                <section className="w-full px-6 py-3 flex gap-3">
                    <Button className="px-4 w-[50%] cursor-pointer" variant="outline">Theo dõi</Button>
                    <Button className="px-4 w-[50%] cursor-pointer outline-solid outline-[#77777790] outline">Nhắc đến</Button>
                </section>

                {/* Phần tabs */}
                <nav className="w-full border-b border-[rgba(255,255,255,0.1)] ">
                    <ul className="flex">
                        {tabs.map((tab) => (
                            <li key={tab.key} className="flex-1 ">
                                <button
                                    onClick={() => handleTabClick(tab)}
                                    className={`w-full py-3 text-center transition-colors relative cursor-pointer ${activeTab === tab.key
                                        ? 'text-white font-semibold'
                                        : 'text-[#777] hover:text-white'
                                        }`}
                                >
                                    {tab.label}
                                    {activeTab === tab.key && (
                                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white"></span>
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Phần nội dung tabs */}
                <section className="min-h-[300px] ">
                    {activeTab === 'threads' && (
                        <div>
                            {posts.length > 0 ? (
                                posts.map((post) => (
                                    <PopularPost
                                        key={post.id}
                                        post={post}
                                        className="my-6"
                                        onClick={handlePostClick}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-12 text-[#777]">
                                    Chưa có bài viết nào
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'replies' && (
                        <div className="text-center py-12">
                            <h2 className="text-white text-xl font-semibold">Thread trả lời</h2>
                            <p className="text-[#777] mt-2">Chức năng đang phát triển</p>
                        </div>
                    )}

                    {activeTab === 'media' && (
                        <div className="text-center py-12">
                            <h2 className="text-white text-xl font-semibold">File phương tiện</h2>
                            <p className="text-[#777] mt-2">Chức năng đang phát triển</p>
                        </div>
                    )}

                    {activeTab === 'reposts' && (
                        <div className="text-center py-12">
                            <h2 className="text-white text-xl font-semibold">Bài đăng lại</h2>
                            <p className="text-[#777] mt-2">Chức năng đang phát triển</p>
                        </div>
                    )}
                </section>
            </Card>
        </>
    );
}

export default ProfilePage;