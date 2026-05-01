import React, { useEffect, useState } from "react";
import { getValue } from "/utils/lodash";
import { fetchBlogs } from "@services/APIs/common.service";

const NewBlog = () => {
  const [blogLoading, setBlogLoading] = useState(false);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    try {
      setBlogLoading(true);
      let resp = await fetchBlogs();
      if (resp) {
        setBlogLoading(false);
        setBlogsList(getValue(resp, "blogs", []));
      } else {
        setBlogLoading(false);
      }
    } catch (error) {
      setBlogLoading(false);
    }
  };

  return (
    <div>
      <p>Blog ID: </p>
    </div>
  );
};

export default NewBlog;
