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
import { mockRegister } from "@/lib/mock-data";
import { UserPlus } from "lucide-react";

const registerSchema = z
    .object({
        name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
        email: z.string().email("Email không hợp lệ"),
        password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
        confirmPassword: z.string(),
        phone: z.string().optional(),
        role: z.enum(["SALES", "AGENCY"]),
        agencyName: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
    });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState<"SALES" | "AGENCY">("SALES");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            role: "SALES",
        },
    });

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true);
        try {
            // Using mock data for testing
            mockRegister({
                name: data.name,
                email: data.email,
                password: data.password,
                phone: data.phone,
                role: data.role,
                agencyName: data.role === "AGENCY" ? data.agencyName : undefined,
            });

            // Uncomment below to use real API
            // await api.post("/auth/register", {
            //     name: data.name,
            //     email: data.email,
            //     password: data.password,
            //     phone: data.phone,
            //     role: data.role,
            //     agencyName: data.role === "AGENCY" ? data.agencyName : undefined,
            // });

            toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
            router.push("/login");
        } catch (error: any) {
            toast.error(error.message || "Đăng ký thất bại");
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
                            <UserPlus className="h-6 w-6" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl text-center">Đăng ký tài khoản</CardTitle>
                    <CardDescription className="text-center">Tạo tài khoản để truy cập nền tảng</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Họ và tên</Label>
                            <Input id="name" placeholder="Nguyễn Văn A" {...register("name")} disabled={isLoading} />
                            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="email@example.com" {...register("email")} disabled={isLoading} />
                            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Số điện thoại (tùy chọn)</Label>
                            <Input id="phone" type="tel" placeholder="0901234567" {...register("phone")} disabled={isLoading} />
                        </div>

                        <div className="space-y-2">
                            <Label>Vai trò</Label>
                            <div className="flex gap-4">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        value="SALES"
                                        {...register("role")}
                                        onChange={(e) => setSelectedRole(e.target.value as "SALES" | "AGENCY")}
                                        disabled={isLoading}
                                        className="w-4 h-4"
                                    />
                                    <span>Sales</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        value="AGENCY"
                                        {...register("role")}
                                        onChange={(e) => setSelectedRole(e.target.value as "SALES" | "AGENCY")}
                                        disabled={isLoading}
                                        className="w-4 h-4"
                                    />
                                    <span>Agency</span>
                                </label>
                            </div>
                        </div>

                        {selectedRole === "AGENCY" && (
                            <div className="space-y-2">
                                <Label htmlFor="agencyName">Tên Agency</Label>
                                <Input id="agencyName" placeholder="ABC Real Estate" {...register("agencyName")} disabled={isLoading} />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="password">Mật khẩu</Label>
                            <Input id="password" type="password" placeholder="••••••••" {...register("password")} disabled={isLoading} />
                            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                            <Input id="confirmPassword" type="password" placeholder="••••••••" {...register("confirmPassword")} disabled={isLoading} />
                            {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Đang đăng ký..." : "Đăng ký"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    <div className="text-sm text-center text-muted-foreground">
                        Đã có tài khoản?{" "}
                        <Link href="/login" className="text-primary hover:underline">
                            Đăng nhập
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
