const BaseDirectories = {
  /**
   ** The base URL of the application
   */
  BASE_URL: import.meta.env.VITE_APP_BASEURL,

  APP_ENV: import.meta.env.VITE_APP_ENV,

  BASE_API_URL: import.meta.env.VITE_APP_API_BASEURL,

  /**
   * The base URL of the Server API
   */
  //   API_BASE_URL: process.env.REACT_APP_API_BASEURL,

  //   TOKEN: window.sessionStorage.getItem('accessToken'),

  //   headers: {
  //     accept: 'application/json',
  //     Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`,
  //     'Content-Type': 'application/json',
  //   },

  /** Directories and folders. */
  IMAGES_DIR: "/images",
  LOGOS_DIR: "/logos",
  ICONS_DIR: "/icons",
  TEAM_DIR: "/team",
};

export default BaseDirectories;
