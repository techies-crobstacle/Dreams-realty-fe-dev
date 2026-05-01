import React from "react";
import Link from "next/link";
import SaleForm from "./sale-form";
import RentForm from "./rent-form";
export default function ListStepTab3(props) {
  const {
    type,
    image,
    saleRequest,
    setSaleRequest,
    handleChangeSaleRequest,
    rentRequest,
    setRentRequest,
    handleChangeRentRequest,
    handleChangeSelectId,
    handleChangePushArray,
    cityList,
    locationList,
    locationAreaList,
    propertyBHKList,
    developerList,
    furnishingList,
    facingList,
    simpleValidator,
    amenitiesList,
    handleChangeSelect,
    logoPreview,
    uploadImage,
    property_type,
    handleSubmit,
  } = props;
  return (
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <h3 className="mb-3">Provide Property Details Below</h3>
        {type === "sale" && (
          <SaleForm
            image={image}
            request={saleRequest}
            setRequest={setSaleRequest}
            onChange={handleChangeSaleRequest}
            handleChangeSelectId={handleChangeSelectId}
            handleChangePushArray={handleChangePushArray}
            cityList={cityList}
            locationList={locationList}
            locationAreaList={locationAreaList}
            propertyBHKList={propertyBHKList}
            developerList={developerList}
            furnishingList={furnishingList}
            facingList={facingList}
            simpleValidator={simpleValidator}
            uploadImage={uploadImage}
            logoPreview={logoPreview}
            amenitiesList={amenitiesList}
            handleChangeSelect={handleChangeSelect}
            property_type={property_type}
          />
        )}
        {type === "rent" && (
          <RentForm
            request={rentRequest}
            image={image}
            setRequest={setRentRequest}
            onChange={handleChangeRentRequest}
            handleChangeSelectId={handleChangeSelectId}
            handleChangePushArray={handleChangePushArray}
            cityList={cityList}
            locationList={locationList}
            locationAreaList={locationAreaList}
            propertyBHKList={propertyBHKList}
            developerList={developerList}
            furnishingList={furnishingList}
            facingList={facingList}
            simpleValidator={simpleValidator}
            amenitiesList={amenitiesList}
            handleChangeSelect={handleChangeSelect}
            logoPreview={logoPreview}
            uploadImage={uploadImage}
            property_type={property_type}
          />
        )}
        <div className="mt-4 mb-5 d-flex gap-3 flex-wrap">
          <button
            className="theme-button theme-secondary-btn mr-3"
            onClick={() => handleSubmit(2)}
          >
            Previous
          </button>
          <button
            className="theme-button theme-primary-btn mr-3"
            onClick={() => handleSubmit(4, "tab4")}
          >
            Next
          </button>
          <Link href="/">
            <button className="theme-button theme-secondary-btn mr-3">
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
