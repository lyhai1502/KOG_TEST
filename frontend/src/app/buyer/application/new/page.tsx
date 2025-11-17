"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ChevronRight, ChevronLeft, User, DollarSign, FileText, Award, CheckSquare, Home, AlertCircle } from "lucide-react";

const personalInfoSchema = z.object({
    fullName: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
    dateOfBirth: z.string().min(1, "Vui lòng nhập ngày sinh"),
    idNumber: z.string().min(9, "CMND/CCCD không hợp lệ"),
    idType: z.enum(["CMND", "CCCD"], { required_error: "Vui lòng chọn loại giấy tờ" }),
    phone: z.string().min(10, "Số điện thoại không hợp lệ"),
    email: z.string().email("Email không hợp lệ"),
    permanentAddress: z.string().min(10, "Địa chỉ thường trú phải có ít nhất 10 ký tự"),
    currentAddress: z.string().min(10, "Địa chỉ hiện tại phải có ít nhất 10 ký tự"),
});

const incomeHousingSchema = z.object({
    monthlyIncome: z.string().min(1, "Vui lòng nhập thu nhập"),
    employmentStatus: z.string().min(1, "Vui lòng chọn tình trạng việc làm"),
    employerName: z.string().min(2, "Tên đơn vị công tác phải có ít nhất 2 ký tự"),
    currentHousingStatus: z.string().min(1, "Vui lòng chọn tình trạng nhà ở"),
    familyMembers: z.string().min(1, "Vui lòng nhập số thành viên"),
    dependents: z.string().min(1, "Vui lòng nhập số người phụ thuộc"),
});

const documentsSchema = z.object({
    idCardFront: z.any().optional(),
    idCardBack: z.any().optional(),
    incomeProof: z.any().optional(),
    householdBook: z.any().optional(),
    marriageCertificate: z.any().optional(),
});

const prioritySchema = z.object({
    isPriorityGroup: z.boolean().default(false),
    priorityType: z.string().optional(),
    proofDocument: z.any().optional(),
});

type Step = 1 | 2 | 3 | 4 | 5;

