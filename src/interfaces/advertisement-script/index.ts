import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface AdvertisementScriptInterface {
  id?: string;
  brand_name: string;
  good_reviews: string;
  bad_reviews: string;
  competitors_detail: string;
  keywords: string;
  product_description: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface AdvertisementScriptGetQueryInterface extends GetQueryInterface {
  id?: string;
  brand_name?: string;
  good_reviews?: string;
  bad_reviews?: string;
  competitors_detail?: string;
  keywords?: string;
  product_description?: string;
  organization_id?: string;
}
