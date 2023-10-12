import { ZodError } from "zod";

class CustomError extends Error {

    public constructor(payload: string | Error | Object | ZodError | unknown) {

        if (!payload) {
            super("Unknown error 🚨");
            return;
        }

        if (payload instanceof ZodError) {

            super(payload.issues.map(issue => issue.message).join(", "));
            Object.setPrototypeOf(this, CustomError.prototype);
            this.name = payload.name;
            return
        }

        if (payload instanceof Error) {
            super(payload.message);
            Object.setPrototypeOf(this, CustomError.prototype);
            this.name = payload.name;
            return
        }


        if (typeof payload === 'string') {
            super(payload)
            Object.setPrototypeOf(this, CustomError.prototype);
            this.name = "Custom error 🚨";

            return
        }

        if (payload instanceof Object) {
            super(JSON.stringify(payload));
            Object.setPrototypeOf(this, CustomError.prototype);
            this.name = "Unknown error 🚨";

            return
        }
    }

}

export default CustomError