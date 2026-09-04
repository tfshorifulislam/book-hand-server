import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../lib/prisma.js";
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (_accessToken, _refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
            return done(new Error("Google email not found"));
        }
        let user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            user = await prisma.user.create({
                data: {
                    name: profile.displayName,
                    email,
                    image: profile.photos?.[0]?.value ?? null,
                    password: null,
                },
            });
        }
        else if (!user.image && profile.photos?.[0]?.value) {
            user = await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    image: profile.photos[0].value,
                },
            });
        }
        return done(null, user);
    }
    catch (error) {
        return done(error, undefined);
    }
}));
export default passport;
