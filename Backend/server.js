import app from "./src/app.js";
import connectDB from "./src/config/database.js";


const PORT = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed", err);
        process.exit(1);
    });

app.get("/", (req, res) => {
    res.send("Hello World!");
});