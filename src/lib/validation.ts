/**
 * Enhanced validation utilities with comprehensive error handling
 */

import { securityUtils } from "./security";
import { logger } from "./utils";

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
  transform?: (value: any) => any;
}

export interface ValidationSchema {
  [key: string]: ValidationRule;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
  data?: any;
}

export const validationUtils = {
  /**
   * Validate data against a schema
   */
  validate: (data: any, schema: ValidationSchema): ValidationResult => {
    const errors: Record<string, string[]> = {};
    const transformedData: any = {};

    for (const [field, rule] of Object.entries(schema)) {
      const value = data[field];
      const fieldErrors: string[] = [];

      // Required validation
      if (
        rule.required &&
        (value === undefined || value === null || value === "")
      ) {
        fieldErrors.push(`${field} is required`);
      }

      // Skip other validations if value is empty and not required
      if (
        !rule.required &&
        (value === undefined || value === null || value === "")
      ) {
        continue;
      }

      // Transform value if transformer provided
      const transformedValue = rule.transform ? rule.transform(value) : value;
      transformedData[field] = transformedValue;

      // String validations
      if (typeof transformedValue === "string") {
        if (rule.minLength && transformedValue.length < rule.minLength) {
          fieldErrors.push(
            `${field} must be at least ${rule.minLength} characters`
          );
        }
        if (rule.maxLength && transformedValue.length > rule.maxLength) {
          fieldErrors.push(
            `${field} must not exceed ${rule.maxLength} characters`
          );
        }
      }

      // Pattern validation
      if (rule.pattern && !rule.pattern.test(String(transformedValue))) {
        fieldErrors.push(`${field} format is invalid`);
      }

      // Custom validation
      if (rule.custom) {
        const customResult = rule.custom(transformedValue);
        if (customResult !== true) {
          fieldErrors.push(
            typeof customResult === "string"
              ? customResult
              : `${field} validation failed`
          );
        }
      }

      if (fieldErrors.length > 0) {
        errors[field] = fieldErrors;
      }
    }

    const isValid = Object.keys(errors).length === 0;

    if (!isValid) {
      logger.debug("Validation failed:", errors);
    }

    return {
      isValid,
      errors,
      data: isValid ? transformedData : undefined,
    };
  },

  /**
   * Common validation schemas
   */
  schemas: {
    user: {
      email: {
        required: true,
        pattern: securityUtils.validation.email,
        transform: (value: string) => value.toLowerCase().trim(),
      },
      password: {
        required: true,
        minLength: 8,
        pattern: securityUtils.validation.strongPassword,
      },
      firstName: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: securityUtils.validation.noSpecialChars,
        transform: (value: string) => value.trim(),
      },
      lastName: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: securityUtils.validation.noSpecialChars,
        transform: (value: string) => value.trim(),
      },
      phone: {
        pattern: securityUtils.validation.phone,
        transform: (value: string) => value.replace(/\s/g, ""),
      },
    },

    role: {
      name: {
        required: true,
        minLength: 3,
        maxLength: 50,
        pattern: securityUtils.validation.alphanumeric,
        transform: (value: string) => value.toLowerCase().trim(),
      },
      description: {
        maxLength: 200,
        transform: (value: string) => value.trim(),
      },
      permissions: {
        required: true,
        custom: (value: any) => Array.isArray(value) && value.length > 0,
      },
    },

    invitation: {
      email: {
        required: true,
        pattern: securityUtils.validation.email,
        transform: (value: string) => value.toLowerCase().trim(),
      },
      role: {
        required: true,
        minLength: 3,
        maxLength: 50,
      },
      message: {
        maxLength: 500,
        transform: (value: string) => value.trim(),
      },
    },
  },

  /**
   * Real-time field validation
   */
  validateField: (
    value: any,
    rule: ValidationRule
  ): { isValid: boolean; error?: string } => {
    const result = validationUtils.validate({ field: value }, { field: rule });
    return {
      isValid: result.isValid,
      error: result.errors.field?.[0],
    };
  },

  /**
   * Form validation helper
   */
  createFormValidator: (schema: ValidationSchema) => {
    return {
      validate: (data: any) => validationUtils.validate(data, schema),
      validateField: (field: string, value: any) => {
        if (!(field in schema)) return { isValid: true };
        return validationUtils.validateField(value, schema[field]);
      },
    };
  },

  /**
   * Async validation support
   */
  validateAsync: async (
    data: any,
    schema: ValidationSchema,
    asyncValidators?: Record<string, (value: any) => Promise<boolean | string>>
  ): Promise<ValidationResult> => {
    // First run synchronous validation
    const syncResult = validationUtils.validate(data, schema);

    if (!syncResult.isValid || !asyncValidators) {
      return syncResult;
    }

    // Run async validations
    const asyncErrors: Record<string, string[]> = {};

    for (const [field, validator] of Object.entries(asyncValidators)) {
      if (data[field] !== undefined) {
        try {
          const result = await validator(data[field]);
          if (result !== true) {
            asyncErrors[field] = [
              typeof result === "string"
                ? result
                : `${field} validation failed`,
            ];
          }
        } catch (error) {
          asyncErrors[field] = [`${field} validation error`];
          logger.error(`Async validation failed for ${field}:`, error);
        }
      }
    }

    // Merge errors
    const allErrors = { ...syncResult.errors, ...asyncErrors };
    const isValid = Object.keys(allErrors).length === 0;

    return {
      isValid,
      errors: allErrors,
      data: isValid ? syncResult.data : undefined,
    };
  },

  /**
   * Data sanitization
   */
  sanitize: {
    email: (email: string): string => email.toLowerCase().trim(),

    name: (name: string): string =>
      name
        .trim()
        .replace(/\s+/g, " ")
        .replace(/[^\w\s-]/g, ""),

    phone: (phone: string): string => phone.replace(/[^\d+()-\s]/g, "").trim(),

    url: (url: string): string => {
      try {
        return new URL(url).href;
      } catch {
        return "";
      }
    },

    html: (html: string): string => securityUtils.sanitizeHtml(html),

    filename: (filename: string): string =>
      filename.replace(/[^a-zA-Z0-9.-_]/g, "_").substring(0, 255),
  },

  /**
   * Bulk validation for arrays
   */
  validateBulk: <T>(
    items: T[],
    schema: ValidationSchema,
    stopOnFirstError = false
  ): {
    valid: T[];
    invalid: Array<{ item: T; errors: Record<string, string[]> }>;
  } => {
    const valid: T[] = [];
    const invalid: Array<{ item: T; errors: Record<string, string[]> }> = [];

    for (const item of items) {
      const result = validationUtils.validate(item, schema);

      if (result.isValid && result.data) {
        valid.push(result.data);
      } else {
        invalid.push({ item, errors: result.errors });

        if (stopOnFirstError) {
          break;
        }
      }
    }

    return { valid, invalid };
  },
} as const;

/**
 * Validation decorator for class methods
 */
export const validateInput = (schema: ValidationSchema) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const [data] = args;
      const result = validationUtils.validate(data, schema);

      if (!result.isValid) {
        throw new Error(`Validation failed: ${JSON.stringify(result.errors)}`);
      }

      return originalMethod.apply(this, [result.data, ...args.slice(1)]);
    };

    return descriptor;
  };
};
