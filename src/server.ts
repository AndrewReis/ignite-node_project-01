import { app } from "./app";
import env from "./validations/env";

app.listen({
  port: Number(env.PORT)
}).then(() => console.log('Server running on Port 3333'))