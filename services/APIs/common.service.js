import { Delete, get, patch, post } from "../helpers/http-handler";

export const fetchAmenities = () =>
  get(`${process.env.NEXT_PUBLIC_API_URL}/api/amenities`, { populate: "*" });

export const fetchBanners = () =>
  get(`${process.env.NEXT_PUBLIC_API_URL}/api/banners`, { populate: "*" });

export const fetchBlogs = (payload) => {
  const defaultPayload = {
    populate: "*",
    ...payload,
  };
  return get(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, defaultPayload);
};

export const postCreatePopupInquiry = (payload) => {
  return post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/popup-inquiries`,
    payload
  );
};

export const fetchGuidanceValues = (payload) => {
  const defaultPayload = {
    populate: "*",
    ...payload,
  };
  return get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/guidance-values`,
    defaultPayload
  );
};

export const fetchCareer = (payload) => {
  const defaultPayload = {
    populate: "*",
    ...payload,
  };
  return get(`${process.env.NEXT_PUBLIC_API_URL}/api/careers`, defaultPayload);
};

export const fetchFaq = (payload) => {
  const defaultPayload = {
    populate: "*",
    ...payload,
  };
  return get(`${process.env.NEXT_PUBLIC_API_URL}/api/faqs`, defaultPayload);
};

export const fetchCities = () =>
  get(`${process.env.NEXT_PUBLIC_API_URL}/api/cities`);

export const fetchDevelopers = (payload) => {
  const defaultPayload = {
    populate: "*",
    ...payload,
  };
  return get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/developers`,
    defaultPayload
  );
};

export const fetchLocations = () =>
  get(`${process.env.NEXT_PUBLIC_API_URL}/api/locations`);

export const fetchLocationAreas = (payload) => {
  const defaultPayload = {
    populate: "*",
    ...payload,
  };
  return get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/location-areas`,
    defaultPayload
  );
};
export const fetchPages = (payload) => {
  const defaultPayload = {
    populate: "*",
    ...payload,
  };
  return get(`${process.env.NEXT_PUBLIC_API_URL}/api/pages`, defaultPayload);
};

export const fetchOurPartners = () =>
  get(`${process.env.NEXT_PUBLIC_API_URL}/api/our-partners`, { populate: "*" });

export const fetchOurBank = () =>
  get(`${process.env.NEXT_PUBLIC_API_URL}/api/our-banks`, { populate: "*" });

export const fetchPropertyBhks = () =>
  get(`${process.env.NEXT_PUBLIC_API_URL}/api/property-bhks`, {
    populate: "*",
  });

export const fetchPropertyTypes = () =>
  get(`${process.env.NEXT_PUBLIC_API_URL}/api/property-types`, {
    populate: "*",
  });

export const fetchSaleProperties = (payload) => {
  const defaultPayload = {
    populate:
      "amenities,brochure,cover_image,logo,developer,images,property_type,neighborhood.points,location,location_area,property_bhks,similar_sale_properties.cover_image,similar_properties.cover_image,video_cover_image,unit_plans,unit_availabilities.cover_image, unit_availabilities.developer, unit_availabilities.property_type, unit_availabilities.location, unit_availabilities.location_area, unit_availabilities.property_bhks, similar_sale_properties.amenities, similar_sale_properties.brochure, similar_sale_properties.cover_image, similar_sale_properties.logo, similar_sale_properties.developer, similar_sale_properties.images, similar_sale_properties.property_type, similar_sale_properties.neighborhood.points, similar_sale_properties.location, similar_sale_properties.location_area, similar_sale_properties.property_bhks",
    ...payload,
  };
  return get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sale-properties`,
    defaultPayload
  );
};

export const fetchRentProperties = (payload) => {
  const defaultPayload = {
    populate:
      "amenities,brochure,cover_image,logo,developer,images,property_type,neighborhood.points,location,location_area,property_bhks,similar_sale_properties.cover_image,similar_properties.cover_image,video_cover_image,unit_plans,unit_availabilities.cover_image, unit_availabilities.developer, unit_availabilities.property_type, unit_availabilities.location, unit_availabilities.location_area, unit_availabilities.property_bhks, similar_sale_properties.amenities, similar_sale_properties.brochure, similar_sale_properties.cover_image, similar_sale_properties.logo, similar_sale_properties.developer, similar_sale_properties.images, similar_sale_properties.property_type, similar_sale_properties.neighborhood.points, similar_sale_properties.location, similar_sale_properties.location_area, similar_sale_properties.property_bhks, rent_properties",
    ...payload,
  };
  return get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/rent-properties`,
    defaultPayload
  );
};

export const postCreatePropertyEnquiry = (payload) => {
  return post(`${process.env.NEXT_PUBLIC_API_URL}/api/enquiries`, payload);
};

export const postCreateSalePropertyEnquiry = (payload) => {
  return post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sale-property-enquiries`,
    payload
  );
};

export const postCreateRentPropertyEnquiry = (payload) => {
  return post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/rent-property-enquiries`,
    payload
  );
};

export const fetchCreateSalePropertyByUser = (payload) => {
  return post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sale-properties`,
    payload
  );
};

export const fetchCreateRentPropertyByUser = (payload) => {
  return post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/rent-properties`,
    payload
  );
};

export const fetchUpdateSaleProperty = (payload) => {
  return post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sale-properties`,
    payload
  );
};

export const fetchUpdateRentProperty = (payload) => {
  return post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/rent-properties`,
    payload
  );
};

export const fetchCarrerApplication = (payload) => {
  return post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/career-applications`,
    payload
  );
};
