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
import { KeyRound, Mail, ArrowLeft, CheckCircle, Eye, EyeOff } from "lucide-react";

// Step 1: Email verification
const emailSchema = z.object({
    email: z.string().email("Email không hợp lệ"),
});

// Step 2: OTP verification
const otpSchema = z.object({
    otp: z.string().length(6, "Mã OTP phải có 6 chữ số"),
});

// Step 3: Password reset
const passwordSchema = z
    .object({
        password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
    });

type EmailFormData = z.infer<typeof emailSchema>;
type OtpFormData = z.infer<typeof otpSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

type Step = "email" | "otp" | "reset" | "success";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [step, setStep] = useState<Step>("email");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const emailForm = useForm<EmailFormData>({
        resolver: zodResolver(emailSchema),
    });

    const otpForm = useForm<OtpFormData>({
        resolver: zodResolver(otpSchema),
    });

    const passwordForm = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
    });

    // Step 1: Send verification email
    const onEmailSubmit = async (data: EmailFormData) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // In production, this would call: await api.post("/auth/forgot-password", data);
            setEmail(data.email);
            toast.success("Mã OTP đã được gửi đến email của bạn");
            setStep("otp");
            setCountdown(60); // 60 seconds countdown

            // Start countdown
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } catch (error: any) {
            toast.error(error.message || "Không thể gửi mã OTP");
        } finally {
            setIsLoading(false);
        }
    };

    // Step 2: Verify OTP
    const onOtpSubmit = async (data: OtpFormData) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // In production: await api.post("/auth/verify-otp", { email, otp: data.otp });
            // Demo: Accept any 6-digit OTP
            if (data.otp.length === 6) {
                toast.success("Mã OTP hợp lệ");
                setStep("reset");
            } else {
                throw new Error("Mã OTP không chính xác");
            }
        } catch (error: any) {
            toast.error(error.message || "Mã OTP không chính xác");
        } finally {
            setIsLoading(false);
        }
    };

    // Step 3: Reset password
    const onPasswordSubmit = async (data: PasswordFormData) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // In production: await api.post("/auth/reset-password", { email, password: data.password });
            toast.success("Đặt lại mật khẩu thành công!");
            setStep("success");

            // Auto redirect after 3 seconds
            setTimeout(() => {
                router.push("/login");
            }, 3000);
        } catch (error: any) {
            toast.error(error.message || "Không thể đặt lại mật khẩu");
        } finally {
            setIsLoading(false);
        }
    };

    // Resend OTP
    const handleResendOtp = async () => {
        if (countdown > 0) return;

        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success("Mã OTP mới đã được gửi");
            setCountdown(60);

            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } catch (error: any) {
            toast.error("Không thể gửi lại mã OTP");
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
                            <KeyRound className="h-6 w-6" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl text-center">
                        {step === "email" && "Quên mật khẩu"}
                        {step === "otp" && "Xác thực OTP"}
                        {step === "reset" && "Đặt lại mật khẩu"}
                        {step === "success" && "Thành công"}
                    </CardTitle>
                    <CardDescription className="text-center">
                        {step === "email" && "Nhập email để nhận mã xác thực"}
                        {step === "otp" && `Mã OTP đã được gửi đến ${email}`}
                        {step === "reset" && "Nhập mật khẩu mới của bạn"}
                        {step === "success" && "Mật khẩu đã được đặt lại"}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {/* Step 1: Email Input */}
                    {step === "email" && (
                        <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input id="email" type="email" placeholder="email@example.com" autoComplete="email" className="pl-10" {...emailForm.register("email")} disabled={isLoading} />
                                </div>
                                {emailForm.formState.errors.email && <p className="text-sm text-destructive">{emailForm.formState.errors.email.message}</p>}
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Đang gửi...
                                    </>
                                ) : (
                                    "Gửi mã OTP"
                                )}
                            </Button>
                        </form>
                    )}

                    {/* Step 2: OTP Verification */}
                    {step === "otp" && (
                        <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="otp">Mã OTP (6 chữ số)</Label>
                                <Input id="otp" type="text" placeholder="123456" maxLength={6} className="text-center text-2xl tracking-widest" {...otpForm.register("otp")} disabled={isLoading} />
                                {otpForm.formState.errors.otp && <p className="text-sm text-destructive">{otpForm.formState.errors.otp.message}</p>}
                                <p className="text-xs text-muted-foreground text-center">Mã OTP sẽ hết hiệu lực sau 5 phút</p>
                            </div>

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Đang xác thực...
                                    </>
                                ) : (
                                    "Xác thực"
                                )}
                            </Button>

                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={handleResendOtp}
                                    disabled={countdown > 0 || isLoading}
                                    className="text-sm text-blue-600 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
                                >
                                    {countdown > 0 ? `Gửi lại sau ${countdown}s` : "Gửi lại mã OTP"}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Step 3: Password Reset */}
                    {step === "reset" && (
                        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Mật khẩu mới</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        className="pr-10"
                                        {...passwordForm.register("password")}
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
                                {passwordForm.formState.errors.password && <p className="text-sm text-destructive">{passwordForm.formState.errors.password.message}</p>}
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
                                        {...passwordForm.register("confirmPassword")}
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
                                {passwordForm.formState.errors.confirmPassword && <p className="text-sm text-destructive">{passwordForm.formState.errors.confirmPassword.message}</p>}
                            </div>

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Đang đặt lại...
                                    </>
                                ) : (
                                    "Đặt lại mật khẩu"
                                )}
                            </Button>
                        </form>
                    )}

                    {/* Step 4: Success */}
                    {step === "success" && (
                        <div className="text-center space-y-4 py-8">
                            <div className="flex justify-center">
                                <CheckCircle className="h-16 w-16 text-green-500" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-green-700">Đặt lại mật khẩu thành công!</h3>
                                <p className="text-sm text-muted-foreground">
                                    Mật khẩu của bạn đã được cập nhật.
                                    <br />
                                    Bạn sẽ được chuyển đến trang đăng nhập sau 3 giây...
                                </p>
                            </div>
                            <Button onClick={() => router.push("/login")} className="mt-4">
                                Đăng nhập ngay
                            </Button>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex flex-col space-y-2">
                    {step !== "success" && (
                        <Link href="/login" className="flex items-center text-sm text-muted-foreground hover:text-primary">
                            <ArrowLeft className="h-4 w-4 mr-1" />
                            Quay lại đăng nhập
                        </Link>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
