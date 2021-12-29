import { body } from 'express-validator';

const dateFormat = 'yyyy-mm-dd';

export default () => {
  return [
    body('name').isString().notEmpty(),
    body('birthDate').optional().isDate({
      format: dateFormat
    }),
    body('deathDate').optional().isDate({
      format: dateFormat
    }),
    body('description').optional().isString(),
    body('name').exists().isString(),
  ];
}
