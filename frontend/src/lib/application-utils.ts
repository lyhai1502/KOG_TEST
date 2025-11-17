/**
 * Utility functions for managing NOXH application draft state
 * Includes auto-save to localStorage and document preview
 */

const DRAFT_KEY = "application-draft";
const DRAFT_TIMESTAMP_KEY = "application-draft-timestamp";

export interface ApplicationDraft {
    step: number;
    personalInfo?: {
        fullName?: string;
        dateOfBirth?: string;
        idNumber?: string;
        idType?: "CMND" | "CCCD";
        phone?: string;
        email?: string;
        permanentAddress?: string;
        currentAddress?: string;
    };
    incomeHousing?: {
        monthlyIncome?: string;
        employmentStatus?: string;
        employerName?: string;
        currentHousingStatus?: string;
        familyMembers?: string;
        dependents?: string;
    };
    priority?: {
        isPriorityGroup?: boolean;
        priorityType?: string;
    };
    lastSaved?: number;
}

export interface UploadedDocument {
    id: string;
    name: string;
    file: File;
    preview?: string;
    size: number;
    type: string;
    uploadedAt: number;
}

/**
 * Save application draft to localStorage
 */
export function saveDraft(draft: ApplicationDraft): void {
    if (typeof window === "undefined") return;

    try {
        const draftWithTimestamp = {
            ...draft,
            lastSaved: Date.now(),
        };
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draftWithTimestamp));
        localStorage.setItem(DRAFT_TIMESTAMP_KEY, Date.now().toString());
    } catch (error) {
        console.error("Failed to save application draft:", error);
    }
}

/**
 * Load application draft from localStorage
 */
export function loadDraft(): ApplicationDraft | null {
    if (typeof window === "undefined") return null;

    try {
        const draftStr = localStorage.getItem(DRAFT_KEY);
        if (!draftStr) return null;

        const draft = JSON.parse(draftStr);
        return draft;
    } catch (error) {
        console.error("Failed to load application draft:", error);
        return null;
    }
}

/**
 * Clear application draft from localStorage
 */
export function clearDraft(): void {
    if (typeof window === "undefined") return;

    try {
        localStorage.removeItem(DRAFT_KEY);
        localStorage.removeItem(DRAFT_TIMESTAMP_KEY);
    } catch (error) {
        console.error("Failed to clear application draft:", error);
    }
}

/**
 * Get last saved timestamp
 */
export function getLastSavedTime(): number | null {
    if (typeof window === "undefined") return null;

    try {
        const timestamp = localStorage.getItem(DRAFT_TIMESTAMP_KEY);
        return timestamp ? parseInt(timestamp) : null;
    } catch (error) {
        console.error("Failed to get last saved time:", error);
        return null;
    }
}

/**
 * Format last saved time as relative string
 */
export function formatLastSavedTime(timestamp: number): string {
    const now = Date.now();
    const diff = now - timestamp;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} ngày trước`;
    if (hours > 0) return `${hours} giờ trước`;
    if (minutes > 0) return `${minutes} phút trước`;
    return "Vừa xong";
}

/**
 * Create preview URL for uploaded document
 */
export function createDocumentPreview(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        } else if (file.type === "application/pdf") {
            // For PDF, return a placeholder icon
            resolve("/pdf-icon.svg");
        } else {
            resolve("/document-icon.svg");
        }
    });
}

/**
 * Format file size to human-readable string
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

/**
 * Validate file upload (size and type)
 */
export function validateFileUpload(file: File): { valid: boolean; error?: string } {
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

    if (!ALLOWED_TYPES.includes(file.type)) {
        return {
            valid: false,
            error: "Định dạng file không hợp lệ. Chỉ chấp nhận JPG, PNG, PDF",
        };
    }

    if (file.size > MAX_SIZE) {
        return {
            valid: false,
            error: `File quá lớn. Kích thước tối đa là ${formatFileSize(MAX_SIZE)}`,
        };
    }

    return { valid: true };
}

/**
 * Calculate application completion percentage
 */
export function calculateCompletionPercentage(draft: ApplicationDraft): number {
    let completed = 0;
    const total = 4; // 4 main steps (excluding review)

    // Step 1: Personal Info
    if (draft.personalInfo) {
        const requiredFields = ["fullName", "dateOfBirth", "idNumber", "phone", "email", "permanentAddress", "currentAddress"];
        const filledFields = requiredFields.filter((field) => draft.personalInfo?.[field as keyof typeof draft.personalInfo]);
        if (filledFields.length === requiredFields.length) completed++;
    }

    // Step 2: Income & Housing
    if (draft.incomeHousing) {
        const requiredFields = ["monthlyIncome", "employmentStatus", "employerName", "currentHousingStatus", "familyMembers", "dependents"];
        const filledFields = requiredFields.filter((field) => draft.incomeHousing?.[field as keyof typeof draft.incomeHousing]);
        if (filledFields.length === requiredFields.length) completed++;
    }

    // Step 3: Documents - assume completed if user is past this step
    if (draft.step && draft.step >= 4) completed++;

    // Step 4: Priority - optional, always counts as complete
    completed++;

    return Math.round((completed / total) * 100);
}

/**
 * Generate unique application tracking number
 */
export function generateTrackingNumber(): string {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();

    return `NOXH${year}${month}${random}`;
}
