import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createAdvertisementScript } from 'apiSdk/advertisement-scripts';
import { Error } from 'components/error';
import { advertisementScriptValidationSchema } from 'validationSchema/advertisement-scripts';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { AdvertisementScriptInterface } from 'interfaces/advertisement-script';

function AdvertisementScriptCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: AdvertisementScriptInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createAdvertisementScript(values);
      resetForm();
      router.push('/advertisement-scripts');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<AdvertisementScriptInterface>({
    initialValues: {
      brand_name: '',
      good_reviews: '',
      bad_reviews: '',
      competitors_detail: '',
      keywords: '',
      product_description: '',
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: advertisementScriptValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Advertisement Script
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="brand_name" mb="4" isInvalid={!!formik.errors?.brand_name}>
            <FormLabel>Brand Name</FormLabel>
            <Input type="text" name="brand_name" value={formik.values?.brand_name} onChange={formik.handleChange} />
            {formik.errors.brand_name && <FormErrorMessage>{formik.errors?.brand_name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="good_reviews" mb="4" isInvalid={!!formik.errors?.good_reviews}>
            <FormLabel>Good Reviews</FormLabel>
            <Input type="text" name="good_reviews" value={formik.values?.good_reviews} onChange={formik.handleChange} />
            {formik.errors.good_reviews && <FormErrorMessage>{formik.errors?.good_reviews}</FormErrorMessage>}
          </FormControl>
          <FormControl id="bad_reviews" mb="4" isInvalid={!!formik.errors?.bad_reviews}>
            <FormLabel>Bad Reviews</FormLabel>
            <Input type="text" name="bad_reviews" value={formik.values?.bad_reviews} onChange={formik.handleChange} />
            {formik.errors.bad_reviews && <FormErrorMessage>{formik.errors?.bad_reviews}</FormErrorMessage>}
          </FormControl>
          <FormControl id="competitors_detail" mb="4" isInvalid={!!formik.errors?.competitors_detail}>
            <FormLabel>Competitors Detail</FormLabel>
            <Input
              type="text"
              name="competitors_detail"
              value={formik.values?.competitors_detail}
              onChange={formik.handleChange}
            />
            {formik.errors.competitors_detail && (
              <FormErrorMessage>{formik.errors?.competitors_detail}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl id="keywords" mb="4" isInvalid={!!formik.errors?.keywords}>
            <FormLabel>Keywords</FormLabel>
            <Input type="text" name="keywords" value={formik.values?.keywords} onChange={formik.handleChange} />
            {formik.errors.keywords && <FormErrorMessage>{formik.errors?.keywords}</FormErrorMessage>}
          </FormControl>
          <FormControl id="product_description" mb="4" isInvalid={!!formik.errors?.product_description}>
            <FormLabel>Product Description</FormLabel>
            <Input
              type="text"
              name="product_description"
              value={formik.values?.product_description}
              onChange={formik.handleChange}
            />
            {formik.errors.product_description && (
              <FormErrorMessage>{formik.errors?.product_description}</FormErrorMessage>
            )}
          </FormControl>
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'advertisement_script',
    operation: AccessOperationEnum.CREATE,
  }),
)(AdvertisementScriptCreatePage);
