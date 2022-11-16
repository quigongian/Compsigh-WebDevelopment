import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

export const swaggerHandler = swaggerUi.setup(
    YAML.load(path.join(process.cwd(), "static", "swagger.yml"))
);
