import Pagination from "react-js-pagination";
export default function PropertyListingPagination(props) {
  return (
    <div className="property-listing-pagination text-center">
      <Pagination
        activePage={props.pageNumber}
        itemsCountPerPage={props.offset}
        totalItemsCount={props.totalCount}
        pageRangeDisplayed={5}
        onChange={props.onPageChangeHandler}
        prevPageText="Prev"
        nextPageText="Next"
        hideFirstLastPages={true}
      />
    </div>
  );
}
