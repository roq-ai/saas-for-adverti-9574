import * as yup from 'yup';

export const advertisementScriptValidationSchema = yup.object().shape({
  brand_name: yup.string().required(),
  good_reviews: yup.string().required(),
  bad_reviews: yup.string().required(),
  competitors_detail: yup.string().required(),
  keywords: yup.string().required(),
  product_description: yup.string().required(),
  organization_id: yup.string().nullable(),
});
