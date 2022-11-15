import { Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

export function swaggerHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    swaggerUi.setup(
        YAML.load(path.join(__dirname, "..", "..", "static", "swagger.yml"))
    )(req, res, next);
}

// export const swaggerHandler = swaggerUi.setup(
//     YAML.load(path.join(__dirname, "..", "..", "static", "swagger.yml"))
// );
