import React, { useState } from "react";
import dynamic from "next/dynamic";
import { getValue } from "/utils/lodash";
import Moment from "react-moment";
import { toast } from "react-toastify";
import { fetchBlogs } from "@services/APIs/common.service";
import Head from "next/head";
import Link from "next/link";

const DynamicBreadcrumb = dynamic(() => import("@components/breadcrumbs"));
const PreviousPage = dynamic(() => import("@components/previous-page"));
const Layout = dynamic(() => import("@components/layout.js"));

// Function to process images in content
const processContentImages = (content) => {
  if (!content) return "";

  // Replace relative image URLs with your specific backend URL
  return content.replace(
    /src="\/uploads\//g,
    `src="https://backend-new.dreamsrealty.co.in/uploads/`
  );
};

// Function to get blog cover image URL (same logic as in index.js)
const getBlogImageUrl = (blog) => {
  let imageUrl = "https://via.placeholder.com/600x400?text=Blog+Image";
  
  const coverImage = blog.attributes?.cover_image || blog.cover_image;
  
  if (coverImage?.data?.attributes?.url) {
    const url = coverImage.data.attributes.url;
    imageUrl = url.startsWith('http') 
      ? url 
      : `https://backend-new.dreamsrealty.co.in${url}`;
  } else if (coverImage?.data?.attributes?.formats?.large?.url) {
    const url = coverImage.data.attributes.formats.large.url;
    imageUrl = url.startsWith('http')
      ? url
      : `https://backend-new.dreamsrealty.co.in${url}`;
  } else if (coverImage?.data?.attributes?.formats?.medium?.url) {
    const url = coverImage.data.attributes.formats.medium.url;
    imageUrl = url.startsWith('http')
      ? url
      : `https://backend-new.dreamsrealty.co.in${url}`;
  } else if (coverImage?.url) {
    imageUrl = coverImage.url.startsWith('http') 
      ? coverImage.url 
      : `https://backend-new.dreamsrealty.co.in${coverImage.url}`;
  }
  
  return imageUrl;
};