export default function NewApplicationPage() {
    const router = useRouter();
    const { user } = useAuthStore();
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [formData, setFormData] = useState<any>({});

    // Step 1: Personal Info
    const personalForm = useForm({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            fullName: user?.name || "",
            email: user?.email || "",
            idType: "CCCD" as const,
            dateOfBirth: "",
            idNumber: "",
            phone: "",
            permanentAddress: "",
            currentAddress: "",
        },
    });

    // Step 2: Income & Housing
    const incomeForm = useForm({
        resolver: zodResolver(incomeHousingSchema),
        defaultValues: {
            monthlyIncome: "",
            employmentStatus: "EMPLOYED",
            employerName: "",
            currentHousingStatus: "RENTING",
            familyMembers: "4",
            dependents: "2",
        },
    });

    // Step 3: Documents
    const documentsForm = useForm({
        resolver: zodResolver(documentsSchema),
    });

    // Step 4: Priority Status
    const priorityForm = useForm({
        resolver: zodResolver(prioritySchema),
        defaultValues: {
            isPriorityGroup: false,
            priorityType: "",
            proofDocument: undefined,
        },
    });

    const steps = [
        { number: 1, title: "Thông tin cá nhân", icon: User, description: "CMND/CCCD, địa chỉ" },
        { number: 2, title: "Thu nhập & Nhà ở", icon: DollarSign, description: "Việc làm, gia đình" },
        { number: 3, title: "Tài liệu", icon: FileText, description: "Tải lên giấy tờ" },
        { number: 4, title: "Đối tượng ưu tiên", icon: Award, description: "Nếu có" },
        { number: 5, title: "Xác nhận", icon: CheckSquare, description: "Kiểm tra và nộp" },
    ];

    const handleStep1Next = personalForm.handleSubmit((data) => {
        setFormData({ ...formData, ...data });
        setCurrentStep(2);
    });

    const handleStep2Next = incomeForm.handleSubmit((data) => {
        setFormData({ ...formData, ...data });
        setCurrentStep(3);
    });

    const handleStep3Next = documentsForm.handleSubmit((data) => {
        setFormData({ ...formData, ...data });
        setCurrentStep(4);
    });

    const handleStep4Next = priorityForm.handleSubmit((data) => {
        setFormData({ ...formData, ...data });
        setCurrentStep(5);
    });

    const handleFinalSubmit = () => {
        // Mock submit - in production, call API
        console.log("Final submission:", formData);
        alert("Hồ sơ đã được nộp thành công! Chúng tôi sẽ xem xét trong vòng 2-5 ngày làm việc.");
        router.push("/buyer/dashboard");
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-5xl mx-auto px-6">
                {/* Header */}
                <div className="mb-8">
                    <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Quay lại
                    </Button>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <Home className="h-8 w-8 text-blue-600" />
                        Nộp hồ sơ đăng ký mua NOXH
                    </h1>
                    <p className="text-gray-600 mt-2">Vui lòng điền đầy đủ thông tin để hoàn tất hồ sơ đăng ký</p>
                </div>

                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isCompleted = currentStep > step.number;
                            const isCurrent = currentStep === step.number;

                            return (
                                <div key={step.number} className="flex items-center flex-1">
                                    <div className="flex flex-col items-center flex-1">
                                        <div
                                            className={`
                      w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all
                      ${isCompleted ? "bg-green-500 text-white" : isCurrent ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}
                    `}
                                        >
                                            {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                                        </div>
                                        <div className="text-center">
                                            <p className={`text-sm font-medium ${isCurrent ? "text-blue-600" : "text-gray-600"}`}>{step.title}</p>
                                            <p className="text-xs text-gray-500">{step.description}</p>
                                        </div>
                                    </div>

                                    {index < steps.length - 1 && <div className={`h-1 flex-1 mx-2 mb-8 rounded ${isCompleted ? "bg-green-500" : "bg-gray-200"}`} />}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Form Content */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            {React.createElement(steps[currentStep - 1].icon, { className: "h-5 w-5" })}
                            {steps[currentStep - 1].title}
                        </CardTitle>
                        <CardDescription>{steps[currentStep - 1].description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Step 1: Personal Info */}
                        {currentStep === 1 && (
                            <form onSubmit={handleStep1Next} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">Họ và tên *</Label>
                                        <Input id="fullName" placeholder="Nguyễn Văn A" {...personalForm.register("fullName")} />
                                        {personalForm.formState.errors.fullName && <p className="text-sm text-red-600">{personalForm.formState.errors.fullName.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="dateOfBirth">Ngày sinh *</Label>
                                        <Input id="dateOfBirth" type="date" {...personalForm.register("dateOfBirth")} />
                                        {personalForm.formState.errors.dateOfBirth && <p className="text-sm text-red-600">{personalForm.formState.errors.dateOfBirth.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="idType">Loại giấy tờ *</Label>
                                        <select id="idType" className="w-full px-3 py-2 border rounded-md" {...personalForm.register("idType")}>
                                            <option value="CCCD">Căn cước công dân</option>
                                            <option value="CMND">Chứng minh nhân dân</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="idNumber">Số CMND/CCCD *</Label>
                                        <Input id="idNumber" placeholder="001234567890" {...personalForm.register("idNumber")} />
                                        {personalForm.formState.errors.idNumber && <p className="text-sm text-red-600">{personalForm.formState.errors.idNumber.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Số điện thoại *</Label>
                                        <Input id="phone" placeholder="0901234567" {...personalForm.register("phone")} />
                                        {personalForm.formState.errors.phone && <p className="text-sm text-red-600">{personalForm.formState.errors.phone.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email *</Label>
                                        <Input id="email" type="email" placeholder="email@example.com" {...personalForm.register("email")} />
                                        {personalForm.formState.errors.email && <p className="text-sm text-red-600">{personalForm.formState.errors.email.message}</p>}
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="permanentAddress">Địa chỉ thường trú *</Label>
                                        <Input id="permanentAddress" placeholder="123 Đường ABC, Phường XYZ, Quận 1, TP.HCM" {...personalForm.register("permanentAddress")} />
                                        {personalForm.formState.errors.permanentAddress && <p className="text-sm text-red-600">{personalForm.formState.errors.permanentAddress.message}</p>}
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="currentAddress">Địa chỉ hiện tại *</Label>
                                        <Input id="currentAddress" placeholder="456 Đường DEF, Phường UVW, Quận 2, TP.HCM" {...personalForm.register("currentAddress")} />
                                        {personalForm.formState.errors.currentAddress && <p className="text-sm text-red-600">{personalForm.formState.errors.currentAddress.message}</p>}
                                    </div>
                                </div>

                                <div className="flex justify-end pt-6">
                                    <Button type="submit" size="lg">
                                        Tiếp theo
                                        <ChevronRight className="h-5 w-5 ml-2" />
                                    </Button>
                                </div>
                            </form>
                        )}

                        {/* Step 2: Income & Housing */}
                        {currentStep === 2 && (
                            <form onSubmit={handleStep2Next} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="monthlyIncome">Thu nhập hàng tháng (VNĐ) *</Label>
                                        <Input id="monthlyIncome" type="number" placeholder="15000000" {...incomeForm.register("monthlyIncome")} />
                                        {incomeForm.formState.errors.monthlyIncome && <p className="text-sm text-red-600">{incomeForm.formState.errors.monthlyIncome.message}</p>}
                                        <p className="text-xs text-gray-500">Thu nhập phải từ 10-20 triệu VNĐ để đủ điều kiện mua NOXH</p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="employmentStatus">Tình trạng việc làm *</Label>
                                        <select id="employmentStatus" className="w-full px-3 py-2 border rounded-md" {...incomeForm.register("employmentStatus")}>
                                            <option value="EMPLOYED">Đang làm việc</option>
                                            <option value="SELF_EMPLOYED">Tự kinh doanh</option>
                                            <option value="UNEMPLOYED">Chưa có việc làm</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="employerName">Tên đơn vị công tác *</Label>
                                        <Input id="employerName" placeholder="Công ty TNHH ABC" {...incomeForm.register("employerName")} />
                                        {incomeForm.formState.errors.employerName && <p className="text-sm text-red-600">{incomeForm.formState.errors.employerName.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="currentHousingStatus">Tình trạng nhà ở hiện tại *</Label>
                                        <select id="currentHousingStatus" className="w-full px-3 py-2 border rounded-md" {...incomeForm.register("currentHousingStatus")}>
                                            <option value="NO_HOUSE">Chưa có nhà</option>
                                            <option value="RENTING">Đang thuê nhà</option>
                                            <option value="OWNED">Đang sở hữu nhà</option>
                                            <option value="LIVING_WITH_FAMILY">Sống cùng gia đình</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="familyMembers">Số thành viên trong hộ *</Label>
                                        <Input id="familyMembers" type="number" {...incomeForm.register("familyMembers")} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="dependents">Số người phụ thuộc *</Label>
                                        <Input id="dependents" type="number" {...incomeForm.register("dependents")} />
                                    </div>
                                </div>

                                <div className="flex justify-between pt-6">
                                    <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                                        <ChevronLeft className="h-5 w-5 mr-2" />
                                        Quay lại
                                    </Button>
                                    <Button type="submit" size="lg">
                                        Tiếp theo
                                        <ChevronRight className="h-5 w-5 ml-2" />
                                    </Button>
                                </div>
                            </form>
                        )}

                        {/* Step 3: Documents */}
                        {currentStep === 3 && (
                            <form onSubmit={handleStep3Next} className="space-y-6">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <div className="text-sm text-blue-900">
                                            <p className="font-medium mb-1">Lưu ý khi tải tài liệu:</p>
                                            <ul className="list-disc list-inside space-y-1 text-blue-800">
                                                <li>File định dạng: JPG, PNG, PDF (tối đa 5MB)</li>
                                                <li>Hình ảnh phải rõ nét, không bị mờ hoặc che khuất</li>
                                                <li>Tài liệu phải còn hiệu lực (chưa hết hạn)</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="border rounded-lg p-4">
                                        <Label className="text-base font-semibold mb-2 block">CMND/CCCD (Mặt trước) *</Label>
                                        <Input type="file" accept="image/*,application/pdf" />
                                        <p className="text-xs text-gray-500 mt-1">Hình ảnh rõ nét mặt trước CMND/CCCD</p>
                                    </div>

                                    <div className="border rounded-lg p-4">
                                        <Label className="text-base font-semibold mb-2 block">CMND/CCCD (Mặt sau) *</Label>
                                        <Input type="file" accept="image/*,application/pdf" />
                                        <p className="text-xs text-gray-500 mt-1">Hình ảnh rõ nét mặt sau CMND/CCCD</p>
                                    </div>

                                    <div className="border rounded-lg p-4">
                                        <Label className="text-base font-semibold mb-2 block">Giấy xác nhận thu nhập *</Label>
                                        <Input type="file" accept="image/*,application/pdf" />
                                        <p className="text-xs text-gray-500 mt-1">Giấy xác nhận từ đơn vị công tác hoặc hợp đồng lao động + bảng lương 3 tháng gần nhất</p>
                                    </div>

                                    <div className="border rounded-lg p-4">
                                        <Label className="text-base font-semibold mb-2 block">Sổ hộ khẩu *</Label>
                                        <Input type="file" accept="image/*,application/pdf" />
                                        <p className="text-xs text-gray-500 mt-1">Ảnh chụp tất cả các trang có thông tin trong sổ</p>
                                    </div>

                                    <div className="border rounded-lg p-4">
                                        <Label className="text-base font-semibold mb-2 block">Giấy chứng nhận kết hôn (nếu có)</Label>
                                        <Input type="file" accept="image/*,application/pdf" />
                                        <p className="text-xs text-gray-500 mt-1">Bắt buộc nếu bạn đã kết hôn</p>
                                    </div>
                                </div>

                                <div className="flex justify-between pt-6">
                                    <Button type="button" variant="outline" onClick={() => setCurrentStep(2)}>
                                        <ChevronLeft className="h-5 w-5 mr-2" />
                                        Quay lại
                                    </Button>
                                    <Button type="submit" size="lg">
                                        Tiếp theo
                                        <ChevronRight className="h-5 w-5 ml-2" />
                                    </Button>
                                </div>
                            </form>
                        )}

                        {/* Step 4: Priority Status */}
                        {currentStep === 4 && (
                            <form onSubmit={handleStep4Next} className="space-y-6">
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                                    <div className="flex items-start gap-3">
                                        <Award className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                        <div className="text-sm text-amber-900">
                                            <p className="font-medium mb-1">Đối tượng được ưu tiên:</p>
                                            <ul className="list-disc list-inside space-y-1 text-amber-800">
                                                <li>Gia đình có công với cách mạng</li>
                                                <li>Thương binh, bệnh binh</li>
                                                <li>Gia đình liệt sĩ</li>
                                                <li>Người có hoàn cảnh đặc biệt khó khăn</li>
                                                <li>Người lao động trực tiếp trong khu công nghiệp</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <input type="checkbox" id="isPriorityGroup" className="w-5 h-5 rounded border-gray-300" {...priorityForm.register("isPriorityGroup")} />
                                        <Label htmlFor="isPriorityGroup" className="text-base font-medium cursor-pointer">
                                            Tôi thuộc đối tượng ưu tiên
                                        </Label>
                                    </div>

                                    {priorityForm.watch("isPriorityGroup") && (
                                        <>
                                            <div className="space-y-2">
                                                <Label htmlFor="priorityType">Loại đối tượng ưu tiên *</Label>
                                                <select id="priorityType" className="w-full px-3 py-2 border rounded-md" {...priorityForm.register("priorityType")}>
                                                    <option value="">-- Chọn loại --</option>
                                                    <option value="GIA_ĐÌNH_CÔNG_CÁCH_MẠNG">Gia đình có công với cách mạng</option>
                                                    <option value="THƯƠNG_BỆNH_BINH">Thương binh, bệnh binh</option>
                                                    <option value="GIA_ĐÌNH_LIỆT_SĨ">Gia đình liệt sĩ</option>
                                                    <option value="KHÓ_KHĂN">Hoàn cảnh đặc biệt khó khăn</option>
                                                    <option value="LAO_ĐỘNG_KCN">Người lao động trong KCN</option>
                                                </select>
                                            </div>

                                            <div className="border rounded-lg p-4">
                                                <Label className="text-base font-semibold mb-2 block">Giấy chứng nhận ưu tiên *</Label>
                                                <Input type="file" accept="image/*,application/pdf" />
                                                <p className="text-xs text-gray-500 mt-1">Giấy xác nhận từ cơ quan có thẩm quyền</p>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="flex justify-between pt-6">
                                    <Button type="button" variant="outline" onClick={() => setCurrentStep(3)}>
                                        <ChevronLeft className="h-5 w-5 mr-2" />
                                        Quay lại
                                    </Button>
                                    <Button type="submit" size="lg">
                                        Tiếp theo
                                        <ChevronRight className="h-5 w-5 ml-2" />
                                    </Button>
                                </div>
                            </form>
                        )}

                        {/* Step 5: Review & Submit */}
                        {currentStep === 5 && (
                            <div className="space-y-6">
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <div className="text-sm text-green-900">
                                            <p className="font-medium mb-1">Xác nhận thông tin</p>
                                            <p>Vui lòng kiểm tra kỹ thông tin trước khi nộp. Sau khi nộp, bạn không thể chỉnh sửa hồ sơ.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="border rounded-lg p-4">
                                        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                            <User className="h-5 w-5" />
                                            Thông tin cá nhân
                                        </h3>
                                        <dl className="grid grid-cols-2 gap-3 text-sm">
                                            <div>
                                                <dt className="text-gray-600">Họ tên:</dt>
                                                <dd className="font-medium">{formData.fullName}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-gray-600">Ngày sinh:</dt>
                                                <dd className="font-medium">{formData.dateOfBirth}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-gray-600">CMND/CCCD:</dt>
                                                <dd className="font-medium">{formData.idNumber}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-gray-600">Điện thoại:</dt>
                                                <dd className="font-medium">{formData.phone}</dd>
                                            </div>
                                        </dl>
                                    </div>

                                    <div className="border rounded-lg p-4">
                                        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                            <DollarSign className="h-5 w-5" />
                                            Thu nhập & Nhà ở
                                        </h3>
                                        <dl className="grid grid-cols-2 gap-3 text-sm">
                                            <div>
                                                <dt className="text-gray-600">Thu nhập:</dt>
                                                <dd className="font-medium">{parseInt(formData.monthlyIncome || "0").toLocaleString("vi-VN")} VNĐ/tháng</dd>
                                            </div>
                                            <div>
                                                <dt className="text-gray-600">Đơn vị công tác:</dt>
                                                <dd className="font-medium">{formData.employerName}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-gray-600">Tình trạng nhà ở:</dt>
                                                <dd className="font-medium">{formData.currentHousingStatus}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-gray-600">Thành viên gia đình:</dt>
                                                <dd className="font-medium">{formData.familyMembers} người</dd>
                                            </div>
                                        </dl>
                                    </div>

                                    {formData.isPriorityGroup && (
                                        <div className="border rounded-lg p-4 bg-amber-50">
                                            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                                <Award className="h-5 w-5 text-amber-600" />
                                                Đối tượng ưu tiên
                                            </h3>
                                            <p className="text-sm">
                                                <span className="text-gray-600">Loại:</span>
                                                <span className="font-medium ml-2">{formData.priorityType}</span>
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-gray-50 border rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <input type="checkbox" id="agree" className="mt-1 w-5 h-5" required />
                                        <Label htmlFor="agree" className="text-sm cursor-pointer">
                                            Tôi xác nhận rằng tất cả thông tin và tài liệu tôi cung cấp là chính xác và đúng sự thật. Tôi hiểu rằng việc cung cấp thông tin sai sự thật có thể dẫn đến
                                            việc hồ sơ bị từ chối và tôi có thể phải chịu trách nhiệm pháp lý.
                                        </Label>
                                    </div>
                                </div>

                                <div className="flex justify-between pt-6">
                                    <Button type="button" variant="outline" onClick={() => setCurrentStep(4)}>
                                        <ChevronLeft className="h-5 w-5 mr-2" />
                                        Quay lại
                                    </Button>
                                    <Button type="button" size="lg" className="bg-green-600 hover:bg-green-700" onClick={handleFinalSubmit}>
                                        <CheckCircle2 className="h-5 w-5 mr-2" />
                                        Nộp hồ sơ
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
