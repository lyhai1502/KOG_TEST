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
import { UserPlus, Eye, EyeOff, Check, X, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const registerSchema = z
    .object({
        name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
        email: z.string().email("Email không hợp lệ"),
        password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
        confirmPassword: z.string(),
        phone: z
            .string()
            .regex(/^(0|\+84)[0-9]{9,10}$/, "Số điện thoại không hợp lệ (VD: 0901234567)")
            .optional()
            .or(z.literal("")),
        role: z.enum(["SALES", "AGENCY"]),
        agencyName: z.string().optional(),
        acceptTerms: z.boolean().refine((val) => val === true, {
            message: "Bạn phải đồng ý với điều khoản sử dụng",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
    });

type RegisterFormData = z.infer<typeof registerSchema>;

// Password strength calculation
type PasswordStrength = "weak" | "medium" | "strong";

const calculatePasswordStrength = (password: string): PasswordStrength => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return "weak";
    if (strength <= 4) return "medium";
    return "strong";
};

const getPasswordStrengthColor = (strength: PasswordStrength) => {
    switch (strength) {
        case "weak":
            return "bg-red-500";
        case "medium":
            return "bg-yellow-500";
        case "strong":
            return "bg-green-500";
    }
};

const getPasswordStrengthText = (strength: PasswordStrength) => {
    switch (strength) {
        case "weak":
            return "Yếu";
        case "medium":
            return "Trung bình";
        case "strong":
            return "Mạnh";
    }
};

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState<"SALES" | "AGENCY">("SALES");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [countdown, setCountdown] = useState(5);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            role: "SALES",
            acceptTerms: false,
        },
    });

    const passwordValue = watch("password");
    const passwordStrength = passwordValue ? calculatePasswordStrength(passwordValue) : null;

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

            setShowSuccessModal(true);

            // Start countdown
            let timeLeft = 5;
            const timer = setInterval(() => {
                timeLeft--;
                setCountdown(timeLeft);
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    router.push("/login");
                }
            }, 1000);
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
                            <Label htmlFor="phone">Số điện thoại</Label>
                            <Input id="phone" type="tel" placeholder="0901234567" autoComplete="tel" {...register("phone")} disabled={isLoading} />
                            {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                            <p className="text-xs text-muted-foreground">Định dạng: 0901234567 hoặc +84901234567</p>
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
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    autoComplete="new-password"
                                    className="pr-10"
                                    {...register("password")}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}

                            {/* Password Strength Indicator */}
                            {passwordValue && passwordValue.length > 0 && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength!)}`}
                                                style={{
                                                    width: passwordStrength === "weak" ? "33%" : passwordStrength === "medium" ? "66%" : "100%",
                                                }}
                                            ></div>
                                        </div>
                                        <span className="text-xs font-medium">{getPasswordStrengthText(passwordStrength!)}</span>
                                    </div>
                                    <div className="text-xs space-y-1">
                                        <div className={`flex items-center gap-1 ${passwordValue.length >= 8 ? "text-green-600" : "text-gray-400"}`}>
                                            {passwordValue.length >= 8 ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                                            <span>Ít nhất 8 ký tự</span>
                                        </div>
                                        <div className={`flex items-center gap-1 ${/[A-Z]/.test(passwordValue) && /[a-z]/.test(passwordValue) ? "text-green-600" : "text-gray-400"}`}>
                                            {/[A-Z]/.test(passwordValue) && /[a-z]/.test(passwordValue) ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                                            <span>Chữ hoa và chữ thường</span>
                                        </div>
                                        <div className={`flex items-center gap-1 ${/[0-9]/.test(passwordValue) ? "text-green-600" : "text-gray-400"}`}>
                                            {/[0-9]/.test(passwordValue) ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                                            <span>Ít nhất 1 chữ số</span>
                                        </div>
                                        <div className={`flex items-center gap-1 ${/[^a-zA-Z0-9]/.test(passwordValue) ? "text-green-600" : "text-gray-400"}`}>
                                            {/[^a-zA-Z0-9]/.test(passwordValue) ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                                            <span>Ký tự đặc biệt (!@#$...)</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    autoComplete="new-password"
                                    className="pr-10"
                                    {...register("confirmPassword")}
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    tabIndex={-1}
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
                        </div>

                        {/* Terms and Conditions */}
                        <div className="space-y-2">
                            <div className="flex items-start space-x-2">
                                <input
                                    type="checkbox"
                                    id="acceptTerms"
                                    {...register("acceptTerms")}
                                    className="h-4 w-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    disabled={isLoading}
                                />
                                <Label htmlFor="acceptTerms" className="text-sm font-normal cursor-pointer">
                                    Tôi đồng ý với{" "}
                                    <button type="button" onClick={() => setShowTermsModal(true)} className="text-blue-600 hover:underline">
                                        Điều khoản sử dụng
                                    </button>{" "}
                                    và{" "}
                                    <button type="button" onClick={() => setShowTermsModal(true)} className="text-blue-600 hover:underline">
                                        Chính sách bảo mật
                                    </button>
                                </Label>
                            </div>
                            {errors.acceptTerms && <p className="text-sm text-destructive">{errors.acceptTerms.message}</p>}
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

            {/* Success Modal */}
            <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="flex justify-center mb-4">
                            <div className="bg-green-100 p-3 rounded-full">
                                <CheckCircle2 className="h-12 w-12 text-green-600" />
                            </div>
                        </div>
                        <DialogTitle className="text-center text-2xl">Đăng ký thành công!</DialogTitle>
                        <DialogDescription className="text-center space-y-2">
                            <p>Tài khoản của bạn đã được tạo thành công.</p>
                            <p className="text-sm">
                                Bạn sẽ được chuyển đến trang đăng nhập sau <span className="font-bold text-blue-600">{countdown}</span> giây...
                            </p>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center gap-2 mt-4">
                        <Button onClick={() => router.push("/login")} className="w-full">
                            Đăng nhập ngay
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Terms Modal */}
            <Dialog open={showTermsModal} onOpenChange={setShowTermsModal}>
                <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Điều khoản sử dụng và Chính sách bảo mật</DialogTitle>
                        <DialogDescription>Vui lòng đọc kỹ các điều khoản trước khi đăng ký</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 text-sm">
                        <section>
                            <h3 className="font-semibold text-base mb-2">1. Điều khoản sử dụng</h3>
                            <div className="space-y-2 text-muted-foreground">
                                <p>1.1. Bằng việc đăng ký và sử dụng nền tảng Kim Oanh Group NOXH, bạn đồng ý tuân thủ các điều khoản và điều kiện sau.</p>
                                <p>1.2. Bạn cam kết cung cấp thông tin chính xác, đầy đủ và cập nhật thông tin khi có thay đổi.</p>
                                <p>1.3. Bạn chịu trách nhiệm bảo mật thông tin tài khoản và mật khẩu của mình.</p>
                                <p>1.4. Nghiêm cấm sử dụng nền tảng cho các mục đích gian lận, vi phạm pháp luật.</p>
                            </div>
                        </section>

                        <section>
                            <h3 className="font-semibold text-base mb-2">2. Chính sách bảo mật</h3>
                            <div className="space-y-2 text-muted-foreground">
                                <p>
                                    2.1. <strong>Thu thập thông tin:</strong> Chúng tôi thu thập thông tin cá nhân bao gồm họ tên, email, số điện thoại khi bạn đăng ký tài khoản.
                                </p>
                                <p>
                                    2.2. <strong>Sử dụng thông tin:</strong> Thông tin được sử dụng để xác thực tài khoản, liên hệ và cung cấp dịch vụ.
                                </p>
                                <p>
                                    2.3. <strong>Bảo vệ thông tin:</strong> Chúng tôi cam kết bảo mật thông tin cá nhân và không chia sẻ với bên thứ ba trừ khi có yêu cầu pháp lý.
                                </p>
                                <p>
                                    2.4. <strong>Quyền của người dùng:</strong> Bạn có quyền truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình bất kỳ lúc nào.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h3 className="font-semibold text-base mb-2">3. Giao dịch và thanh toán</h3>
                            <div className="space-y-2 text-muted-foreground">
                                <p>3.1. Mọi giao dịch trên nền tảng phải tuân thủ quy định pháp luật về giao dịch bất động sản.</p>
                                <p>3.2. Kim Oanh Group đóng vai trò trung gian kết nối, không chịu trách nhiệm về các tranh chấp giữa các bên.</p>
                                <p>3.3. Người mua và người bán tự thỏa thuận về điều khoản giao dịch cụ thể.</p>
                            </div>
                        </section>

                        <section>
                            <h3 className="font-semibold text-base mb-2">4. Liên hệ</h3>
                            <div className="space-y-2 text-muted-foreground">
                                <p>Nếu có bất kỳ thắc mắc nào về điều khoản sử dụng hoặc chính sách bảo mật, vui lòng liên hệ:</p>
                                <p>Email: support@kimoanhgroup.com</p>
                                <p>Hotline: 1900 xxxx</p>
                            </div>
                        </section>
                    </div>
                    <div className="flex justify-end mt-4">
                        <Button onClick={() => setShowTermsModal(false)}>Đã hiểu</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
