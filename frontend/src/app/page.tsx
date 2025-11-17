"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Building2,
    Users,
    Shield,
    TrendingUp,
    ArrowRight,
    CheckCircle2,
    Star,
    MapPin,
    Phone,
    Mail,
    Clock,
    Award,
    Home,
    Sparkles,
    FileText,
    Heart,
    History,
    Search,
    ChevronRight,
    Target,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
    const [activeTab, setActiveTab] = useState<"primary" | "secondary">("primary");

    const stats = [
        { label: "Dự án đã triển khai", value: "50+", icon: Building2 },
        { label: "Khách hàng hài lòng", value: "10,000+", icon: Users },
        { label: "Năm kinh nghiệm", value: "15+", icon: Award },
        { label: "Tỷ lệ thành công", value: "98%", icon: TrendingUp },
    ];

    const features = [
        {
            icon: Shield,
            title: "Pháp lý minh bạch",
            description: "100% dự án có giấy phép đầy đủ, sổ hồng rõ ràng",
            color: "blue",
        },
        {
            icon: TrendingUp,
            title: "Giá tốt nhất",
            description: "Mức giá ưu đãi đặc biệt cho nhà ở xã hội",
            color: "green",
        },
        {
            icon: Users,
            title: "Hỗ trợ tận tâm",
            description: "Đội ngũ tư vấn chuyên nghiệp 24/7",
            color: "purple",
        },
        {
            icon: Building2,
            title: "Chất lượng đảm bảo",
            description: "Xây dựng theo tiêu chuẩn cao cấp",
            color: "orange",
        },
    ];

    const projects = [
        {
            id: "proj-1",
            name: "Kim Oanh Green Park",
            location: "Quận 9, TP. HCM",
            price: "1.2 tỷ",
            units: "500 căn",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&auto=format",
        },
        {
            id: "proj-2",
            name: "Sunview Town",
            location: "Thủ Đức, TP. HCM",
            price: "1.5 tỷ",
            units: "300 căn",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&auto=format",
        },
        {
            id: "proj-3",
            name: "Urban Valley",
            location: "Bình Dương",
            price: "950 triệu",
            units: "450 căn",
            image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&h=600&fit=crop&auto=format",
        },
    ];

    const testimonials = [
        {
            name: "Nguyễn Văn A",
            role: "Khách hàng",
            content: "Quy trình mua nhà rất nhanh chóng và minh bạch. Tôi rất hài lòng với dịch vụ của Kim Oanh Group.",
            rating: 5,
        },
        {
            name: "Trần Thị B",
            role: "Khách hàng",
            content: "Giá cả hợp lý, chất lượng tốt. Đội ngũ tư vấn nhiệt tình và chuyên nghiệp.",
            rating: 5,
        },
        {
            name: "Lê Văn C",
            role: "Khách hàng",
            content: "Dự án đẹp, vị trí thuận lợi. Hoàn toàn hài lòng với quyết định của mình.",
            rating: 5,
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
                                <Building2 className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900">Kim Oanh Group</span>
                        </div>

                        <div className="hidden md:flex items-center gap-8">
                            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                                Tính năng
                            </a>
                            <a href="#projects" className="text-gray-600 hover:text-blue-600 transition-colors">
                                Dự án
                            </a>
                            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">
                                Về chúng tôi
                            </a>
                            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                                Liên hệ
                            </a>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link href="/login">
                                <Button variant="outline">Đăng nhập</Button>
                            </Link>
                            <Link href="/register">
                                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">Đăng ký</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
                                <Sparkles className="h-4 w-4 text-blue-600" />
                                <span className="text-sm font-semibold text-blue-600">Nền tảng số 1 về NOXH</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                Sở hữu nhà ở xã hội
                                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> dễ dàng hơn</span>
                            </h1>

                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">Nền tảng giao dịch bất động sản NOXH toàn diện từ Kim Oanh Group. Minh bạch, nhanh chóng, đáng tin cậy.</p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <Link href="/register">
                                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 w-full sm:w-auto text-lg px-8 py-6">
                                        Bắt đầu ngay
                                        <ArrowRight className="h-5 w-5 ml-2" />
                                    </Button>
                                </Link>
                                <Link href="#projects">
                                    <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6">
                                        Xem dự án
                                        <ChevronRight className="h-5 w-5 ml-2" />
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex items-center gap-8">
                                <div>
                                    <p className="text-3xl font-bold text-gray-900">10,000+</p>
                                    <p className="text-sm text-gray-600">Khách hàng hài lòng</p>
                                </div>
                                <div className="h-12 w-px bg-gray-300"></div>
                                <div>
                                    <p className="text-3xl font-bold text-gray-900">50+</p>
                                    <p className="text-sm text-gray-600">Dự án hoàn thành</p>
                                </div>
                                <div className="h-12 w-px bg-gray-300"></div>
                                <div>
                                    <p className="text-3xl font-bold text-gray-900">15+</p>
                                    <p className="text-sm text-gray-600">Năm kinh nghiệm</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl transform rotate-6"></div>
                            <img
                                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop&auto=format"
                                alt="Modern Building"
                                className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover"
                            />

                            {/* Floating Card */}
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-green-100 rounded-lg">
                                        <CheckCircle2 className="h-8 w-8 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">98%</p>
                                        <p className="text-sm text-gray-600">Tỷ lệ thành công</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white border-y">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div key={index} className="text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                                        <Icon className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <p className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</p>
                                    <p className="text-gray-600">{stat.label}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Tại sao chọn Kim Oanh Group?</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Chúng tôi cam kết mang đến trải nghiệm mua nhà tốt nhất với các ưu điểm vượt trội</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            const colorClasses = {
                                blue: "bg-blue-100 text-blue-600",
                                green: "bg-green-100 text-green-600",
                                purple: "bg-purple-100 text-purple-600",
                                orange: "bg-orange-100 text-orange-600",
                            };

                            return (
                                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-300">
                                    <CardContent className="p-6">
                                        <div className={`inline-flex p-4 rounded-lg mb-4 ${colorClasses[feature.color as keyof typeof colorClasses]}`}>
                                            <Icon className="h-8 w-8" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                        <p className="text-gray-600">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Market Types */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Hai thị trường giao dịch</h2>
                        <p className="text-xl text-gray-600">Lựa chọn phù hợp với nhu cầu của bạn</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="border-2 border-blue-200 hover:shadow-2xl transition-all duration-300">
                            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-blue-600 rounded-lg">
                                        <Building2 className="h-8 w-8 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl">Thị trường Sơ cấp</CardTitle>
                                        <CardDescription className="text-base">Mua trực tiếp từ chủ đầu tư</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                                        <p className="text-gray-700">Dự án mới 100%, chưa qua sử dụng</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                                        <p className="text-gray-700">Giá ưu đãi từ chủ đầu tư</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                                        <p className="text-gray-700">Quy trình bốc thăm minh bạch</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                                        <p className="text-gray-700">Hỗ trợ vay ngân hàng lên đến 70%</p>
                                    </div>
                                </div>

                                <Link href="/login" className="block">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4">
                                        Khám phá ngay
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-orange-200 hover:shadow-2xl transition-all duration-300">
                            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 pb-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-orange-600 rounded-lg">
                                        <Home className="h-8 w-8 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl">Thị trường Thứ cấp</CardTitle>
                                        <CardDescription className="text-base">Mua bán chuyển nhượng</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                                        <p className="text-gray-700">Căn hộ có sẵn, nhận nhà ngay</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                                        <p className="text-gray-700">Nhiều lựa chọn về vị trí và giá</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                                        <p className="text-gray-700">Xem trực tiếp căn hộ thực tế</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                                        <p className="text-gray-700">Giao dịch nhanh chóng, an toàn</p>
                                    </div>
                                </div>

                                <Link href="/login" className="block">
                                    <Button className="w-full bg-orange-600 hover:bg-orange-700 mt-4">
                                        Khám phá ngay
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Dự án nổi bật</h2>
                        <p className="text-xl text-gray-600">Các dự án NOXH chất lượng cao đang mở bán</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <Card key={project.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                                <div className="relative h-56 overflow-hidden">
                                    <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
                                        <span className="text-sm font-semibold text-blue-600">Đang mở bán</span>
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                                    <div className="flex items-center text-gray-600 mb-4">
                                        <MapPin className="h-4 w-4 mr-2" />
                                        <span>{project.location}</span>
                                    </div>
                                    <div className="flex items-center justify-between mb-4 pb-4 border-b">
                                        <div>
                                            <p className="text-sm text-gray-500">Giá từ</p>
                                            <p className="text-lg font-bold text-blue-600">{project.price}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">Quy mô</p>
                                            <p className="text-lg font-bold text-gray-900">{project.units}</p>
                                        </div>
                                    </div>
                                    <Link href="/login">
                                        <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            Xem chi tiết
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/login">
                            <Button size="lg" variant="outline" className="text-lg px-8">
                                Xem tất cả dự án
                                <ChevronRight className="h-5 w-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Khách hàng nói gì về chúng tôi</h2>
                        <p className="text-xl text-gray-600">Những đánh giá chân thực từ khách hàng</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="border-2 hover:shadow-xl transition-all duration-300">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 mb-6 italic">&ldquo;{testimonial.content}&rdquo;</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                            <p className="text-sm text-gray-600">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Sẵn sàng sở hữu ngôi nhà mơ ước?</h2>
                    <p className="text-xl text-blue-100 mb-8">Đăng ký ngay hôm nay để nhận tư vấn miễn phí và khám phá các dự án NOXH tốt nhất</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register">
                            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto text-lg px-8 py-6">
                                Đăng ký miễn phí
                                <ArrowRight className="h-5 w-5 ml-2" />
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 w-full sm:w-auto text-lg px-8 py-6">
                                Đăng nhập ngay
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="bg-gray-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
                                    <Building2 className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-xl font-bold">Kim Oanh Group</span>
                            </div>
                            <p className="text-gray-400 mb-4">Nền tảng giao dịch bất động sản NOXH hàng đầu Việt Nam</p>
                            <div className="flex items-center gap-4">
                                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                <span className="text-sm">4.8/5 từ 10,000+ đánh giá</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-4">Về chúng tôi</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Giới thiệu
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Tin tức
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Tuyển dụng
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Chính sách
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-4">Hỗ trợ</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Hướng dẫn
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        FAQ
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Điều khoản
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        Bảo mật
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-4">Liên hệ</h3>
                            <ul className="space-y-3 text-gray-400">
                                <li className="flex items-start gap-2">
                                    <MapPin className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                    <span>123 Nguyễn Văn Linh, Quận 7, TP.HCM</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Phone className="h-5 w-5 text-blue-400" />
                                    <span>1900-xxxx</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Mail className="h-5 w-5 text-blue-400" />
                                    <span>info@kimoanhgroup.com</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-blue-400" />
                                    <span>8:00 - 18:00 (T2-T7)</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-gray-400 text-sm">© 2025 Kim Oanh Group. All rights reserved.</p>
                            <div className="flex items-center gap-6">
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    Privacy
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    Terms
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    Cookies
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
