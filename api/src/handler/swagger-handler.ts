import { Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

export function swaggerHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    swaggerUi.setup(YAML.load("./static/swagger.yml"))(req, res, next);
}

// export const swaggerHandler = swaggerUi.setup(YAML.load("./static/swagger.yml"));
