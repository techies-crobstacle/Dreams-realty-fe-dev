import { textFormat } from "@common/formatText";
import React from "react";
import { getValue } from "/utils/lodash";
import Select from "react-select";

function RentForm(props) {
  return (
    <div>
      <div className="form-container">
        <div className="row">
          {/* <div className="col-md-10">
						<div className="form-group">
							<label className="label-contact">Property Brand Logo</label>
							<div className="d-flex justify-content-start align-items-center">
								<label className="file-upload-sm">
									<img src="/images/insert_photo-24px.svg" />
									<input
										type="file"
										name="upload"
										id="upload"
										onChange={(e) =>
											props.uploadImage(
												e,
												props.setRequest,
												props.request,
												"logo"
											)
										}
									/>
								</label>
								<div className="ml-4">
									<h4>Upload Pictures - JPG or PNG (190px X 160px) Minimum</h4>
									<div className="img-box">
										<img
											src={
												props.image
													? props.image
													: props.logoPreview
														? props.logoPreview
														: "/images/insert_photo-24px.svg"
											}
											className="img-fluid"
										/>
									</div>
								</div>
							</div>
						</div>
					</div> */}
          <div className="col-md-10">
            <div className="form-group">
              <label htmlFor="pname" className="label-contact">
                Property Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter Property Name"
                className="form-control "
                value={getValue(props, `request.title`, "")}
                onChange={props.onChange}
              />
              {props.simpleValidator && (
                <div className="form-error">
                  {props.simpleValidator.current.message(
                    "Property Name",
                    getValue(props.request, "title", ""),
                    "required"
                  )}
                </div>
              )}
            </div>
          </div>
          {/* <div className="col-md-10">
						<div className="form-group">
							<label htmlFor="desc" className="label-contact">
								About/Property Description *
							</label>
							<textarea
								name="about"
								id="about"
								rows="7"
								placeholder="Enter About/Property Description"
								className="form-control textarea"
								value={getValue(props, `request.about`, "")}
								onChange={props.onChange}
							/>
							{props.simpleValidator && (
								<div className="form-error">
									{props.simpleValidator.current.message(
										"About/Property Description",
										getValue(props.request, "about", ""),
										"required"
									)}
								</div>
							)}
						</div>
					</div> */}
          <div className="col-md-10">
            <div className="form-group">
              <label htmlFor="ad1" className="label-contact">
                Address
              </label>
              <textarea
                type="text"
                name="address"
                id="address"
                rows="7"
                placeholder="Villa No | Apartment - Flat #/Tower # / Floor / No. of Towers"
                className="form-control textarea"
                value={getValue(props, `request.address`, "")}
                onChange={props.onChange}
              />
            </div>
          </div>

          {/* <div className="col-md-5">
						<div className="form-group">
							<label htmlFor="City" className="label-contact">
								City
							</label>
							<select
								value={getValue(props, `request.city`, "")}
								className="form-control "
								onChange={(e) =>
									props.handleChangeSelectId(
										e,
										props.setRequest,
										props.request,
										"city"
									)
								}
							>
								<option value={""}>Select</option>
								{getValue(props, `cityList`, []).map((item) => {
									return (
										<option
											value={item.id}
											selected={item.id === getValue(props, `request.city`, "")}
										>
											{item.title}
										</option>
									);
								})}
							</select>
						</div>
					</div> */}

          {/* <div className="col-md-5">
						<div className="form-group">
							<label htmlFor="Location" className="label-contact">
								Location
							</label>
							<select
								value={getValue(props, `request.location`, "")}
								className="form-control "
								onChange={(e) =>
									props.handleChangeSelectId(
										e,
										props.setRequest,
										props.request,
										"location"
									)
								}
							>
								<option value={""}>Select</option>
								{getValue(props, `locationList`, []).map((item) => {
									return (
										<option
											value={item.id}
											selected={
												item.id === getValue(props, `request.location`, "")
											}
										>
											{textFormat(item.title)}
										</option>
									);
								})}
							</select>
						</div>
					</div> */}
        </div>

        <div className="row">
          {/* <div className="col-md-5">
						<div className="form-group">
							<label htmlFor="Location" className="label-contact">
								Location Area
							</label>
							<select
								value={getValue(props, `request.location_area`, "")}
								className="form-control "
								onChange={(e) =>
									props.handleChangeSelectId(
										e,
										props.setRequest,
										props.request,
										"location_area"
									)
								}
							>
								<option value={""}>Select</option>
								{getValue(props, `locationAreaList`, []).map((item) => {
									return (
										<option
											value={item.id}
											selected={
												item.id === getValue(props, `request.location_area`, "")
											}
										>
											{item.title}
										</option>
									);
								})}
							</select>
						</div>
					</div> */}
          <div className="col-md-5">
            <div className="form-group">
              <label htmlFor="Location" className="label-contact">
                Furnishing <span style={{ color: "red" }}>*</span>
              </label>
              <select
                value={getValue(props, `request.furnishing`, "")}
                className="form-control "
                onChange={(e) =>
                  props.handleChangeSelectId(
                    e,
                    props.setRequest,
                    props.request,
                    "furnishing"
                  )
                }
              >
                <option value={""}>Select</option>
                {getValue(props, `furnishingList`, []).map((item) => {
                  return (
                    <option
                      value={item.value}
                      selected={
                        item.value === getValue(props, `request.furnishing`, "")
                      }
                    >
                      {textFormat(item.value)}
                    </option>
                  );
                })}
              </select>
              {props.simpleValidator && (
                <div className="form-error">
                  {props.simpleValidator.current.message(
                    "Furnishing",
                    getValue(props.request, "furnishing", ""),
                    "required"
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="col-md-5">
            <div className="form-group">
              <label htmlFor="Location" className="label-contact">
                Facing
              </label>
              <select
                value={getValue(props, `request.facing`, "")}
                className="form-control "
                onChange={(e) =>
                  props.handleChangeSelectId(
                    e,
                    props.setRequest,
                    props.request,
                    "facing"
                  )
                }
              >
                <option value={""}>Select</option>
                {getValue(props, `facingList`, []).map((item) => {
                  return (
                    <option
                      value={item.value}
                      selected={
                        item.value === getValue(props, `request.facing`, "")
                      }
                    >
                      {textFormat(item.value)}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {/* <div className="col-md-5">
						<div className="form-group">
							<label htmlFor="Location" className="label-contact">
								Developer
							</label>
							<select
								value={getValue(props, `request.developer`, "")}
								className="form-control "
								onChange={(e) =>
									props.handleChangeSelectId(
										e,
										props.setRequest,
										props.request,
										"developer"
									)
								}
							>
								<option value={""}>Select</option>
								{getValue(props, `developerList`, []).map((item) => {
									return (
										<option
											value={item.id}
											selected={
												item.id === getValue(props, `request.developer`, "")
											}
										>
											{item.title}
										</option>
									);
								})}
							</select>
						</div>
					</div> */}
        </div>

        <div className="row">
          <div className="col-md-5">
            <div className="form-group">
              <label htmlFor="ad1" className="label-contact">
                Price <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="Enter Price"
                className="form-control "
                value={getValue(props, `request.price`, "")}
                onChange={props.onChange}
              />
              {props.simpleValidator && (
                <div className="form-error">
                  {props.simpleValidator.current.message(
                    "Price",
                    getValue(props.request, "price", ""),
                    "required"
                  )}
                </div>
              )}
            </div>
          </div>

          {/* <div className="col-md-5">
						<div className="form-group">
							<label htmlFor="ad1" className="label-contact">
								Balcony
							</label>
							<input
								type="number"
								name="balcony"
								id="balcony"
								placeholder="Enter Balcony"
								className="form-control "
								value={getValue(props, `request.balcony`, "")}
								onChange={props.onChange}
							/>
						</div>
					</div> */}
          <div className="col-md-5">
            <div className="form-group">
              <label htmlFor="ad1" className="label-contact">
                Bathrooms
              </label>
              <input
                type="number"
                name="bathrooms"
                id="bathrooms"
                placeholder="Enter Bathrooms"
                className="form-control "
                value={getValue(props, `request.bathrooms`, "")}
                onChange={props.onChange}
              />
            </div>
          </div>

          {/* <br />
					<div className="col-md-5">
						<div className="form-group">
							<label htmlFor="ad1" className="label-contact">
								Latitude
							</label>
							<input
								type="text"
								name="latitude"
								id="latitude"
								placeholder="Enter Latitude"
								className="form-control "
								value={getValue(props, `request.latitude`, "")}
								onChange={props.onChange}
							/>
						</div>
					</div>

					<div className="col-md-5">
						<div className="form-group">
							<label htmlFor="ad1" className="label-contact">
								Longitude
							</label>
							<input
								type="text"
								name="longitude"
								id="longitude"
								placeholder="Enter Longitude"
								className="form-control "
								value={getValue(props, `request.longitude`, "")}
								onChange={props.onChange}
							/>
						</div>
					</div> */}

          <br />

          <div className="col-md-10">
            <label htmlFor="pincode" className="label-contact">
              Property BHK
            </label>
            <div className="form-group">
              {getValue(props, `propertyBHKList.length`, 0) > 0 &&
                getValue(props, `propertyBHKList`, []).map((item, index) => {
                  return (
                    // add class active to label when checked
                    <label
                      className={`checkbox-button ${
                        getValue(props, `request.property_bhks`, []).includes(
                          getValue(item, "id")
                        )
                          ? "active"
                          : ""
                      }`}
                      key={index}
                    >
                      <span>{getValue(item, "title")}</span>
                      <input
                        type="checkbox"
                        onChange={() =>
                          props.handleChangePushArray(
                            getValue(item, "id"),
                            props.setRequest,
                            props.request
                          )
                        }
                        checked={getValue(
                          props,
                          `request.property_bhks`,
                          []
                        ).includes(getValue(item, "id"))}
                      />
                    </label>
                  );
                })}
            </div>
          </div>

          <div className="col-md-5">
            <div className="form-group">
              <label htmlFor="carea" className="label-contact">
                Plot Area (sqft)
              </label>
              <input
                type="number"
                name="plot_area"
                id="plot_area"
                placeholder="Enter Plot Area (sqft)"
                className="form-control "
                value={getValue(props, `request.plot_area`, "")}
                onChange={props.onChange}
              />
            </div>
          </div>
          {/* <div className="col-md-5">
						<div className="form-group">
							<label htmlFor="carea" className="label-contact">
								Carpet Area (sqft)
							</label>
							<input
								type="number"
								name="carpet_area"
								id="carpet_area"
								placeholder="Enter Carpet Area (sqft)"
								className="form-control "
								value={getValue(props, `request.carpet_area`, "")}
								onChange={props.onChange}
							/>
						</div>
					</div> */}
          <div className="col-md-5">
            <div className="form-group">
              <label htmlFor="barea" className="label-contact">
                Built-up Area (Sqft) <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                name="build_up_area"
                id="build_up_area"
                placeholder="Enter Built-up Area (Sqft)"
                className="form-control "
                value={getValue(props, `request.build_up_area`, "")}
                onChange={props.onChange}
              />
              {props.simpleValidator && (
                <div className="form-error">
                  {props.simpleValidator.current.message(
                    "Built-up Area",
                    getValue(props.request, "build_up_area", ""),
                    "required"
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          {/* <div className="col-md-5">
						<div className="form-group">
							<label htmlFor="carea" className="label-contact">
								Plot Area Min
							</label>
							<input
								type="number"
								name="plot_area_min"
								id="plot_area_min"
								placeholder="Enter Plot Area Min (sqft)"
								className="form-control "
								value={getValue(props, `request.plot_area_min`, "")}
								onChange={props.onChange}
							/>
						</div>
					</div>
					<div className="col-md-5">
						<div className="form-group">
							<label htmlFor="carea" className="label-contact">
								Plot Area Max
							</label>
							<input
								type="number"
								name="plot_area_max"
								id="plot_area_max"
								placeholder="Enter Plot Area Max (sqft)"
								className="form-control "
								value={getValue(props, `request.plot_area_max`, "")}
								onChange={props.onChange}
							/>
						</div>
					</div>

					<div className="col-md-5">
						<div className="form-group">
							<label htmlFor="carea" className="label-contact">
								Carpet Area Min
							</label>
							<input
								type="number"
								name="carpet_area_min"
								id="carpet_area_min"
								placeholder="Enter Carpet Area Min (sqft)"
								className="form-control "
								value={getValue(props, `request.carpet_area_min`, "")}
								onChange={props.onChange}
							/>
						</div>
					</div>
					<div className="col-md-5">
						<div className="form-group">
							<label htmlFor="carea" className="label-contact">
								Carpet Area Max
							</label>
							<input
								type="number"
								name="carpet_area_max"
								id="carpet_area_max"
								placeholder="Enter Carpet Area Max (sqft)"
								className="form-control "
								value={getValue(props, `request.carpet_area_max`, "")}
								onChange={props.onChange}
							/>
						</div>
					</div>

					<div className="col-md-5">
						<div className="form-group">
							<label htmlFor="carea" className="label-contact">
								Build Up Area Min
							</label>
							<input
								type="number"
								name="build_up_area_min"
								id="build_up_area_min"
								placeholder="Enter Build Up Area Min (sqft)"
								className="form-control "
								value={getValue(props, `request.build_up_area_min`, "")}
								onChange={props.onChange}
							/>
						</div>
					</div>
					<div className="col-md-5">
						<div className="form-group">
							<label htmlFor="carea" className="label-contact">
								Build Up Area Max
							</label>
							<input
								type="number"
								name="build_up_area_max"
								id="build_up_area_max"
								placeholder="Enter Build Up Area Max (sqft)"
								className="form-control "
								value={getValue(props, `request.build_up_area_max`, "")}
								onChange={props.onChange}
							/>
						</div>
					</div> */}

          <div className="col-md-10">
            <div className="form-group">
              <label htmlFor="video" className="label-contact">
                Amenities
              </label>
              <Select
                options={props.amenitiesList}
                isMulti
                value={getValue(props, `request.amenities`, "")}
                onChange={(e) =>
                  props.handleChangeSelect(e, props.setRequest, props.request)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RentForm;
