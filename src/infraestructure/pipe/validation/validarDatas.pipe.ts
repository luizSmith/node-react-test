import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { isValid, isBefore, isAfter, isToday, parseISO } from 'date-fns';

export function isValidDate(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string): void {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: {
                ...validationOptions,
                message: 'A data deve ser válida e seguir o formato AAAA-MM-DD',
            },
            constraints: [],
            validator: IsValidDateConstraint,
        });
    };
}

@ValidatorConstraint()
export class IsValidDateConstraint implements ValidatorConstraintInterface {
    validate(value: string): boolean {
        const dataValue = parseISO(value);
        return isValid(dataValue);
    }
}

export function isValidBirthDate(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string): void {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: {
                ...validationOptions,
                message: 'A data deve ser válida, seguir o formato AAAA-MM-DD e ser menor que hoje',
            },
            constraints: [],
            validator: IsValidBirthDateConstraint,
        });
    };
}

@ValidatorConstraint()
export class IsValidBirthDateConstraint implements ValidatorConstraintInterface {
    validate(value: string): boolean {
        const dataValue = parseISO(value);
        return isValid(dataValue) && isBefore(dataValue, new Date());
    }
}


export function IsDateGreaterThan(property: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsDateGreaterThan',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property],
            validator: {
                validate(value: string, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as Date)[relatedPropertyName];
                    const dataValue = parseISO(value);

                    if (!isValid(dataValue) || !isValid(relatedValue)) {
                        return false;
                    }

                    return dataValue > relatedValue;
                },
                defaultMessage(args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    return `${args.property} deve ser maior que ${relatedPropertyName}.`;
                }
            }
        });
    };
}



export function isDateGreaterThanNow(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string): void {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: {
                ...validationOptions,
                message: `${propertyName} deve ser maior que hoje.`
            },
            constraints: [],
            validator: IsDateGreaterThanNowConstraint,
        });
    };
}

@ValidatorConstraint()
export class IsDateGreaterThanNowConstraint implements ValidatorConstraintInterface {
    validate(value: string): boolean {
        const dataValue = parseISO(value);

        if (!isValid(dataValue)) {
            return false;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        console.log('agora', isToday(dataValue));
        console.log('futura', isAfter(dataValue, today));

        return isToday(dataValue) || isAfter(dataValue, today);
    }
}

