import "dotenv/config";
import app from "./app.js";
import { connectRedis } from "./config/redis.js";
await connectRedis();
export default app;
const PORT = process.env.PORT || 8000;
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
}
