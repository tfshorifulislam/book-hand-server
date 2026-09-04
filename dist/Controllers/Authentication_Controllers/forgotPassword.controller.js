import { prisma } from "../../lib/prisma.js";
import { generateResetToken } from "../../utils/password-reset.js";
import { transporter } from "../../Config/mail.js";
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        // Don't reveal whether email exists
        if (!user) {
            return res.status(200).json({
                success: true,
                message: "If an account exists with this email, a password reset link has been sent.",
            });
        }
        const { token, hashedToken } = generateResetToken();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                resetPasswordToken: hashedToken,
                resetPasswordExpires: expiresAt,
            },
        });
        const resetUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/reset-password?token=${token}`;
        await transporter.sendMail({
            from: `"BookHand" <${process.env.MAIL_USER}>`,
            to: user.email,
            subject: "Reset your BookHand password",
            html: `
                <div>
                    <h2>Reset your BookHand password</h2>

                    <p>
                        We received a request to reset your password.
                    </p>

                    <p>
                        Click the button below to create a new password.
                    </p>

                    <a
                        href="${resetUrl}"
                        style="
                            display:inline-block;
                            padding:12px 20px;
                            background:#000;
                            color:#fff;
                            text-decoration:none;
                            border-radius:6px;
                        "
                    >
                        Reset Password
                    </a>

                    <p>
                        This link will expire in 15 minutes.
                    </p>

                    <p>
                        If you didn't request this, you can safely ignore
                        this email.
                    </p>
                </div>
            `,
        });
        return res.status(200).json({
            success: true,
            message: "If an account exists with this email, a password reset link has been sent.",
        });
    }
    catch (error) {
        console.error("Forgot password error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};