// Function to detect mobile device
const detectMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export default function BlogPage(props) {
  const blog = getValue(props, "blog", "");
  const prevBlog = getValue(props, "prevBlog", null);
  const nextBlog = getValue(props, "nextBlog", null);
  const [showSharePopup, toogleSharePopup] = useState(false);

  const copyToClipboard = (str) => {
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    toast.success("Link copied to clipboard");
  };

  const redirectToWhatsApp = () => {
    const currentUrl = window.location.href;
    const message = `?text=${encodeURIComponent(currentUrl)}`;
    const whatsappUrl = detectMobileDevice()
      ? `whatsapp://send${message}`
      : `https://web.whatsapp.com/send${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      typeof window !== "undefined" ? window.location.href : ""
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareOnTwitter = () => {
    const url = `http://twitter.com/share?url=${encodeURIComponent(
      typeof window !== "undefined" ? window.location.href : ""
    )}&text=${encodeURIComponent(blog.title)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareOnPinterest = () => {
    const url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
      typeof window !== "undefined" ? window.location.href : ""
    )}&description=${encodeURIComponent(blog.title)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareOnInstagram = () => {
    // Instagram doesn't have direct URL sharing, so we copy to clipboard
    copyToClipboard(typeof window !== "undefined" ? window.location.href : "");
  };

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Blog", link: "/blog" },
    { label: blog?.title || "", link: "" },
  ];

  if (!blog) {
    return (
      <Layout>
        <div className="blog-wrapper">
          <div className="custom-container">
            <div className="error-message">
              <h1>Blog not found</h1>
              <p>
                The blog post you're looking for doesn't exist or has been
                moved.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Process content with proper image URLs
  const processedContent = processContentImages(getValue(blog, "content", ""));
  
  // Get the blog cover image URL using the same logic as index.js
  const blogImageUrl = getBlogImageUrl(blog);

  return (
    <>
      <Head>
        <title>
          {props.meta_title || `${blog.title} | Dreams Realty Blog`}
        </title>
        <meta
          property="og:title"
          content={props.meta_title || `${blog.title} | Dreams Realty Blog`}
        />
        <meta
          name="description"
          content={
            props.meta_description ||
            "Search Real Estate Properties in Bangalore, the best property site in Bangalore. Buy, Sell, Rent residential and commercial properties"
          }
        />
        <meta name="keywords" content={props.keywords || ""} />
        <meta
          property="og:url"
          content={typeof window !== "undefined" ? window.location.href : ""}
        />
        <meta
          property="og:description"
          content={
            props.meta_description ||
            "Search Real Estate Properties in Bangalore, the best property site in Bangalore."
          }
        />
        <meta
          property="og:image"
          content={
            props.meta_image ||
            blogImageUrl ||
            "https://backend-new.dreamsrealty.co.in/uploads/futuro_hprop1_2x_da9345c38e.png"
          }
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={props.meta_title || blog.title} />
        <meta
          name="twitter:description"
          content={props.meta_description || ""}
        />
        <meta name="twitter:image" content={props.meta_image || blogImageUrl || ""} />
      </Head>

      <Layout>
        <section className="blog-wrapper">
          {/* Navigation */}
          <div className="blog-navigation">
            <div className="custom-container">
              <div className="d-flex align-items-center breadcrumb-container">
                <PreviousPage isCompact={false} />
                <div className="">
                  <DynamicBreadcrumb items={breadcrumbItems} />
                </div>
              </div>
            </div>
          </div>

          {/* Removed the inline style that might cause positioning issues */}
          <div className="blog-container">
            {/* Blog Header */}
            <article className="blog-article">
              {/* Blog Meta */}
              <div className="blog-meta">
                <div className="blog-meta-items">
                  <span style={{ fontWeight: "bold" }} className="">
                    <Moment format="MMM DD, YYYY">
                      {getValue(blog, "createdAt", "")}
                    </Moment>
                  </span>
                  <span className="meta-separator">•</span>
                  <span className="read-time">
                    {blog.read_time || "6"} Mins read
                  </span>
                  <span className="meta-separator">•</span>
                  <button
                    className="share-button"
                    onClick={() => toogleSharePopup(!showSharePopup)}
                    aria-label="Share this blog post"
                  >
                    <img
                      src="/images/guidelines/share-icon.svg"
                      className="share-icon"
                      alt="share-icon"
                    />
                    Share
                  </button>
                </div>
              </div>

              {/* Blog Title */}
              <h1 className="blog-title">{getValue(blog, "title", "")}</h1>

              <header className="blog-header">
                {/* Featured Image - Updated to use backend image */}
                <div className="blog-featured-image">
                  <img
                    src={blogImageUrl}
                    alt={blog.title || "Blog Image"}
                    className="img-fluid"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      e.target.src = "https://via.placeholder.com/600x400?text=Blog+Image";
                    }}
                  />
                </div>
              </header>

              {/* Blog Content with Side Icons */}
              <div className="blog-content-wrapper">
                {/* Left Side Social Icons */}
                <div className="blog-social-sidebar">
                  <div
                    style={{
                      color: "black",
                      textAlign: "center",
                      marginBottom: "20px",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                   <span> Share this post:</span>
                  </div>

                  <div className="social-icon" onClick={shareOnFacebook}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="black"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>facebook</span>
                  </div>

                  <div className="social-icon" onClick={shareOnTwitter}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="black"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    <span>twitter</span>
                  </div>

                  <div className="social-icon" onClick={shareOnPinterest}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="black"
                    >
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                    </svg>
                    <span>pinterest</span>
                  </div>

                  <div className="social-icon" onClick={shareOnInstagram}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="black"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span>instagram</span>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="blog-content">
                  {blog.excerpt && (
                    <div className="blog-excerpt">
                      <p>{blog.excerpt}</p>
                    </div>
                  )}

                  <div
                    className="blog-body"
                    dangerouslySetInnerHTML={{
                      __html: processedContent,
                    }}
                  />

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="blog-tags">
                      <h3>Tags</h3>
                      <div className="tags-container">
                        {blog.tags.map((tag, index) => (
                          <span key={index} className="tag">
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Updated Blog Pagination with actual links */}
                  <div className="blog-pagination">
                    <div className="pagination-item">
                      {prevBlog ? (
                        <Link href={`/blog/${prevBlog.slug}`}>
                          <div className="pagination-link">
                            <p>← Previous</p>
                            <h3 className="pagination-text">{prevBlog.title}</h3>
                          </div>
                        </Link>
                      ) : (
                        <div className="pagination-link disabled">
                          <p>← Previous</p>
                          <h3>No previous post</h3>
                        </div>
                      )}
                    </div>

                    <div className="pagination-item" style={{borderLeft: '1px solid gray', paddingLeft: '20px'}}>
                      {nextBlog ? (
                        <Link href={`/blog/${nextBlog.slug}`}>
                          <div className="pagination-link">
                            <p style={{textAlign:"right"}}>Next →</p>
                            <h3  style={{textAlign:"right"}} className="pagination-text">{nextBlog.title}</h3>
                          </div>
                        </Link>
                      ) : (
                        <div className="pagination-link disabled">
                          <p>Next →</p>
                          <h3>No next post</h3>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Share Popup */}
          <div className={`share-popup ${showSharePopup ? "active" : ""}`}>
            <div
              className="share-popup-overlay"
              onClick={() => toogleSharePopup(false)}
            />
            <div className="share-popup-content">
              <header className="share-header">
                <h2>Share this article</h2>
                <button
                  className="close-button"
                  onClick={() => toogleSharePopup(false)}
                  aria-label="Close share popup"
                >
                  <img src="/images/closeSVG.svg" alt="close" />
                </button>
              </header>

              <div className="share-options">
                <div className="share-option" onClick={redirectToWhatsApp}>
                  <img
                    src="/images/rewars-share-icons/whatsapp.png"
                    alt="WhatsApp"
                  />
                  <span>WhatsApp</span>
                </div>

                <a
                  className="share-option"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    typeof window !== "undefined" ? window.location.href : ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/rewars-share-icons/facebook.png"
                    alt="Facebook"
                  />
                  <span>Facebook</span>
                </a>

                <a
                  className="share-option"
                  href={`http://twitter.com/share?url=${encodeURIComponent(
                    typeof window !== "undefined" ? window.location.href : ""
                  )}&text=${encodeURIComponent(blog.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/rewars-share-icons/twitter.png"
                    alt="Twitter"
                  />
                  <span>Twitter</span>
                </a>

                <a
                  className="share-option"
                  href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
                    typeof window !== "undefined" ? window.location.href : ""
                  )}&title=${encodeURIComponent(blog.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/rewars-share-icons/linkedin.png"
                    alt="LinkedIn"
                  />
                  <span>LinkedIn</span>
                </a>

                <a
                  className="share-option"
                  href={`mailto:?subject=${encodeURIComponent(
                    blog.title
                  )}&body=${encodeURIComponent(
                    typeof window !== "undefined" ? window.location.href : ""
                  )}`}
                >
                  <img src="/images/rewars-share-icons/email.png" alt="Email" />
                  <span>Email</span>
                </a>

                <div
                  className="share-option"
                  onClick={() =>
                    copyToClipboard(
                      typeof window !== "undefined" ? window.location.href : ""
                    )
                  }
                >
                  <img
                    src="/images/rewars-share-icons/instagram.png"
                    alt="Copy Link"
                  />
                  <span>Copy Link</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const slug = query.slug;

  let resp;
  try {
    let where = {
      "filters[slug][$eq]": slug,
      populate: "*", // This will populate all relations including images
    };
    resp = await fetchBlogs(where);
  } catch (error) {
    console.error("Error fetching blog:", error);
    resp = { data: [] };
  }

  const blog = resp?.data?.[0] || {};

  // Handle 404 if blog not found
  if (!blog.id) {
    return {
      notFound: true,
    };
  }

  // Fetch previous and next blogs for pagination
  let prevBlog = null;
  let nextBlog = null;
  
  try {
    // Get all blogs to find prev/next (you might want to optimize this)
    const allBlogsResp = await fetchBlogs({
      sort: "createdAt:asc", // or whatever sorting you use
      populate: "title,slug"
    });
    
    const allBlogs = allBlogsResp?.data || [];
    const currentIndex = allBlogs.findIndex(b => b.id === blog.id);
    
    if (currentIndex > 0) {
      prevBlog = allBlogs[currentIndex - 1];
    }
    
    if (currentIndex < allBlogs.length - 1) {
      nextBlog = allBlogs[currentIndex + 1];
    }
  } catch (error) {
    console.error("Error fetching prev/next blogs:", error);
  }

  const meta_title = blog?.meta_title || blog?.title || "";
  const meta_description = blog?.meta_description || blog?.excerpt || "";
  const keywords = blog?.keywords || "";
  const meta_image = blog?.main_image?.url
    ? `https://backend-new.dreamsrealty.co.in${blog.main_image.url}`
    : "";

  return {
    props: {
      slug,
      blog,
      prevBlog,
      nextBlog,
      meta_title,
      meta_description,
      meta_image,
      keywords,
    },
  };
}