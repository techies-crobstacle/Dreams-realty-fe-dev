import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_e67pkv9';
const EMAILJS_TEMPLATE_ID = 'template_ylspgzo';
const EMAILJS_PUBLIC_KEY = 'q9Fr2zJMwV3ooiPQP';


/**
 * Send property listing notification email
 */
export const sendPropertyListingEmail = async (emailData) => {
  try {
    const {
      fullName, email, phone,
      listingType, propertyTypeName,
      propertyData,
      cityName, locationName, locationAreaName,
      developerName, bhkList, amenitiesList,
      imageCount,
    } = emailData;

    // Format helpers
    const formatArea = (area) => area ? `${area} sq.ft` : 'N/A';
    const formatPrice = (price) => price ? `₹${Number(price).toLocaleString('en-IN')}` : 'N/A';
    const formatFurnishing = (f) => ({
      'furnished': 'Fully Furnished',
      'semi_furnished': 'Semi Furnished',
      'unfurnished': 'Unfurnished',
    }[f] || f || 'N/A');
    const formatFacing = (f) => ({
      'north': 'North', 'south': 'South', 'east': 'East', 'west': 'West',
      'north_east': 'North-East', 'north_west': 'North-West',
      'south_east': 'South-East', 'south_west': 'South-West',
    }[f] || f || 'N/A');

    // Email template parameters
    const templateParams = {
      // Recipient
      to_name: 'Dreams Realty Team',
      
      // User Information
      from_name: fullName,
      user_email: email,
      user_phone: phone,
      
      // Property Type
      listing_type: listingType,
      property_type: propertyTypeName,
      
      // Basic Information
      property_title: propertyData.title || 'N/A',
      property_address: propertyData.address || 'N/A',
      property_about: propertyData.about || 'Not provided',
      
      // Pricing
      price: formatPrice(propertyData.price),
      
      // Specifications
      bathrooms: propertyData.bathrooms || 'N/A',
      balcony: propertyData.balcony || 'N/A',
      
      // Areas
      plot_area: formatArea(propertyData.plot_area),
      plot_area_range: propertyData.plot_area_min && propertyData.plot_area_max
        ? `${formatArea(propertyData.plot_area_min)} - ${formatArea(propertyData.plot_area_max)}`
        : 'N/A',
      carpet_area: formatArea(propertyData.carpet_area),
      carpet_area_range: propertyData.carpet_area_min && propertyData.carpet_area_max
        ? `${formatArea(propertyData.carpet_area_min)} - ${formatArea(propertyData.carpet_area_max)}`
        : 'N/A',
      build_up_area: formatArea(propertyData.super_build_up_area || propertyData.build_up_area),
      build_up_area_range: (propertyData.super_build_up_area_min && propertyData.super_build_up_area_max) ||
                          (propertyData.build_up_area_min && propertyData.build_up_area_max)
        ? `${formatArea(propertyData.super_build_up_area_min || propertyData.build_up_area_min)} - ${formatArea(propertyData.super_build_up_area_max || propertyData.build_up_area_max)}`
        : 'N/A',
      
      // Location
      city: cityName || 'N/A',
      location: locationName || 'N/A',
      location_area: locationAreaName || 'N/A',
      latitude: propertyData.latitude || 'N/A',
      longitude: propertyData.longitude || 'N/A',
      
      // Features
      developer: developerName || 'N/A',
      furnishing: formatFurnishing(propertyData.furnishing),
      facing: formatFacing(propertyData.facing),
      property_rera: propertyData.property_rera || 'N/A',
      total_units: propertyData.total_units || 'N/A',
      development_size: propertyData.development_size 
        ? `${propertyData.development_size} sq.ft` 
        : 'N/A',
      video_url: propertyData.video_url || 'Not provided',
      
      // Configuration
      bhk_config: bhkList && bhkList.length > 0 ? bhkList.join(', ') : 'N/A',
      amenities: amenitiesList && amenitiesList.length > 0 
        ? amenitiesList.join(', ') 
        : 'None specified',
      
      // Images
      total_images: imageCount || 0,
      images_note: imageCount > 0 
        ? `${imageCount} image${imageCount > 1 ? 's' : ''} uploaded (viewable in admin panel)` 
        : 'No images uploaded',
      
      // Timestamp
      submission_date: new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'long',
      }),
    };

    // Send email via EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('✅ Email sent successfully:', response);
    return { 
      success: true, 
      message: 'Email notification sent successfully', 
      response 
    };
    
  } catch (error) {
    console.error('❌ EmailJS Error:', error);
    return { 
      success: false, 
      message: 'Failed to send email notification', 
      error: error.message || error 
    };
  }
};

/**
 * Prepare email data from form state
 */
export const prepareEmailData = ({
  request, saleRequest, rentRequest,
  propertyType, property_type, imageList,
  cityList, locationList, locationAreaList,
  developerList, propertyTypeList, propertyBHKList,
}) => {
  // Determine which request to use
  const propertyData = propertyType === 'sale' ? saleRequest : rentRequest;
  
  // Map IDs to readable names
  const cityName = cityList?.find(c => c.id === propertyData.city)?.title;
  const locationName = locationList?.find(l => l.id === propertyData.location)?.title;
  const locationAreaName = locationAreaList?.find(la => la.id === propertyData.location_area)?.title;
  const developerName = developerList?.find(d => d.id === propertyData.developer)?.title;
  const propertyTypeName = propertyTypeList?.find(pt => pt.id === property_type)?.title;
  
  // Format BHK list
  const bhkList = propertyData.property_bhks?.map(bhkId => {
    const bhk = propertyBHKList?.find(b => b.id === bhkId);
    return bhk?.title || bhk?.value || bhkId;
  }) || [];
  
  // Format amenities list
  const amenitiesList = propertyData.amenities?.map(a => 
    a.label || a.value || a.title
  ) || [];
  
  return {
    // User Details
    fullName: request.full_name,
    email: request.email,
    phone: request.phone,
    
    // Property Type
    listingType: propertyType === 'sale' ? 'For Sale' : 'For Rent/Lease',
    propertyTypeName,
    
    // Property Details
    propertyData,
    
    // Mapped Names
    cityName,
    locationName,
    locationAreaName,
    developerName,
    
    // Lists
    bhkList,
    amenitiesList,
    
    // Images
    imageCount: imageList?.length || 0,
  };
};