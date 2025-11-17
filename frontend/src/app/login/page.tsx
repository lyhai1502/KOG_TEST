"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth.store";
import { mockLogin } from "@/lib/mock-data";
import { LogIn } from "lucide-react";

const loginSchema = z.object({
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        try {
            // Using mock data for testing
            const { user, accessToken } = mockLogin(data.email, data.password);

            // Uncomment below to use real API
            // const response = await api.post("/auth/login", data);
            // const { user, accessToken } = response.data;

            setAuth(user as any, accessToken);
            toast.success("Đăng nhập thành công!");

            // Redirect based on role
            if (user.role === "ADMIN") {
                router.push("/admin/dashboard");
            } else if ((user.role as string) === "BUYER" || (user.role as string) === "SELLER") {
                // Buyer và Seller đều dùng buyer dashboard
                // SELLER sẽ có thêm tính năng đăng bán (future)
                router.push("/buyer/dashboard");
            } else {
                router.push("/dashboard");
            }
        } catch (error: any) {
            toast.error(error.message || "Đăng nhập thất bại");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-primary text-primary-foreground p-3 rounded-full">
                            <LogIn className="h-6 w-6" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl text-center">Kim Oanh Group</CardTitle>
                    <CardDescription className="text-center">Sàn Giao dịch Nhà ở Xã hội</CardDescription>

                    {/* Demo Account Info */}
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs">
                        <p className="font-semibold text-blue-900 mb-2">🎯 Tài khoản demo:</p>
                        <div className="space-y-1 text-blue-800">
                            <p>
                                👨‍💼 <strong>Admin:</strong> admin@kimoanhgroup.com / admin123
                            </p>
                            <p>
                                💼 <strong>Sales:</strong> sales@kimoanhgroup.com / sales123
                            </p>
                            <p>
                                🏢 <strong>Agency:</strong> agency@kimoanhgroup.com / agency123
                            </p>
                            <p>
                                👤 <strong>Buyer:</strong> buyer@example.com / buyer123
                            </p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="email@example.com" {...register("email")} disabled={isLoading} />
                            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Mật khẩu</Label>
                            <Input id="password" type="password" placeholder="••••••••" {...register("password")} disabled={isLoading} />
                            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    <div className="text-sm text-center text-muted-foreground">
                        Chưa có tài khoản?{" "}
                        <Link href="/register" className="text-primary hover:underline">
                            Đăng ký ngay
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
