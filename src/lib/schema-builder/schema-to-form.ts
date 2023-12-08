/* eslint-disable @typescript-eslint/no-explicit-any */
// import { JSONSchemaType } from 'ajv';
import Ajv2020 from 'ajv/dist/2020';
import addFormats from 'ajv-formats';

// import { map } from 'zod';
import logger from '../logger';

import { FormFields } from '@src/types';

function schemaTypeFormatMapper(format: string): string {
  switch (format) {
    default:
      return format;
      break;
  }
}

function schemaTypeToFormTypeMapper(
  type: string | string[],
  object: any
): string {
  switch (type) {
    case 'string':
      return object.format ? schemaTypeFormatMapper(object.format) : 'text';
    case 'number':
    case 'integer':
      return 'number';
    default:
      return object.enum ? 'enum' : (type as string);
  }
}

function pushObjectIntoJSON(existingJSON: any, newObject: any) {
  if (typeof existingJSON === 'object' && typeof newObject === 'object') {
    // Merge the new object into the existing JSON
    return { ...existingJSON, ...newObject };
  } else {
    // console.error('Both inputs must be valid JSON objects.');
    return existingJSON; // Return the existing JSON as is
  }
}

function handleRequiredFields(schema: any, formFields: FormFields[]) {
  schema.required &&
    schema.required.map((field: string) => {
      formFields.map((object) => {
        logger(`looper: ${field}, ${object}`);
        if (object.id === field) {
          object.isRequired = true;
        }
      });
    });
}

function handleRequiredValidation(fields: FormFields[]) {
  fields.map((object: FormFields) => {
    let validationObject = object.validation || {};

    if (object.isRequired) {
      validationObject = pushObjectIntoJSON(validationObject || {}, {
        required: `${object.labelText} must be filled!`,
      });

      object.validation = validationObject;
    }
  });
}

function handleCustomFormat(fields: FormFields[]) {
  fields.map((object: FormFields) => {
    let validationObject = object.validation || {};

    if (object.type === 'email') {
      validationObject = pushObjectIntoJSON(validationObject || {}, {
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Invalid email address',
        },
      });

      object.validation = validationObject;
    }
  });
}

function transformStrings(str: string): string[] {
  return str
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
}

export function schemaToForm(schema: any, uischema?: any): FormFields[] | null {
  const formFields: FormFields[] = [];
  let schemavalidation;
  const ajv = new Ajv2020({ allErrors: true });
  addFormats(ajv);

  try {
    schemavalidation = ajv.compile(schema);

    if (!schemavalidation) {
      return null;
    }
  } catch (error) {
    logger(error, uischema);
  }

  for (const key in schema.properties) {
    const object = schema.properties[key];
    const field: FormFields = {
      labelText: object.title || `${key}'s title`,
      labelFor: key,
      id: key,
      name: key,
      type: schemaTypeToFormTypeMapper(object.type, object),
      autoComplete: '',
      isRequired: false,
      placeholder: object.description.split('.')[0],
      titlekey: object.title || `${key}'s title`,
      options:
        object.enum &&
        object.enum.map((value: string) => {
          return { label: transformStrings(value), value: value };
        }),
    };

    formFields.push(field);
  }

  handleRequiredFields(schema, formFields);
  handleRequiredValidation(formFields);
  handleCustomFormat(formFields);

  return formFields;
}
